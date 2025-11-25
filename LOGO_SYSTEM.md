# Dynamic Logo System

This project now includes a comprehensive dynamic logo system that allows you to manage your site's branding through Sanity Studio without touching code.

## Features

### Logo Types Supported
- **Text Logo**: Custom text with configurable font size, weight, and color
- **Image Logo**: Upload PNG, JPG, or WebP images with custom dimensions
- **SVG Logo**: Paste SVG code directly with custom dimensions

### Favicon Management
- **Standard Favicon**: Upload favicon for browser tabs (32x32px recommended)
- **Apple Touch Icon**: Upload icon for Apple devices (180x180px recommended)

### Dynamic Updates
- Changes in Sanity Studio are reflected immediately across the site
- No code deployment needed for logo/favicon changes
- Automatic fallback to default logo if no configuration exists

## How to Use

### 1. Access Site Settings
1. Open Sanity Studio
2. Navigate to "⚙️ Site Settings" in the sidebar
3. This is a singleton document (only one instance exists)

### 2. Configure Your Logo

#### Text Logo
1. Set "Logo Type" to "Text Logo"
2. Enter your logo text
3. Choose font size (Small, Medium, Large, Extra Large)
4. Select font weight (Normal, Medium, Semibold, Bold)
5. Pick a color using the color picker

#### Image Logo
1. Set "Logo Type" to "Image Logo"
2. Upload your logo image (PNG, JPG, WebP)
3. Add alt text for accessibility
4. Set width and height in pixels
5. Optionally add a custom link URL

#### SVG Logo
1. Set "Logo Type" to "SVG Logo"
2. Paste your complete SVG code (including `<svg>` tags)
3. Set width and height in pixels
4. Optionally add a custom link URL

### 3. Configure Favicon
1. Upload a favicon image (PNG, ICO, or SVG)
2. Optionally upload an Apple Touch Icon for iOS devices

### 4. Additional Settings
- **Site Title**: Used in browser tabs and as fallback
- **Site Tagline**: Appears in footer and meta descriptions
- **Primary/Accent Colors**: For future theming features

## Technical Implementation

### Components
- `DynamicLogo`: Renders logos based on Sanity data
- `FaviconUpdater`: Dynamically updates favicon in browser
- `useSiteSettings`: Hook to fetch site settings data

### Usage in Code
```tsx
import { DynamicLogo } from '@/components/DynamicLogo'
import { useSiteSettings } from '@/hooks/useSiteSettings'

function MyComponent() {
  const { siteSettings } = useSiteSettings()
  
  return (
    <DynamicLogo 
      logoData={siteSettings?.logo}
      variant="header" // or "sidebar" or "footer"
    />
  )
}
```

### Variants
- **sidebar**: Used in the main navigation sidebar
- **footer**: Used in footer sections
- **header**: Used in page headers (if needed)

## Fallback Behavior
If no logo is configured in Sanity, the system falls back to:
- Default "Glossifyd" text logo with icon
- Standard favicon
- Default site title and tagline

## Best Practices

### Image Logos
- Use high-quality images with transparent backgrounds
- Recommended formats: PNG (with transparency) or SVG
- Keep file sizes reasonable (< 100KB)
- Test on both light and dark backgrounds

### SVG Logos
- Ensure SVG code is clean and optimized
- Remove unnecessary metadata and comments
- Test SVG rendering across different browsers
- Consider using relative units for better scaling

### Favicon
- Use 32x32px for standard favicon
- Use 180x180px for Apple Touch Icon
- PNG format recommended for best compatibility
- Ensure icon is recognizable at small sizes

## Troubleshooting

### Logo Not Appearing
1. Check if Site Settings document exists in Sanity
2. Verify logo type is selected correctly
3. Ensure image assets are published in Sanity
4. Check browser console for any errors

### Favicon Not Updating
1. Clear browser cache and hard refresh
2. Check if favicon image is uploaded and published
3. Verify image format is supported (PNG, ICO, SVG)

### SVG Issues
1. Validate SVG code syntax
2. Ensure SVG includes proper width/height attributes
3. Test SVG code in a separate HTML file first
4. Remove any external dependencies in SVG code