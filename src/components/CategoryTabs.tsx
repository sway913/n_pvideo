import { useState } from 'react'
import './CategoryTabs.css'

const categories = [
  'Nano Banana Pro',
  'Camera Controls',
  'Viral',
  'UGC',
  'Commercial',
  'Tiktok Trend',
  'Black Friday',
  'Christmas Special',
  'Kling 2.5 Turbo',
  'Seedance Pro',
]

interface CategoryTabsProps {
  onCategoryChange?: (category: string) => void
}

export function CategoryTabs({ onCategoryChange }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState('Nano Banana Pro')

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    onCategoryChange?.(category)
  }

  return (
    <div className="category-tabs">
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-item ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="category-underline" />
    </div>
  )
}
