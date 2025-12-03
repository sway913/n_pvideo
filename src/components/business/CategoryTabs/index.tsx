import { useNavigate, useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../../../constants'
import './CategoryTabs.css'

interface CategoryTabsProps {
  onCategoryChange?: (categorySlug: string) => void
}

export function CategoryTabs({ onCategoryChange }: CategoryTabsProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || CATEGORIES[0].slug

  const handleCategoryClick = (slug: string) => {
    navigate(`?category=${slug}`)
    onCategoryChange?.(slug)
  }

  return (
    <div className="category-tabs">
      <div className="category-list">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={`category-item ${activeCategory === category.slug ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="category-underline" />
    </div>
  )
}
