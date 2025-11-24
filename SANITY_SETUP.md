# Sanity API Token Setup

## Quick Setup Guide

### 1. Get Sanity API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project: `czq3a9vt`
3. Navigate to **API** → **Tokens**
4. Click **"Add API token"**
5. Configure:
   - **Name**: `Tech Glossary Write Token`
   - **Permissions**: `Editor` (or higher)
6. Copy the generated token

### 2. Add Token to Environment

Add this line to your `.env.local` file:

```bash
SANITY_API_TOKEN=your_actual_token_here
```

### 3. Restart Development Server

```bash
# Stop current server (Ctrl+C) then restart
npm run dev
```

### 4. Initialize Site Settings

1. Visit `/test-site-settings`
2. Click "Create Settings (API)" 
3. Go to Sanity Studio → "Site Settings"
4. Configure your logo and favicon
5. Publish changes

## Current Status

- ✅ **Sanity Read Access**: Working
- ✅ **Dynamic Logo System**: Implemented
- ✅ **Fallback System**: Working (shows default logo)
- ❌ **Write Access**: Needs API token
- ❌ **Site Settings Document**: Needs creation

## Logo System Features

Once set up, you can manage:

- **Text Logos**: Custom text with font size, weight, and color
- **Image Logos**: Upload PNG/JPG/WebP with custom dimensions  
- **SVG Logos**: Paste SVG code directly
- **Favicon**: Standard favicon + Apple Touch Icon
- **Site Title & Tagline**: Dynamic site information

## Troubleshooting

### "No write token configured"
- Add `SANITY_API_TOKEN` to `.env.local`
- Restart development server

### "Insufficient permissions"
- Ensure token has `Editor` permissions or higher
- Check token is correctly copied (no extra spaces)

### "Site settings not appearing"
- Create the document first via test page
- Check Sanity Studio for "Site Settings" section
- Ensure document is published in Studio

## File Locations

- **Hook**: `src/hooks/useSiteSettings.ts`
- **Component**: `src/components/DynamicLogo.tsx`
- **Schema**: `apps/studio/schemaTypes/siteSettings.ts`
- **Test Page**: `src/app/test-site-settings/page.tsx`
- **API Routes**: `src/app/api/test-sanity/route.ts`