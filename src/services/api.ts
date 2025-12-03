import type { Category, Video, VideoTag } from '../types'

// 模拟网络延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模拟分类数据
const mockCategories: Category[] = [
  { id: '1', name: 'Nano Banana Pro', slug: 'nano-banana-pro', description: 'The camera pulls back rapidly from the subject to reveal their city, then the continent, and finally the entire Earth.' },
  { id: '2', name: 'Camera Controls', slug: 'camera-controls', description: 'Master the art of camera movement with dynamic controls and techniques.' },
  { id: '3', name: 'Viral', slug: 'viral', description: 'Trending content that captures attention and spreads across social media platforms.' },
  { id: '4', name: 'UGC', slug: 'ugc', description: 'User-generated content that feels authentic and connects with audiences.' },
  { id: '5', name: 'Commercial', slug: 'commercial', description: 'Professional advertising and promotional videos designed to showcase products.' },
  { id: '6', name: 'Tiktok Trend', slug: 'tiktok-trend', description: 'Stay ahead with the latest TikTok trends and viral video formats.' },
  { id: '7', name: 'Black Friday', slug: 'black-friday', description: 'Special promotional content for the biggest shopping event.' },
  { id: '8', name: 'Christmas Special', slug: 'christmas-special', description: 'Festive and holiday-themed content for Christmas celebrations.' },
  { id: '9', name: 'Kling 2.5 Turbo', slug: 'kling-turbo', description: 'Powered by Kling 2.5 Turbo AI engine for ultra-fast video generation.' },
  { id: '10', name: 'Seedance Pro', slug: 'seedance-pro', description: 'Advanced dance and motion content created with Seedance Pro technology.' },
]

// 模拟视频数据生成
const generateMockVideos = (categorySlug: string, count: number): Video[] => {
  const heights = [297, 345, 396, 269, 377, 299, 320, 380]
  const images = [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400',
    'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400',
    'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400',
    'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
  ]
  const titles = [
    'Brazil Jersey in Transit',
    'Cinematic Mountain View',
    'Urban Street Style',
    'Nature Documentary',
    'Fashion Forward',
    'Tech Innovation',
    'Travel Vlog',
    'Music Video',
  ]
  const tags: VideoTag[] = ['hot', 'new', 'recommended', null, null, null, null]

  return Array.from({ length: count }, (_, i) => ({
    id: parseInt(categorySlug.replace(/[^0-9]/g, '') || '1') * 100 + i + 1,
    title: titles[i % titles.length],
    image: images[i % images.length],
    height: heights[i % heights.length],
    tag: tags[Math.floor(Math.random() * tags.length)],
  }))
}

// API: 获取分类列表
export async function fetchCategories(): Promise<Category[]> {
  await delay(300) // 模拟网络延迟
  return mockCategories
}

// API: 获取指定分类的视频列表
export async function fetchVideosByCategory(categorySlug: string, count = 16): Promise<Video[]> {
  await delay(200)
  return generateMockVideos(categorySlug, count)
}

// API: 获取首页所有分类及其视频（聚合接口）
export interface CategoryWithVideos extends Category {
  videos: Video[]
}

export async function fetchHomeData(): Promise<{
  categories: Category[]
  sections: CategoryWithVideos[]
}> {
  await delay(400)
  
  const categories = mockCategories
  
  // 首页只展示前5个分类的视频区块
  const sectionsData = categories.slice(0, 5).map(cat => ({
    ...cat,
    videos: generateMockVideos(cat.slug, 16),
  }))
  
  return {
    categories,
    sections: sectionsData,
  }
}
