// 视频相关类型
export interface Video {
  id: number
  title: string
  image: string
  height?: number
  duration?: string
  views?: number
  author?: string
  createdAt?: string
}

// 特色卡片类型
export interface FeaturedCard {
  id: number
  title: string
  image: string
  label?: string
  link?: string
}

// 分类类型
export interface Category {
  id: string
  name: string
  slug: string
}

// 导航项类型
export interface NavItem {
  id: string
  name: string
  path: string
}

// 用户类型
export interface User {
  id: string
  name: string
  avatar: string
  credits: number
}

// 视频网格区块类型
export interface VideoSection {
  id: string
  title: string
  videos: Video[]
  viewAllLink?: string
}
