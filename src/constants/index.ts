import type { NavItem, Category } from '../types'

// 主导航配置
export const NAV_ITEMS: NavItem[] = [
  { id: 'explore', name: 'Explore', path: '/explore' },
  { id: 'video', name: 'Video', path: '/video' },
  { id: 'edit', name: 'Edit', path: '/edit' }
]

// 分类配置
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Nano Banana Pro', slug: 'nano-banana-pro', description: 'The camera pulls back rapidly from the subject to reveal their city, then the continent, and finally the entire Earth. Epic and cinematic—perfect for transitions, scale, or storytelling.' },
  { id: '2', name: 'Camera Controls', slug: 'camera-controls', description: 'Master the art of camera movement with dynamic controls and techniques for creating professional-looking video content.' },
  { id: '3', name: 'Viral', slug: 'viral', description: 'Trending content that captures attention and spreads across social media platforms organically.' },
  { id: '4', name: 'UGC', slug: 'ugc', description: 'User-generated content that feels authentic and connects with audiences on a personal level.' },
  { id: '5', name: 'Commercial', slug: 'commercial', description: 'Professional advertising and promotional videos designed to showcase products and services.' },
  { id: '6', name: 'Tiktok Trend', slug: 'tiktok-trend', description: 'Stay ahead with the latest TikTok trends and viral video formats that captivate Gen Z audiences.' },
  { id: '7', name: 'Black Friday', slug: 'black-friday', description: 'Special promotional content designed for the biggest shopping event of the year.' },
  { id: '8', name: 'Christmas Special', slug: 'christmas-special', description: 'Festive and holiday-themed content perfect for the Christmas season and winter celebrations.' },
  { id: '9', name: 'Kling 2.5 Turbo', slug: 'kling-turbo', description: 'Powered by Kling 2.5 Turbo AI engine for ultra-fast and high-quality video generation.' },
  { id: '10', name: 'Seedance Pro', slug: 'seedance-pro', description: 'Advanced dance and motion content created with Seedance Pro technology.' },
]

// 路由路径常量
export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  VIDEO: '/video',
  EDIT: '/edit',
  TOOLS: '/tools',
  CATEGORY: '/category/:slug',
  VIDEO_DETAIL: '/video/:id',
} as const

// 样式相关常量
export const THEME = {
  colors: {
    primary: '#000000',
    secondary: 'rgba(255, 255, 255, 0.1)',
    accent: '#69FF47',
    accentGradient: 'linear-gradient(135deg, #64FF48 0%, #C8FC39 100%)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.5)',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '30px',
    full: '9999px',
  },
} as const

// 布局相关常量
export const LAYOUT = {
  headerHeight: 72,
  sidebarWidth: 280,
  contentMaxWidth: 1440,
  gridGap: 8,
  gridColumns: 5,
} as const
