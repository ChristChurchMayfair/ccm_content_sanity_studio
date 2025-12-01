# Publishing Sanity Types as a Package

This repository is configured to automatically generate and publish TypeScript types from your Sanity schema as an npm package on GitHub Packages.

## How It Works

The GitHub Action (`.github/workflows/publish-types.yml`) automatically:
1. Generates TypeScript types using `npm run typegen`
2. Publishes them as `@ccm/sanity-types` to GitHub Packages
3. Triggers on:
   - Any push to `master` that changes files in `schemas/` or `package.json`
   - Manual workflow dispatch

## Setup

### 1. Enable GitHub Packages (No additional setup needed!)

The workflow uses the built-in `GITHUB_TOKEN` which automatically has permissions to publish to GitHub Packages. No secrets need to be configured.

### 2. Verify Permissions

Make sure your repository has the following workflow permissions enabled:
1. Go to repository **Settings** → **Actions** → **General**
2. Under "Workflow permissions", ensure:
   - "Read and write permissions" is selected
   - "Allow GitHub Actions to create and approve pull requests" is checked (optional)

## Using the Published Package

### Install in your client project:

```bash
npm install @ccm/sanity-types --registry=https://npm.pkg.github.com
```

### Configure npm to use GitHub Packages:

Create or update `.npmrc` in your client project:

```
@ccm:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### Authenticate with GitHub:

Generate a personal access token with `read:packages` scope:
1. Go to GitHub **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Generate new token with `read:packages` scope
3. Add to your environment: `export GITHUB_TOKEN=ghp_your_token_here`

### Use the types in your code:

```typescript
import type { Sermon, SermonSeries, SeriesType } from '@ccm/sanity-types'

// Use the types for type-safe queries and data handling
const sermon: Sermon = await client.fetch('*[_type == "sermon"][0]')
```

## Manual Publishing

To manually trigger the workflow:
1. Go to **Actions** tab in GitHub
2. Select "Generate and Publish Types"
3. Click "Run workflow"

## Version Numbers

The package version is automatically set to `1.0.{GITHUB_RUN_NUMBER}`, incrementing with each workflow run.
