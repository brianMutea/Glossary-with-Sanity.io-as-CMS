# UI Components Documentation

*Complete guide to all UI components in the Glossifyd application*

## Table of Contents

1. [Core UI Components](#core-ui-components)
2. [Card Components](#card-components)
3. [Navigation Components](#navigation-components)
4. [Content Components](#content-components)
5. [Interactive Components](#interactive-components)
6. [Layout Components](#layout-components)
7. [Utility Components](#utility-components)
8. [Usage Examples](#usage-examples)
9. [Best Practices](#best-practices)

---

## Core UI Components

### CustomSelect

**Purpose**: Accessible dropdown selection with keyboard navigation and dark theme styling.

**Location**: `src/components/ui/CustomSelect.tsx`

#### Props

```typescript
interface CustomSelectProps {
  options: Option[]           // Array of {value: string, label: string}
  value: string              // Currently selected value
  onChange: (value: string) => void  // Selection change handler
  placeholder?: string       // Placeholder text (default: "Select an option")
  label?: string            // Optional label above select
  className?: string        // Additional CSS classes
  disabled?: boolean        // Disable the select (default: false)
}
```

#### Features

- **Keyboard Navigation**: Arrow keys, Enter, Escape
- **Accessibility**: ARIA labels, roles, and states
- **Dark Theme**: CodePen-inspired styling
- **Click Outside**: Closes dropdown when clicking outside
- **Visual Feedback**: Hover states and focus indicators

#### Usage

```tsx
import { CustomSelect } from '@/components/ui/CustomSelect'

function FilterComponent() {
  const [level, setLevel] = useState('')
  
  return (
    <CustomSelect
      label="Difficulty Level"
      value={level}
      onChange={setLevel}
      options={[
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' }
      ]}
      placeholder="Select difficulty level"
    />
  )
}
```

#### Styling

- **Background**: `#1A1A1A` (dark card background)
- **Border**: `#333333` with `#00BFFF` on focus
- **Text**: `#FFFFFF` for selected, `#E0E0E0` for placeholder
- **Dropdown**: `#1A1A1A` background with `#333333` borders
- **Hover**: `#333333` background with `#00BFFF` text

---

### Badge

**Purpose**: Consistent status, level, and domain indicators with semantic colors.

**Location**: `src/components/ui/Badge.tsx`

#### Props

```typescript
interface BadgeProps {
  children: React.ReactNode    // Badge content
  variant?: 'default' | 'level' | 'domain' | 'status' | 'custom'
  size?: 'sm' | 'md'          // Size variant
  value?: string              // Used for level, domain, status variants
  className?: string          // Additional CSS classes
  style?: React.CSSProperties // Custom inline styles
}
```

#### Variants

**Level Badges** (`variant="level"`):
- **Beginner**: `#39FF14` (Neon Green)
- **Intermediate**: `#FFD700` (Golden Yellow)
- **Advanced**: `#FF6F61` (Coral Pink)

**Domain Badges** (`variant="domain"`):
- **AI**: `#E6E6FA` (Lavender)
- **ML**: `#00BFFF` (Electric Blue)
- **Data Science**: `#39FF14` (Neon Green)
- **Software Engineering**: `#E0E0E0` (Light Gray)

**Status Badges** (`variant="status"`):
- **Success**: `#39FF14`
- **Warning**: `#FFD700`
- **Error**: `#FF6F61`
- **Info**: `#00BFFF`

#### Usage

```tsx
import { Badge } from '@/components/ui/Badge'

function TermCard({ term }) {
  return (
    <div>
      <Badge variant="level" value={term.level}>
        {term.level}
      </Badge>
      <Badge variant="domain" value={term.domain}>
        {term.domain}
      </Badge>
    </div>
  )
}
```

---

### MetaInfo

**Purpose**: Consistent author and metadata display across content types.

**Location**: `src/components/ui/MetaInfo.tsx`

#### Props

```typescript
interface MetaInfoProps {
  author?: {
    name: string
    avatar?: { asset: { _id: string; url: string }; alt?: string }
  }
  publishedAt?: string        // ISO date string
  estimatedReadTime?: number  // Minutes
  additionalInfo?: React.ReactNode  // Extra metadata
  className?: string          // Additional CSS classes
}
```

#### Features

- **Avatar Support**: Displays author avatar or initials fallback
- **Date Formatting**: Uses date-fns for consistent formatting
- **Read Time**: Shows estimated reading time
- **Flexible Layout**: Supports additional metadata

#### Usage

```tsx
import { MetaInfo } from '@/components/ui/MetaInfo'

function BlogPost({ post }) {
  return (
    <article>
      <MetaInfo
        author={post.author}
        publishedAt={post.publishedAt}
        estimatedReadTime={post.estimatedReadTime}
        additionalInfo={<span>Updated recently</span>}
      />
    </article>
  )
}
```

---

### ImageWithFallback

**Purpose**: Robust image display with fallbacks, overlays, and icons.

**Location**: `src/components/ui/ImageWithFallback.tsx`

#### Props

```typescript
interface ImageWithFallbackProps {
  image?: { asset: { _id: string; url: string }; alt?: string }
  alt: string                 // Alt text for accessibility
  width: number              // Image width
  height: number             // Image height
  className?: string         // Additional CSS classes
  containerClassName?: string // Container CSS classes
  showOverlay?: boolean      // Show dark overlay
  icon?: string             // Icon to display
  iconPosition?: 'top-left' | 'top-right' | 'center'
  fallbackGradient?: string  // CSS gradient for fallback
  priority?: boolean         // Next.js Image priority
}
```

#### Features

- **Sanity Integration**: Works with Sanity image assets
- **Fallback Support**: Gradient or icon fallbacks
- **Overlay System**: Optional dark overlays
- **Icon Positioning**: Flexible icon placement
- **Responsive**: Proper sizing and aspect ratios

#### Usage

```tsx
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'

function FeatureCard({ item }) {
  return (
    <div className="relative">
      <ImageWithFallback
        image={item.coverImage}
        alt={item.title}
        width={400}
        height={200}
        showOverlay={true}
        icon="🎯"
        iconPosition="top-right"
        fallbackGradient="bg-gradient-to-br from-blue-500 to-purple-600"
      />
    </div>
  )
}
```

---

## Card Components

### CompactTermCard

**Purpose**: Compact display of glossary terms in grid layouts.

**Location**: `src/components/CompactTermCard.tsx`

#### Props

```typescript
interface CompactTermCardProps {
  term: {
    _id: string
    term: string
    slug: { current: string }
    shortDefinition: string
    level: 'beginner' | 'intermediate' | 'advanced'
    domain: string
    type: string
    // ... other term properties
  }
  onHover?: (term: any, rect: DOMRect) => void  // Hover handler for tooltips
  onHoverEnd?: () => void                       // Hover end handler
  onTap?: (term: any) => void                  // Click handler
}
```

#### Features

- **Domain Color Bar**: Top accent bar with domain-specific color
- **Level Indicator**: Colored dot showing difficulty level
- **Hover Effects**: Scale transform and border color change
- **Tooltip Support**: Provides rect for tooltip positioning
- **Responsive**: Adapts to different screen sizes

#### Styling

- **Background**: `#1A1A1A` with `#333333` border
- **Hover**: Scales to 105% with `#00BFFF` border
- **Text**: `#FFFFFF` for term name, `#E0E0E0` for type
- **Accent Bar**: Full-width top bar with domain color
- **Level Dot**: 2x2 rounded indicator with level color

#### Usage

```tsx
import { CompactTermCard } from '@/components/CompactTermCard'

function TermsGrid({ terms, onTermHover, onTermClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {terms.map(term => (
        <CompactTermCard
          key={term._id}
          term={term}
          onHover={onTermHover}
          onTap={onTermClick}
        />
      ))}
    </div>
  )
}
```

---

### BlogCard

**Purpose**: Rich display of blog posts with metadata, tags, and author info.

**Location**: `src/components/BlogCard.tsx`

#### Props

```typescript
interface BlogCardProps {
  post: any                   // Blog post object from Sanity
  featured?: boolean          // Whether this is a featured post
}
```

#### Features

- **Featured Image**: Aspect-ratio maintained cover images
- **Series Badge**: Links to parent series if applicable
- **Category Tags**: Color-coded category indicators
- **Code Language Tags**: Programming language indicators
- **Author Info**: Avatar, name, date, read time
- **Project Links**: GitHub and live demo buttons
- **Hover Effects**: Scale and border color transitions

#### Styling

- **Card**: `#1A1A1A` background with `#333333` border
- **Hover**: Scales to 105% with `#00BFFF` border
- **Text**: `#FFFFFF` for titles, `#E0E0E0` for descriptions
- **Tags**: Various colors for categories, `#00BFFF` for code languages
- **Author**: `#FFFFFF` for name, `#E0E0E0` for metadata

#### Usage

```tsx
import { BlogCard } from '@/components/BlogCard'

function BlogGrid({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <BlogCard
          key={post._id}
          post={post}
          featured={index === 0}
        />
      ))}
    </div>
  )
}
```

---

### LearningPathCard

**Purpose**: Display learning paths with progress indicators and metadata.

**Location**: `src/components/LearningPathCard.tsx`

#### Props

```typescript
interface LearningPathCardProps {
  path: {
    _id: string
    title: string
    slug: { current: string }
    description: string
    level: string
    domain: string
    estimatedDuration?: string
    coverImage?: any
    topicsCount?: number
    tutorialSeries?: any
  }
}
```

#### Features

- **Cover Image**: Hero image with gradient overlay
- **Duration Badge**: Estimated completion time
- **Level & Domain Badges**: Color-coded indicators
- **Progress Dots**: Visual representation of topics
- **Series Integration**: Shows if tutorial series included
- **Hover Effects**: Image scale and card border transitions

#### Usage

```tsx
import { LearningPathCard } from '@/components/LearningPathCard'

function PathsGrid({ paths }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paths.map(path => (
        <LearningPathCard key={path._id} path={path} />
      ))}
    </div>
  )
}
```

---

### AuthorCard

**Purpose**: Display author information with social links and bio.

**Location**: `src/components/AuthorCard.tsx`

#### Props

```typescript
interface AuthorCardProps {
  author: {
    _id: string
    name: string
    slug: { current: string }
    avatar?: any
    bio?: string
    social?: {
      twitter?: string
      github?: string
      linkedin?: string
      website?: string
    }
  }
}
```

#### Features

- **Avatar Display**: Image or initials fallback
- **Bio Truncation**: Line-clamp for consistent heights
- **Social Links**: Icon-based social media links
- **Hover Effects**: Scale and border color changes
- **Responsive**: Adapts to grid layouts

#### Usage

```tsx
import { AuthorCard } from '@/components/AuthorCard'

function AuthorsGrid({ authors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {authors.map(author => (
        <AuthorCard key={author._id} author={author} />
      ))}
    </div>
  )
}
```

---

## Navigation Components

### Header

**Purpose**: Main site navigation with search and responsive menu.

**Location**: `src/components/Header.tsx`

#### Props

```typescript
interface HeaderProps {
  searchPlaceholder?: string  // Search input placeholder
  className?: string          // Additional CSS classes
  showMenuButton?: boolean    // Show mobile menu button
  containerClassName?: string // Container CSS classes
}
```

#### Features

- **Responsive Design**: Mobile-first with collapsible menu
- **Global Search**: Integrated search functionality
- **Brand Logo**: Glossifyd branding
- **Navigation Links**: Main site sections
- **Dark Theme**: Consistent with design system

#### Usage

```tsx
import { Header } from '@/components/Header'

function Layout({ children }) {
  return (
    <>
      <Header searchPlaceholder="Search terms, concepts..." />
      <main>{children}</main>
    </>
  )
}
```

---

### Sidebar

**Purpose**: Left navigation for main site sections.

**Location**: `src/components/Sidebar.tsx`

#### Features

- **Section Links**: Glossary, Blog, Learning Paths, etc.
- **Active States**: Underline indicators for current page
- **Dark Theme**: `#121212` background with proper contrast
- **Responsive**: Collapsible on mobile devices

#### Usage

```tsx
import { Sidebar } from '@/components/Sidebar'

function AppLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
```

---

## Content Components

### CodeBlock

**Purpose**: Syntax-highlighted code display with copy functionality.

**Location**: `src/components/CodeBlock.tsx`

#### Props

```typescript
interface CodeBlockProps {
  code: string                // Code content
  language?: string          // Programming language
  filename?: string          // Optional filename header
  theme?: 'light' | 'dark'   // Color theme
}
```

#### Features

- **Syntax Highlighting**: Prism.js integration
- **Language Support**: JavaScript, TypeScript, Python, etc.
- **Copy to Clipboard**: One-click code copying
- **Filename Display**: Optional file header
- **Theme Support**: Light and dark variants
- **Language Detection**: Automatic language mapping

#### Usage

```tsx
import { CodeBlock } from '@/components/CodeBlock'

function TutorialContent() {
  return (
    <CodeBlock
      code={`const example = 'Hello World';\nconsole.log(example);`}
      language="javascript"
      filename="example.js"
      theme="dark"
    />
  )
}
```

---

### VideoEmbed

**Purpose**: Responsive video embedding with platform detection.

**Location**: `src/components/VideoEmbed.tsx`

#### Props

```typescript
interface VideoEmbedProps {
  url: string                 // Video URL
  title?: string             // Video title
  caption?: string           // Video caption
}
```

#### Features

- **Platform Support**: YouTube, Vimeo, Loom, Twitch
- **Responsive**: 16:9 aspect ratio maintained
- **Platform Indicators**: Visual platform badges
- **Error Handling**: Invalid URL feedback
- **External Links**: Links to original platform

#### Usage

```tsx
import { VideoEmbed } from '@/components/VideoEmbed'

function TutorialPage() {
  return (
    <VideoEmbed
      url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      title="Introduction to Machine Learning"
      caption="A comprehensive overview of ML concepts"
    />
  )
}
```

---

### EnhancedPortableText

**Purpose**: Rich text rendering with glossary term integration.

**Location**: `src/components/EnhancedPortableText.tsx`

#### Props

```typescript
interface EnhancedPortableTextProps {
  value: any                  // Portable Text content
  glossaryTerms?: any[]      // Available glossary terms
}
```

#### Features

- **Glossary Integration**: Automatic term linking and tooltips
- **Rich Components**: Custom renderers for all content types
- **Dark Theme**: Consistent styling with design system
- **Performance**: Optimized term matching and rendering

#### Usage

```tsx
import { EnhancedPortableText } from '@/components/EnhancedPortableText'

function BlogContent({ content, glossaryTerms }) {
  return (
    <div className="prose prose-xl max-w-none">
      <EnhancedPortableText
        value={content}
        glossaryTerms={glossaryTerms}
      />
    </div>
  )
}
```

---

## Interactive Components

### GlossaryTooltip

**Purpose**: Hover tooltips for glossary term definitions.

**Location**: `src/components/GlossaryTooltip.tsx`

#### Props

```typescript
interface GlossaryTooltipProps {
  term: string               // Term name
  slug: string              // Term slug for linking
  definition: string        // Short definition
  level?: string           // Difficulty level
  domain?: string          // Subject domain
  children: React.ReactNode // Wrapped content
}
```

#### Features

- **Hover Activation**: Shows on mouse enter with delay
- **Lazy Loading**: Tooltip content loaded on demand
- **Positioning**: Smart positioning to stay in viewport
- **Click Through**: Links to full glossary page
- **Accessibility**: Proper ARIA attributes

#### Usage

```tsx
import { GlossaryTooltip } from '@/components/GlossaryTooltip'

function ContentWithTooltips() {
  return (
    <p>
      Machine learning uses{' '}
      <GlossaryTooltip
        term="Neural Networks"
        slug="neural-networks"
        definition="Computing systems inspired by biological neural networks"
        level="intermediate"
        domain="ml"
      >
        neural networks
      </GlossaryTooltip>
      {' '}to process data.
    </p>
  )
}
```

---

### SearchBar

**Purpose**: Debounced search input with clear functionality.

**Location**: `src/components/SearchBar.tsx`

#### Props

```typescript
interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void  // Search handler
  placeholder?: string                          // Input placeholder
  className?: string                           // Additional CSS classes
}
```

#### Features

- **Debounced Input**: 300ms delay to prevent excessive API calls
- **Clear Button**: X button to clear search
- **Search Icon**: Visual search indicator
- **Responsive**: Adapts to container width

#### Usage

```tsx
import { SearchBar } from '@/components/SearchBar'

function SearchableList() {
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <SearchBar
      onSearchChange={setSearchTerm}
      placeholder="Search terms, definitions..."
      className="mb-6"
    />
  )
}
```

---

### KnowledgeGraph

**Purpose**: Interactive D3.js visualization of term relationships.

**Location**: `src/components/KnowledgeGraph.tsx`

#### Props

```typescript
interface KnowledgeGraphProps {
  terms: any[]               // Array of glossary terms
  className?: string         // Additional CSS classes
}
```

#### Features

- **D3.js Integration**: Force-directed graph layout
- **Interactive Nodes**: Click to view term details
- **Zoom & Pan**: Full navigation controls
- **Relationship Types**: Prerequisites, next concepts, related terms
- **Responsive**: Adapts to container size
- **Performance**: Optimized for large datasets

#### Usage

```tsx
import { KnowledgeGraph } from '@/components/KnowledgeGraph'

function GraphPage({ terms }) {
  return (
    <div className="h-screen">
      <KnowledgeGraph
        terms={terms}
        className="w-full h-full"
      />
    </div>
  )
}
```

---

## Layout Components

### LayoutWrapper

**Purpose**: Main application layout with sidebar and header.

**Location**: `src/components/LayoutWrapper.tsx`

#### Features

- **Responsive Layout**: Sidebar collapses on mobile
- **Header Integration**: Consistent header across pages
- **Content Area**: Proper spacing and max-widths
- **Dark Theme**: Full dark mode implementation

#### Usage

```tsx
import { LayoutWrapper } from '@/components/LayoutWrapper'

function App({ children }) {
  return (
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  )
}
```

---

### Hero

**Purpose**: Landing page hero section with call-to-action.

**Location**: `src/components/Hero.tsx`

#### Features

- **Gradient Background**: Eye-catching visual design
- **Animated Elements**: Subtle animations and transitions
- **CTA Buttons**: Primary and secondary actions
- **Responsive**: Mobile-optimized layout

#### Usage

```tsx
import { Hero } from '@/components/Hero'

function HomePage() {
  return (
    <>
      <Hero />
      {/* Rest of page content */}
    </>
  )
}
```

---

## Utility Components

### SocialLinks

**Purpose**: Consistent social media link display.

**Location**: `src/components/SocialLinks.tsx`

#### Props

```typescript
interface SocialLinksProps {
  social: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
  variant?: 'icons' | 'buttons' | 'compact'  // Display style
  className?: string                         // Additional CSS classes
}
```

#### Variants

- **Icons**: Small icon-only links
- **Buttons**: Full button styling with labels
- **Compact**: Minimal spacing for tight layouts

#### Usage

```tsx
import { SocialLinks } from '@/components/SocialLinks'

function AuthorProfile({ author }) {
  return (
    <div>
      <h2>{author.name}</h2>
      <SocialLinks
        social={author.social}
        variant="buttons"
        className="mt-4"
      />
    </div>
  )
}
```

---

### CardTooltip

**Purpose**: Simple tooltip for card hover states.

**Location**: `src/components/CardTooltip.tsx`

#### Props

```typescript
interface CardTooltipProps {
  content: string            // Tooltip text
  children: React.ReactNode  // Wrapped content
}
```

#### Features

- **Hover Activation**: Shows on mouse enter
- **Simple Styling**: Minimal dark tooltip
- **Positioning**: Auto-positioning to avoid viewport edges

#### Usage

```tsx
import { CardTooltip } from '@/components/CardTooltip'

function InfoCard({ description }) {
  return (
    <CardTooltip content={description}>
      <div className="truncate">
        {description}
      </div>
    </CardTooltip>
  )
}
```

---

## Usage Examples

### Complete Page Layout

```tsx
import { LayoutWrapper } from '@/components/LayoutWrapper'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { CompactTermCard } from '@/components/CompactTermCard'
import { SearchBar } from '@/components/SearchBar'

function GlossaryPage({ terms }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('')

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = !selectedLevel || term.level === selectedLevel
    const matchesDomain = !selectedDomain || term.domain === selectedDomain
    return matchesSearch && matchesLevel && matchesDomain
  })

  return (
    <LayoutWrapper>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#FFD700] mb-4">
            Glossifyd
          </h1>
          <p className="text-xl text-[#E0E0E0]">
            Explore {terms.length} technical concepts and definitions
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SearchBar
            onSearchChange={setSearchTerm}
            placeholder="Search terms..."
          />
          <CustomSelect
            label="Level"
            value={selectedLevel}
            onChange={setSelectedLevel}
            options={[
              { value: '', label: 'All Levels' },
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' }
            ]}
          />
          <CustomSelect
            label="Domain"
            value={selectedDomain}
            onChange={setSelectedDomain}
            options={[
              { value: '', label: 'All Domains' },
              { value: 'ai', label: 'Artificial Intelligence' },
              { value: 'ml', label: 'Machine Learning' },
              { value: 'data-science', label: 'Data Science' }
            ]}
          />
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map(term => (
            <CompactTermCard
              key={term._id}
              term={term}
            />
          ))}
        </div>
      </div>
    </LayoutWrapper>
  )
}
```

### Blog Post Layout

```tsx
import { MetaInfo } from '@/components/ui/MetaInfo'
import { Badge } from '@/components/ui/Badge'
import { EnhancedPortableText } from '@/components/EnhancedPortableText'
import { CodeBlock } from '@/components/CodeBlock'

function BlogPost({ post, glossaryTerms }) {
  return (
    <div className="min-h-screen bg-[#121212] py-16">
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded border border-gray-200 shadow-lg p-8 md:p-12">
            {/* Header */}
            <header className="mb-12">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories?.map(category => (
                  <Badge
                    key={category.slug.current}
                    variant="custom"
                    style={{
                      backgroundColor: `${category.color?.hex}20`,
                      color: category.color?.hex
                    }}
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              <MetaInfo
                author={post.author}
                publishedAt={post.publishedAt}
                estimatedReadTime={post.estimatedReadTime}
              />
            </header>

            {/* Content */}
            <div className="prose prose-xl max-w-none">
              <EnhancedPortableText
                value={post.content}
                glossaryTerms={glossaryTerms}
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
```

---

## Best Practices

### Component Composition

1. **Single Responsibility**: Each component has one clear purpose
2. **Prop Interface**: Well-defined TypeScript interfaces
3. **Default Props**: Sensible defaults for optional props
4. **Error Boundaries**: Graceful error handling

### Styling Consistency

1. **Design System**: Use colors from `lib/designSystem.ts`
2. **Spacing**: Follow 8px grid system
3. **Typography**: Consistent font sizes and weights
4. **Dark Theme**: All components support dark mode

### Performance Optimization

1. **Lazy Loading**: Use React.lazy for heavy components
2. **Memoization**: React.memo for expensive renders
3. **Image Optimization**: Next.js Image component
4. **Bundle Splitting**: Dynamic imports for large dependencies

### Accessibility

1. **ARIA Labels**: Proper labeling for screen readers
2. **Keyboard Navigation**: Full keyboard support
3. **Color Contrast**: WCAG AA compliance
4. **Focus Management**: Visible focus indicators

### Testing

1. **Unit Tests**: Test component logic and rendering
2. **Integration Tests**: Test component interactions
3. **Visual Tests**: Screenshot testing for UI consistency
4. **Accessibility Tests**: Automated a11y testing

### Documentation

1. **Props Documentation**: Clear prop descriptions
2. **Usage Examples**: Real-world usage patterns
3. **Storybook**: Interactive component documentation
4. **Type Safety**: Full TypeScript coverage

---

## Component Dependencies

### External Dependencies

- **React**: Core framework
- **Next.js**: Image optimization and routing
- **Tailwind CSS**: Utility-first styling
- **D3.js**: Data visualization (KnowledgeGraph)
- **Prism.js**: Syntax highlighting (CodeBlock)
- **date-fns**: Date formatting (MetaInfo)

### Internal Dependencies

- **Design System**: `lib/designSystem.ts`
- **Dynamic Colors**: `lib/dynamicColors.ts`
- **Sanity Integration**: Image URL generation
- **Glossary Processing**: Term detection and linking

### File Structure

```
src/
├── components/
│   ├── ui/                    # Core UI components
│   │   ├── CustomSelect.tsx
│   │   ├── Badge.tsx
│   │   ├── MetaInfo.tsx
│   │   └── ImageWithFallback.tsx
│   ├── CompactTermCard.tsx    # Card components
│   ├── BlogCard.tsx
│   ├── LearningPathCard.tsx
│   ├── AuthorCard.tsx
│   ├── Header.tsx             # Navigation components
│   ├── Sidebar.tsx
│   ├── CodeBlock.tsx          # Content components
│   ├── VideoEmbed.tsx
│   ├── EnhancedPortableText.tsx
│   ├── GlossaryTooltip.tsx    # Interactive components
│   ├── SearchBar.tsx
│   ├── KnowledgeGraph.tsx
│   └── LayoutWrapper.tsx      # Layout components
└── lib/
    ├── designSystem.ts        # Design system utilities
    └── dynamicColors.ts       # Color generation
```

---

*This documentation is maintained alongside the component implementations. For the latest updates, refer to the individual component files and their TypeScript interfaces.*

*Last updated: December 2024*
*Version: 1.0.0*"