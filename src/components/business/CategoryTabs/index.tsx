import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Button } from 'antd'
import type { Category } from '../../../types'

// Types
interface CategoryTabsProps {
  categories: Category[]
  activeSlug?: string
  onCategoryClick?: (categorySlug: string) => void
}

// Component
function CategoryTabs({ categories, activeSlug, onCategoryClick }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(activeSlug || '')
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  useEffect(() => {
    if (activeSlug) {
      setActiveCategory(activeSlug)
    }
  }, [activeSlug])

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].slug)
    }
  }, [categories, activeCategory])

  const updateUnderline = useCallback(() => {
    const activeTab = tabRefs.current.get(activeCategory)
    const container = tabsRef.current
    if (activeTab && container) {
      const containerRect = container.getBoundingClientRect()
      const tabRect = activeTab.getBoundingClientRect()
      setUnderlineStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      })
    }
  }, [activeCategory])

  useEffect(() => {
    updateUnderline()
  }, [activeCategory, updateUnderline, categories])

  useEffect(() => {
    window.addEventListener('resize', updateUnderline)
    return () => window.removeEventListener('resize', updateUnderline)
  }, [updateUnderline])

  const handleCategoryClick = useCallback((slug: string) => {
    setActiveCategory(slug)
    onCategoryClick?.(slug)
  }, [onCategoryClick])

  const setTabRef = useCallback((slug: string, el: HTMLButtonElement | null) => {
    if (el) {
      tabRefs.current.set(slug, el)
    } else {
      tabRefs.current.delete(slug)
    }
  }, [])

  const underlineOpacity = useMemo(() => underlineStyle.width > 0 ? 1 : 0, [underlineStyle.width])

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="relative px-10" ref={tabsRef}>
      <div className="flex items-center gap-9 overflow-x-auto pb-3 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category.id}
            ref={(el) => setTabRef(category.slug, el as HTMLButtonElement | null)}
            type="text"
            className={`!text-xl !font-semibold !whitespace-nowrap !p-0 !h-auto !border-none transition-all ${
              activeCategory === category.slug
                ? '!font-bold gradient-text-green'
                : '!text-white/50 hover:!text-white/80'
            }`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div
        className="absolute bottom-0 h-[3px] gradient-green rounded transition-all duration-300"
        style={{
          left: underlineStyle.left,
          width: underlineStyle.width,
          opacity: underlineOpacity
        }}
      />
    </div>
  )
}

export default CategoryTabs
