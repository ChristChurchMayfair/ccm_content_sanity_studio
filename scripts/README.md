# Sanity Data Migration Scripts

## Update Series Numbers Script

This script automatically assigns sequential numbers to sermon series based on the date of the earliest sermon in each series.

### Prerequisites

1. Install tsx (TypeScript executor):
   ```bash
   npm install -D tsx
   ```

2. Install @sanity/client if not already installed:
   ```bash
   npm install @sanity/client
   ```

3. Get your Sanity authentication token:
   - Go to https://www.sanity.io/manage
   - Select your project (ip162aeb)
   - Go to "API" settings
   - Create a token with "Editor" or "Administrator" permissions
   - Copy the token

4. Create a `.env` file in the project root (if it doesn't exist) and add:
   ```env
   SANITY_SECRET_TOKEN=your_token_here
   ```

### Running the Script

**Dry run (preview changes without applying them):**

```bash
npm run update-series-numbers:dry-run
```

**Apply changes:**

```bash
npm run update-series-numbers
```

Or directly with tsx:

```bash
# Dry run
tsx scripts/updateSeriesNumbers.ts --dry-run

# Apply changes
tsx scripts/updateSeriesNumbers.ts
```

### What the Script Does

1. Fetches all sermons from your Sanity dataset
2. Groups sermons by their series and counts them
3. **Skips series with only one sermon** (single sermons don't need series numbers)
4. Finds the earliest sermon date for each multi-sermon series
5. Orders series by their earliest sermon date (oldest first)
6. Assigns sequential numbers (1, 2, 3, etc.) to each series
7. Displays the planned changes and waits 5 seconds for confirmation
8. Updates all series documents with their new numbers

### Safety Features

- Shows you the planned numbering before committing
- 5-second delay to allow cancellation (Ctrl+C)
- Uses transactions for atomic updates
- Skips series that have no sermons
- Logs all operations for transparency

### Example Output

**Dry run mode:**
```
=== DRY RUN MODE - No changes will be made ===

Fetching all sermons and series...
Found 245 sermons and 42 series

Skipping 8 series with only one sermon:
  - Special Christmas Service
  - Easter Sunday
  - Guest Speaker Series
  ...

Series to be numbered (ordered by earliest sermon date):
1. Genesis (none) - 2015-01-11 (12 sermons)
   https://christchurchmayfair.org/talks/series/genesis
   1. In the Beginning (2015-01-11) - https://content.christchurchmayfair.org/desk/sermons;sermons;abc123
   2. The Fall (2015-01-18) - https://content.christchurchmayfair.org/desk/sermons;sermons;def456
   3. Noah and the Flood (2015-01-25) - https://content.christchurchmayfair.org/desk/sermons;sermons;ghi789
   ...

2. The Gospel of Mark (none) - 2015-09-13 (35 sermons)
   https://christchurchmayfair.org/talks/series/the-gospel-of-mark
   1. Mark 1:1-8 (2015-09-13) - https://content.christchurchmayfair.org/desk/sermons;sermons;jkl012
   2. Mark 1:9-15 (2015-09-20) - https://content.christchurchmayfair.org/desk/sermons;sermons;mno345
   ...

=== DRY RUN COMPLETE ===
Would update 34 series with numbers 1-34
Run without --dry-run flag to apply these changes
```

**Normal mode:**
```
Fetching all sermons and series...
Found 245 sermons and 42 series

Skipping 8 series with only one sermon:
  - Special Christmas Service
  - Easter Sunday
  - Guest Speaker Series
  ...

Series to be numbered (ordered by earliest sermon date):
1. Genesis (none) - 2015-01-11 (12 sermons)
   https://christchurchmayfair.org/talks/series/genesis
   1. In the Beginning (2015-01-11) - https://content.christchurchmayfair.org/desk/sermons;sermons;abc123
   2. The Fall (2015-01-18) - https://content.christchurchmayfair.org/desk/sermons;sermons;def456
   ...

2. The Gospel of Mark (none) - 2015-09-13 (35 sermons)
   https://christchurchmayfair.org/talks/series/the-gospel-of-mark
   1. Mark 1:1-8 (2015-09-13) - https://content.christchurchmayfair.org/desk/sermons;sermons;jkl012
   2. Mark 1:9-15 (2015-09-20) - https://content.christchurchmayfair.org/desk/sermons;sermons;mno345
   ...

Ready to update 34 series with numbers 1-34
Press Ctrl+C to cancel, or wait 5 seconds to continue...

Setting series "Genesis" to number 1
Setting series "The Gospel of Mark" to number 2
...

Committing changes...
Update completed successfully!
Updated 34 series
```
