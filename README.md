# Tech Glossary

A comprehensive technical glossary and blog platform with interactive features, built with Next.js 14 and Sanity CMS.

## 🎯 Goal

Create a modern, searchable platform for technical definitions, tutorials, and learning resources with an intuitive content management system.

## ✨ Features

- **Interactive Glossary**: Searchable terms with tooltips and modal previews
- **Dynamic Hero Section**: Customizable homepage with code snippets or images
- **Blog System**: Technical articles with series organization
- **Learning Paths**: Curated educational journeys
- **Knowledge Graph**: Visual term relationships
- **Advanced Search**: Global search with filtering by level, domain, and type
- **Site Customization**: Dynamic logos, colors, and branding via CMS
- **Responsive Design**: Mobile-first with dark theme
- **Performance Optimized**: Server-side rendering and caching

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **CMS**: Sanity Studio with custom schemas
- **Styling**: Tailwind CSS with custom design system
- **Package Manager**: pnpm
- **Deployment**: Vercel + Sanity hosting

## 📋 Requirements

- Node.js 18+
- pnpm 8+
- Sanity account

## 🚀 Quick Start

### 1. Installation

```bash
git clone <repository-url>
cd tech-glossary
pnpm install
```

### 2. Environment Setup

```bash
# Web app
cp apps/web/.env.example apps/web/.env.local

# Studio
cp apps/studio/.env.example apps/studio/.env.local
```

Update both `.env.local` files with your Sanity project ID:
```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

### 3. Development

```bash
# Start both applications
pnpm dev

# Or individually
pnpm dev:web     # http://localhost:3000
pnpm dev:studio  # http://localhost:3333
```

## 🚢 Deployment

### Sanity Studio

```bash
cd apps/studio
npx sanity login
npx sanity deploy
```

Choose a hostname like `your-name-tech-glossary` when prompted.

### Web Application

**Vercel (Recommended):**
1. Connect repository to Vercel
2. Set environment variables
3. Deploy

**Manual:**
```bash
cd apps/web
pnpm build
pnpm start
```

## 📁 Project Structure

```
tech-glossary/
├── apps/
│   ├── web/                 # Next.js application
│   │   ├── src/
│   │   │   ├── app/         # App router pages
│   │   │   ├── components/  # React components
│   │   │   ├── lib/         # Utilities
│   │   │   └── sanity/      # Sanity integration
│   │   └── public/          # Static assets
│   └── studio/              # Sanity Studio
│       ├── schemaTypes/     # Content schemas
│       └── components/      # Custom studio components
└── README.md
```

## 🎨 Content Management

### Access Studio
- Local: http://localhost:3333
- Deployed: https://your-hostname.sanity.studio

### Content Types
- **Glossary Terms**: Technical definitions with levels and domains
- **Blog Posts**: Articles with rich content and code blocks
- **Learning Paths**: Structured learning sequences
- **Site Settings**: Logo, colors, hero section configuration
- **Authors & Categories**: Content organization

### Site Customization
Navigate to "Site Settings" in Sanity Studio to configure:
- Logo (text, image, or SVG)
- Hero section content and visuals
- Brand colors and favicon

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start both apps
pnpm dev:web          # Web app only
pnpm dev:studio       # Studio only

# Production
pnpm build            # Build both apps
pnpm start            # Start production server

# Maintenance
pnpm lint             # Lint code
pnpm clean            # Clean build files
```

## 🌟 Key Features Detail

### Interactive Glossary
- Hover tooltips for quick definitions
- Modal previews with full content
- Advanced filtering and search
- Alphabetical organization

### Dynamic Hero Section
- Configurable via Sanity Studio
- Support for images, code snippets, or custom HTML
- Responsive design with mobile optimization
- Custom CTA buttons

### Performance Features
- Server-side rendering for SEO
- Image optimization
- Caching strategies
- Mobile-first responsive design

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.