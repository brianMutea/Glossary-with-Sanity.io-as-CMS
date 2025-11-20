# Tech Glossary

A modern, interactive technical knowledge platform that combines blogging with an intelligent glossary system. Features automatic term detection, hover tooltips, and curated learning paths.

## Features

### 📚 Interactive Glossary
- **Smart Term Detection**: Automatically highlights technical terms in blog posts
- **Hover Tooltips**: Instant definitions with torn-paper design aesthetic
- **Advanced Filtering**: Search by difficulty level, domain, and term type
- **Learning Paths**: Curated sequences of concepts for structured learning

### ✍️ Content Management
- **Rich Blog System**: Full-featured blog with series, categories, and code highlighting
- **Author Profiles**: Comprehensive author pages with social links
- **Media Support**: Images, videos, and interactive code blocks
- **SEO Optimized**: Automatic metadata generation and structured data

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Card Tooltips**: Hover previews for blog excerpts and definitions
- **Visual Feedback**: Smooth animations and interactive elements
- **Cross-Linking**: Seamless navigation between related content

## Tech Stack

### Frontend
- **Next.js 14** - App Router with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Suspense** - Lazy loading and performance optimization

### Backend & CMS
- **Sanity CMS** - Headless content management
- **GROQ** - Graph-Relational Object Queries
- **Sanity Studio** - Content editing interface

### Performance
- **Intelligent Caching** - 5-minute TTL with automatic invalidation
- **Content Pre-processing** - Server-side term analysis and regex compilation
- **Memoization** - React component optimization
- **Lazy Loading** - Code splitting and dynamic imports

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8.15.6+
- Sanity account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech-glossary
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp .env.local.example .env.local
   cp apps/studio/.env.local.example apps/studio/.env.local
   
   # Add your Sanity credentials
   # NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   # NEXT_PUBLIC_SANITY_DATASET=production
   # SANITY_API_TOKEN=your_token
   ```

4. **Start Development**
   ```bash
   # Start both web app and Sanity Studio
   pnpm dev
   ```

5. **Access Applications**
   - Web App: http://localhost:3000
   - Sanity Studio: http://localhost:3333

   > Note: `pnpm dev` uses Turbo to run both applications simultaneously

## Performance Optimizations

### Caching Strategy
- **GlossaryCache**: Singleton pattern with 5-minute TTL
- **ContentProcessor**: LRU cache for analyzed content (100 entries max)
- **Component Memoization**: React.useMemo for expensive operations

### Query Optimization
- **Single Analysis**: One content scan per blog post instead of double queries
- **Pre-compiled Regex**: Terms processed once and cached with regex patterns
- **Smart Filtering**: Quick string checks before expensive regex operations

### Bundle Optimization
- **Lazy Loading**: Tooltip content loaded on-demand
- **Code Splitting**: Dynamic imports for non-critical components
- **Tree Shaking**: Unused code elimination

### Performance Monitoring
- **Built-in Metrics**: Automatic tracking of slow operations (>100ms)
- **Development Warnings**: Console alerts for performance regressions
- **Cache Analytics**: Hit rates and average response times

## Project Structure

```
tech-glossary/
├── apps/
│   ├── web/                 # Next.js application
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   ├── components/  # React components
│   │   │   ├── lib/         # Utilities and services
│   │   │   └── sanity/      # CMS integration
│   │   └── public/          # Static assets
│   └── studio/              # Sanity Studio
│       ├── schemaTypes/     # Content schemas
│       └── components/      # Studio components
├── .env.local              # Environment variables
└── README.md              # This file
```

## Content Types

### Blog Posts
- Rich text content with PortableText
- Code blocks with syntax highlighting
- Video embeds and image galleries
- Series and category organization
- Author attribution and social links

### Glossary Terms
- Term definitions with examples
- Difficulty levels (Beginner, Intermediate, Advanced)
- Domain categorization (AI, ML, Data Science, etc.)
- Cross-references and prerequisites
- Tutorial article linking

### Learning Paths
- Structured learning sequences
- Prerequisites and dependencies
- Progress tracking capabilities
- Integration with glossary terms

## Development

### Adding New Features
1. Create schema types in `apps/studio/schemaTypes/`
2. Add queries in `apps/web/src/sanity/queries.ts`
3. Build components in `apps/web/src/components/`
4. Create pages in `apps/web/src/app/`

### Performance Guidelines
- Use the caching services (`glossaryCache`, `contentProcessor`)
- Implement memoization for expensive computations
- Lazy load non-critical components
- Monitor performance with built-in metrics

### Code Standards
- TypeScript strict mode enabled
- ESLint and Prettier configured
- Component-based architecture
- Server/Client component separation

## Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Add environment variables in dashboard
3. Deploy automatically on push

### Manual Deployment
1. Build the application: `pnpm build`
2. Deploy `apps/web/.next` to your hosting provider
3. Deploy Sanity Studio separately if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes following code standards
4. Test performance impact
5. Submit pull request

## License

MIT License - see LICENSE file for details