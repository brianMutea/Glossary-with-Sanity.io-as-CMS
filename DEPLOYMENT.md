# Deployment Guide

## Prerequisites

- Node.js 18+
- pnpm 8.15.6+
- Sanity account and project setup

## Environment Variables

Make sure these environment variables are set in your deployment platform:

### Web App (.env.local)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

### Studio (.env.local)
```
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## Build Commands

### For Vercel Deployment

1. **Build Command**: `pnpm build`
2. **Install Command**: `pnpm install`
3. **Root Directory**: `apps/web`

### Manual Build

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Generate Sanity types (optional, for better TypeScript support)
pnpm typegen
```

## TypeScript Configuration

The project is configured with strict TypeScript checking:

- `next.config.ts` has `ignoreBuildErrors: false` for production-ready builds
- Basic Sanity types are provided in `src/sanity/types.ts`
- For full type generation, run `pnpm typegen` from the root
- All TypeScript errors have been resolved for deployment

## Troubleshooting

### TypeScript Errors
- All known TypeScript errors have been fixed
- Ensure all environment variables are set
- Run `pnpm type-check` to check for TypeScript errors
- The build should pass without any TypeScript issues

### Sanity Connection Issues
- Verify project ID and dataset in environment variables
- Check API token permissions
- Ensure Sanity studio is deployed and accessible