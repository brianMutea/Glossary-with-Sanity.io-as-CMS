import Link from 'next/link'

interface CategoryCardProps {
  category: {
    _id: string
    title: string
    slug: { current: string }
    description?: string
    color?: { hex: string }
  }
  postCount?: number
}

export function CategoryCard({ category, postCount }: CategoryCardProps) {
  const bgColor = category.color?.hex || '#2563eb'
  const lightBgColor = category.color?.hex ? `${category.color.hex}15` : '#dbeafe'

  return (
    <Link 
      href={`/category/${category.slug.current}`}
      className="block p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-l-4"
      style={{
        backgroundColor: lightBgColor,
        borderLeftColor: bgColor
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 
          className="text-lg font-semibold"
          style={{ color: bgColor }}
        >
          {category.title}
        </h3>
        {postCount !== undefined && (
          <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
            {postCount} posts
          </span>
        )}
      </div>
      {category.description && (
        <p className="text-sm text-gray-600 line-clamp-2">
          {category.description}
        </p>
      )}
    </Link>
  )
}