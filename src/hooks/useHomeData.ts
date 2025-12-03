import { useState, useEffect } from 'react'
import { fetchHomeData, type CategoryWithVideos } from '../services/api'
import type { Category } from '../types'

interface UseHomeDataResult {
  categories: Category[]
  sections: CategoryWithVideos[]
  loading: boolean
  error: string | null
}

export function useHomeData(): UseHomeDataResult {
  const [categories, setCategories] = useState<Category[]>([])
  const [sections, setSections] = useState<CategoryWithVideos[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        setLoading(true)
        const data = await fetchHomeData()
        
        if (isMounted) {
          setCategories(data.categories)
          setSections(data.sections)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError('加载数据失败')
          console.error('Failed to load home data:', err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  return { categories, sections, loading, error }
}
