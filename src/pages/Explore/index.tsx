import { useRef, useCallback, useState, useEffect } from 'react'
import { Spin, Typography } from 'antd'
import { CategoryTabs, FeaturedCards, VideoGrid } from '../../components/business'
import { useHomeData } from '../../hooks/useHomeData'

const { Title } = Typography

function ExplorePage() {
  const { categories, sections, loading } = useHomeData()
  const [activeSlug, setActiveSlug] = useState<string>('')
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())
  const isScrollingRef = useRef(false)

  useEffect(() => {
    if (sections.length > 0 && !activeSlug) {
      setActiveSlug(sections[0].slug)
    }
  }, [sections, activeSlug])

  const handleCategoryClick = useCallback((slug: string) => {
    const sectionEl = sectionRefs.current.get(slug)
    if (sectionEl) {
      isScrollingRef.current = true
      setActiveSlug(slug)

      const headerHeight = 72
      const tabsHeight = 60
      const offset = headerHeight + tabsHeight + 20

      const elementPosition = sectionEl.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      setTimeout(() => {
        isScrollingRef.current = false
      }, 500)
    }
  }, [])

  const setSectionRef = useCallback((slug: string, el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(slug, el)
    } else {
      sectionRefs.current.delete(slug)
    }
  }, [])

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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] gap-4">
        <Spin size="large" />
        <p className="text-white/50">加载中...</p>
      </div>
    )
  }

  return (
    <div className="pb-16">
      <section className="pt-10 sticky top-[72px] z-50 bg-gradient-to-b from-black via-black to-transparent pb-4">
        <CategoryTabs
          categories={categories}
          activeSlug={activeSlug}
          onCategoryClick={handleCategoryClick}
        />
      </section>

      <FeaturedCards />

      {sections.length > 0 && (
        <div className="px-10 pt-8">
          <Title level={1} className="!text-4xl !font-bold !text-white !uppercase">
            {sections[0].name} Gallery
          </Title>
        </div>
      )}

      {sections.map((section) => (
        <div
          key={section.id}
          ref={(el) => setSectionRef(section.slug, el)}
          id={`section-${section.slug}`}
          className="scroll-mt-40"
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

export default ExplorePage
