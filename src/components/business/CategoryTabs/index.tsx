import { useState, useEffect, useRef, useCallback } from 'react'
import type { Category } from '../../../types'
import './CategoryTabs.css'

interface CategoryTabsProps {
  categories: Category[]
  activeSlug?: string
  onCategoryClick?: (categorySlug: string) => void
}

export function CategoryTabs({ categories, activeSlug, onCategoryClick }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(activeSlug || '')
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  // 同步外部传入的 activeSlug
  useEffect(() => {
    if (activeSlug) {
      setActiveCategory(activeSlug)
    }
  }, [activeSlug])

  // 默认选中第一个分类
  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].slug)
    }
  }, [categories, activeCategory])

  // 更新下划线位置
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

  // 当激活项变化时更新下划线
  useEffect(() => {
    updateUnderline()
  }, [activeCategory, updateUnderline, categories])

  // 监听窗口大小变化
  useEffect(() => {
    window.addEventListener('resize', updateUnderline)
    return () => window.removeEventListener('resize', updateUnderline)
  }, [updateUnderline])

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug)
    onCategoryClick?.(slug)
  }

  const setTabRef = (slug: string, el: HTMLButtonElement | null) => {
    if (el) {
      tabRefs.current.set(slug, el)
    } else {
      tabRefs.current.delete(slug)
    }
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="category-tabs" ref={tabsRef}>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category.id}
            ref={(el) => setTabRef(category.slug, el)}
            className={`category-item ${activeCategory === category.slug ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div 
        className="category-underline" 
        style={{ 
          left: underlineStyle.left, 
          width: underlineStyle.width,
          opacity: underlineStyle.width > 0 ? 1 : 0
        }} 
      />
    </div>
  )
}
