// Optimized GROQ queries for better performance

export const POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  publishedAt,
  estimatedReadTime,
  difficulty,
  tags[0...3],
  codeLanguages[0...3],
  githubRepo,
  liveDemo,
  "author": author->{
    name,
    slug,
    avatar{
      asset->{
        _id,
        url
      }
    },
    bio
  },
  "categories": categories[0...2]->{
    title,
    slug,
    color
  },
  "series": series->{
    title,
    slug
  }
}[0...12]`

export const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  publishedAt,
  updatedAt,
  estimatedReadTime,
  difficulty,
  tags,
  codeLanguages,
  githubRepo,
  liveDemo,
  content,
  seo,
  "author": author->{
    name,
    slug,
    avatar{
      asset->{
        _id,
        url
      },
      alt
    },
    bio,
    social
  },
  "categories": categories[]->{
    title,
    slug,
    description,
    color
  },
  "series": series->{
    title,
    slug,
    description,
    status,
    estimatedParts,
    coverImage{
      asset->{
        _id,
        url
      },
      alt
    }
  }
}`

export const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color
}[0...50]`

export const AUTHORS_QUERY = `*[_type == "author"] | order(name asc) {
  _id,
  name,
  slug,
  avatar{
    asset->{
      _id,
      url
    },
    alt
  },
  bio,
  social
}[0...20]`

export const SERIES_QUERY = `*[_type == "series"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  status,
  estimatedParts,
  coverImage{
    asset->{
      _id,
      url
    },
    alt
  },
  "posts": *[_type == "blogPost" && references(^._id)] | order(publishedAt asc) {
    title,
    slug,
    publishedAt
  }
}[0...20]`

export const POSTS_SLUGS_QUERY = `*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current
}`

export const FEATURED_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  publishedAt,
  estimatedReadTime,
  difficulty,
  "author": author->{
    name,
    slug,
    avatar{
      asset->{
        _id,
        url
      }
    }
  },
  "categories": categories[0...2]->{title, slug, color},
  "series": series->{title, slug}
}[0...4]`

// Glossary Queries
export const GLOSSARY_TERMS_QUERY = `*[_type == "glossaryTerm"] | order(term asc) {
  _id,
  term,
  slug,
  shortDefinition,
  level,
  domain,
  type,
  image{
    asset->{
      _id,
      url
    },
    alt
  },
  tags,
  "relatedCount": count(relatedTerms),
  "tutorialArticle": tutorialArticle->{
    title,
    slug
  }
}`



export const GLOSSARY_TERM_QUERY = `*[_type == "glossaryTerm" && slug.current == $slug][0] {
  _id,
  term,
  slug,
  shortDefinition,
  fullExplanation,
  level,
  domain,
  type,
  image{
    asset->{
      _id,
      url
    },
    alt
  },
  codeExamples,
  realWorldUse,
  tags,
  externalLinks,
  "prerequisites": prerequisites[]->{
    term,
    slug,
    shortDefinition,
    level,
    domain
  },
  "relatedTerms": relatedTerms[]->{
    term,
    slug,
    shortDefinition,
    level,
    domain
  },
  "nextConcepts": nextConcepts[]->{
    term,
    slug,
    shortDefinition,
    level,
    domain
  },
  "tutorialArticle": tutorialArticle->{
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->{
      name,
      slug
    }
  }
}`

export const LEARNING_PATHS_QUERY = `*[_type == "learningPath"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  level,
  domain,
  estimatedDuration,
  coverImage{
    asset->{
      _id,
      url
    },
    alt
  },
  "topicsCount": count(topics),
  "tutorialSeries": tutorialSeries->{
    title,
    slug
  }
}`

export const LEARNING_PATH_QUERY = `*[_type == "learningPath" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  level,
  domain,
  estimatedDuration,
  coverImage{
    asset->{
      _id,
      url
    },
    alt
  },
  "topics": topics[]->{
    term,
    slug,
    shortDefinition,
    level,
    domain,
    type,
    image{
      asset->{
        _id,
        url
      },
      alt
    }
  },
  "prerequisites": prerequisites[]->{
    term,
    slug,
    shortDefinition,
    level,
    domain
  },
  "relatedPaths": relatedPaths[]->{
    title,
    slug,
    description,
    level,
    domain
  },
  "tutorialSeries": tutorialSeries->{
    title,
    slug,
    description,
    status
  }
}`

export const GLOSSARY_TERMS_SLUGS_QUERY = `*[_type == "glossaryTerm" && defined(slug.current)]{
  "slug": slug.current
}`

export const LEARNING_PATHS_SLUGS_QUERY = `*[_type == "learningPath" && defined(slug.current)]{
  "slug": slug.current
}`

// Query for glossary terms used in auto-linking
export const GLOSSARY_TERMS_FOR_LINKING_QUERY = `*[_type == "glossaryTerm"] {
  _id,
  term,
  slug,
  shortDefinition,
  level,
  domain
}`

// Query for knowledge graph - all terms with their relationships
export const KNOWLEDGE_GRAPH_QUERY = `*[_type == "glossaryTerm"] {
  _id,
  term,
  slug,
  shortDefinition,
  level,
  domain,
  type,
  image{
    asset->{
      _id,
      url
    },
    alt
  },
  tags,
  tutorialArticle->{
    title,
    slug
  },
  "prerequisites": prerequisites[]->{ _id, term, slug, level, domain },
  "relatedTerms": relatedTerms[]->{ _id, term, slug, level, domain },
  "nextConcepts": nextConcepts[]->{ _id, term, slug, level, domain }
}`

// Simple test query
export const SITE_SETTINGS_TEST_QUERY = `*[_type == "siteSettings"][0] {
  _id,
  title,
  tagline
}`

// Site Settings Query
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  _id,
  title,
  tagline,
  logo{
    type,
    textLogo{
      text,
      fontSize,
      fontWeight,
      color
    },
    imageLogo{
      image{
        asset->{
          _id,
          url
        },
        alt
      },
      width,
      height
    },
    svgLogo{
      svgCode,
      width,
      height
    },
    linkUrl
  },
  favicon{
    image{
      asset->{
        _id,
        url
      }
    },
    appleTouchIcon{
      asset->{
        _id,
        url
      }
    }
  },
  primaryColor,
  accentColor,
  heroSection{
    enabled,
    headline,
    subheadline,
    ctaButtons[]{
      text,
      url,
      style,
      openInNewTab
    },
    heroImage{
      type,
      image{
        asset->{
          _id,
          url
        },
        alt
      },
      codeSnippet{
        language,
        code
      },
      customHtml
    },
    backgroundColor,
    textColor
  }
}`

