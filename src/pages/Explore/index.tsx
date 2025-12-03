import { useRef, useCallback, useState, useEffect } from 'react'
import { CategoryTabs, FeaturedCards, VideoGrid } from '../../components/business'
import { useHomeData } from '../../hooks/useHomeData'
import './ExplorePage.css'

export function ExplorePage() {
  const { categories, sections, loading } = useHomeData()
  const [activeSlug, setActiveSlug] = useState<string>('')
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())
  const isScrollingRef = useRef(false)

  // 默认选中第一个分类
  useEffect(() => {
    if (sections.length > 0 && !activeSlug) {
      setActiveSlug(sections[0].slug)
    }
  }, [sections, activeSlug])

  // 点击 Tab 滚动到对应区域
  const handleCategoryClick = useCallback((slug: string) => {
    const sectionEl = sectionRefs.current.get(slug)
    if (sectionEl) {
      isScrollingRef.current = true
      setActiveSlug(slug)
      
      const headerHeight = 72 // Header 高度
      const tabsHeight = 60 // CategoryTabs 高度
      const offset = headerHeight + tabsHeight + 20
      
      const elementPosition = sectionEl.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // 滚动结束后重置标志
      setTimeout(() => {
        isScrollingRef.current = false
      }, 500)
    }
  }, [])

  // 注册 section ref
  const setSectionRef = useCallback((slug: string, el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(slug, el)
    } else {
      sectionRefs.current.delete(slug)
    }
  }, [])

  // 监听滚动事件，更新当前激活的 Tab
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return
      
      const headerHeight = 72
      const tabsHeight = 60
      const offset = headerHeight + tabsHeight + 100
      
      let currentSlug = sections[0]?.slug || ''
      
      for (const section of sections) {
        const el = sectionRefs.current.get(section.slug)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= offset) {
            currentSlug = section.slug
          }
        }
      }
      
      if (currentSlug !== activeSlug) {
        setActiveSlug(currentSlug)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections, activeSlug])

  if (loading) {
    return (
      <div className="explore-page explore-loading">
        <div className="loading-spinner" />
        <p>加载中...</p>
      </div>
    )
  }

  return (
    <div className="explore-page">
      <section className="categories-section">
        <CategoryTabs 
          categories={categories}
          activeSlug={activeSlug}
          onCategoryClick={handleCategoryClick}
        />
      </section>

      <FeaturedCards />

      {sections.length > 0 && (
        <div className="gallery-header">
          <h1 className="gallery-title">{sections[0].name} Gallery</h1>
        </div>
      )}

      {sections.map((section) => (
        <div
          key={section.id}
          ref={(el) => setSectionRef(section.slug, el)}
          id={`section-${section.slug}`}
          className="video-section"
        >
          <VideoGrid 
            title={section.name}
            videos={section.videos}
            viewAllText="View all"
            viewAllLink={`/category/${section.slug}`}
          />
        </div>
      ))}
    </div>
  )
}
