# Christ Church Mayfair Content Studio

A [Sanity](https://www.sanity.io) content management system for Christ Church Mayfair's digital content, including sermons, series, speakers, and services.

## Overview

This repository contains:
- **Sanity Studio**: A real-time content editing interface for managing church content
- **Schema definitions**: Schema definitions for all content types
- **Automated type generation**: TypeScript types automatically generated and published as an npm package

## Content Types

- **Sermons**
    - **Sermons**: Individual sermon recordings with YouTube integration, passages, and timestamps
    - **Sermon Series**: Collections of sermons with metadata (type, bible passage, dates)
    - **Series Types**: Classification system for series (Expository, Thematic, Doctrinal, Book Overview, Seasonal)
- **People**: Staff, speakers, and their roles
- **Services**: Church service information
- **Job Adverts**: Employment opportunities

## Development

### Prerequisites
- [Bun](https://bun.sh) or Node.js 18+
- Access to the Sanity project

### Commands

```bash
# Start the development studio
bun run dev

# Build the studio
bun run build

# Deploy the studio
bun run deploy

# Generate TypeScript types from schema
bun run typegen
```

## Published Type Package

This repository automatically publishes TypeScript types to GitHub Packages as `@christchurchmayfair/sanity-types`.

### How it works

When schema changes are pushed to `master`, a GitHub Action automatically:
1. Generates TypeScript types from the Sanity schema
2. Publishes them as `@christchurchmayfair/sanity-types` to GitHub Packages
3. Increments the version number automatically

### Using the types in your project

```bash
npm install @christchurchmayfair/sanity-types --registry=https://npm.pkg.github.com
```

Configure `.npmrc`:
```
@christchurchmayfair:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then import the types:
```typescript
import type { Sermon, SermonSeries, SeriesType } from '@christchurchmayfair/sanity-types'
```

See [PUBLISH_TYPES.md](PUBLISH_TYPES.md) for detailed setup instructions.

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community Slack](https://slack.sanity.io)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending)
