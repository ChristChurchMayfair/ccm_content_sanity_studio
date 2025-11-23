import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ip162aeb',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_SECRET_TOKEN || ''
})

interface Sermon {
  _id: string
  title: string
  preachedAt: string
  series?: {
    _ref: string
  }
}

interface SermonSeries {
  _id: string
  name: string
  subtitle:string
  slug?: {
    current: string
  }
  number?: {
    current: string
  }
}

interface SeriesWithEarliestDate {
  seriesId: string
  seriesName: string
  seriesSubtitle: string
  seriesSlug?: string
  earliestDate: Date
  sermonCount: number
  sermons: Sermon[]
}

async function updateSeriesNumbers(dryRun: boolean = false) {
  try {
    if (dryRun) {
      console.log('=== DRY RUN MODE - No changes will be made ===\n')
    }

    console.log('Fetching all sermons and series...')

    // Fetch all sermons with their series references
    const sermons = await client.fetch<Sermon[]>(`
      *[_type == "sermon" && defined(series) && defined(preachedAt)] {
        _id,
        title,
        preachedAt,
        series
      }
    `)

    // Fetch all series
    const allSeries = await client.fetch<SermonSeries[]>(`
      *[_type == "sermonSeries"] {
        _id,
        name,
        subtitle,
        slug,
        number
      }
    `)

    console.log(`Found ${sermons.length} sermons and ${allSeries.length} series`)

    // Group sermons by series, count them, and find earliest date for each
    const seriesMap = new Map<string, { earliestDate: Date; sermonCount: number; sermons: Sermon[] }>()

    for (const sermon of sermons) {
      if (sermon.series?._ref && sermon.preachedAt) {
        const seriesId = sermon.series._ref
        const preachedDate = new Date(sermon.preachedAt)

        const current = seriesMap.get(seriesId)
        if (!current) {
          seriesMap.set(seriesId, { earliestDate: preachedDate, sermonCount: 1, sermons: [sermon] })
        } else {
          if (preachedDate < current.earliestDate) {
            current.earliestDate = preachedDate
          }
          current.sermonCount++
          current.sermons.push(sermon)
        }
      }
    }

    // Create array of series with their earliest dates
    const seriesWithDates: SeriesWithEarliestDate[] = []
    const singleSermonSeries: string[] = []

    for (const series of allSeries) {
      const seriesData = seriesMap.get(series._id)
      if (seriesData) {
        if (seriesData.sermonCount === 1) {
          singleSermonSeries.push(series.name || 'Unnamed Series')
        } else {
          // Sort sermons by preached date (oldest first)
          const sortedSermons = seriesData.sermons.sort((a, b) =>
            new Date(a.preachedAt).getTime() - new Date(b.preachedAt).getTime()
          )

          seriesWithDates.push({
            seriesId: series._id,
            seriesName: series.name || 'Unnamed Series',
            seriesSubtitle: series.subtitle || "none",
            seriesSlug: series.slug?.current,
            earliestDate: seriesData.earliestDate,
            sermonCount: seriesData.sermonCount,
            sermons: sortedSermons
          })
        }
      } else {
        console.warn(`Series "${series.name}" (${series._id}) has no sermons, skipping`)
      }
    }

    // Sort by earliest date (oldest first)
    seriesWithDates.sort((a, b) => a.earliestDate.getTime() - b.earliestDate.getTime())

    if (singleSermonSeries.length > 0) {
      console.log(`\nSkipping ${singleSermonSeries.length} series with only one sermon:`)
      singleSermonSeries.forEach(name => {
        console.log(`  - ${name}`)
      })
    }

    console.log('\nSeries to be numbered (ordered by earliest sermon date):')
    seriesWithDates.forEach((series, index) => {
      const date = series.earliestDate.toISOString().split('T')[0]
      const sermonCountText = `(${series.sermonCount} sermons)`
      const link = series.seriesSlug
        ? `https://christchurchmayfair.org/talks/series/${series.seriesSlug}`
        : '(no slug)'

      console.log(`${index + 1}. ${series.seriesName} (${series.seriesSubtitle}) - ${date} ${sermonCountText}`)
      console.log(`   ${link}`)

      // Display sermons in this series
      series.sermons.forEach((sermon, sermonIndex) => {
        const sermonDate = new Date(sermon.preachedAt).toISOString().split('T')[0]
        const sermonTitle = sermon.title || 'Untitled'
        const sanityLink = `https://content.christchurchmayfair.org/desk/sermons;sermons;${sermon._id}`
        console.log(`   ${sermonIndex + 1}. ${sermonTitle} (${sermonDate}) - ${sanityLink}`)
      })

      console.log()
    })

    if (dryRun) {
      console.log(`\n=== DRY RUN COMPLETE ===`)
      console.log(`Would update ${seriesWithDates.length} series with numbers 1-${seriesWithDates.length}`)
      console.log('Run without --dry-run flag to apply these changes')
      return
    }

    // Ask for confirmation before updating
    console.log(`\nReady to update ${seriesWithDates.length} series with numbers 1-${seriesWithDates.length}`)
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...')

    await new Promise(resolve => setTimeout(resolve, 5000))

    // Create transaction to update all series
    const transaction = client.transaction()

    for (let i = 0; i < seriesWithDates.length; i++) {
      const series = seriesWithDates[i]
      const seriesNumber = (i + 1).toString()

      transaction.patch(series.seriesId, {
        set: {
          number: {
            _type: 'slug',
            current: seriesNumber
          }
        }
      })

      console.log(`Setting series "${series.seriesName}" to number ${seriesNumber}`)
    }

    // Commit all changes
    console.log('\nCommitting changes...')
    const result = await transaction.commit()
    console.log('Update completed successfully!')
    console.log(`Updated ${result.results.length} series`)

  } catch (error) {
    console.error('Error updating series numbers:', error)
    process.exit(1)
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')

// Run the script
updateSeriesNumbers(dryRun)
