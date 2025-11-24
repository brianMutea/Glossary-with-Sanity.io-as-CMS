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
  const bgColor = category.color?.hex || '#00BFFF'

  return (
    <Link 
      href={`/category/${category.slug.current}`}
      className="block bg-[#1A1A1A] border border-[#333333] p-6 rounded-lg hover:border-[#00BFFF] hover:scale-105 transition-all duration-200 border-l-4"
      style={{
        borderLeftColor: bgColor
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 
          className="text-lg font-semibold text-[#FFFFFF]"
          style={{ color: bgColor }}
        >
          {category.title}
        </h3>
        {postCount !== undefined && (
          <span className="text-sm text-[#E0E0E0] bg-[#333333] px-2 py-1 rounded-full">
            {postCount} posts
          </span>
        )}
      </div>
      {category.description && (
        <p className="text-sm text-[#E0E0E0] line-clamp-2">
          {category.description}
        </p>
      )}
    </Link>
  )
}