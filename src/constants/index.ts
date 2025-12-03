import type { NavItem, Category } from '../types'

// 主导航配置
export const NAV_ITEMS: NavItem[] = [
  { id: 'explore', name: 'Explore', path: '/explore' },
  { id: 'video', name: 'Video', path: '/video' },
  { id: 'edit', name: 'Edit', path: '/edit' },
  { id: 'tools', name: 'Tools', path: '/tools' },
]

// 分类配置
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Nano Banana Pro', slug: 'nano-banana-pro' },
  { id: '2', name: 'Camera Controls', slug: 'camera-controls' },
  { id: '3', name: 'Viral', slug: 'viral' },
  { id: '4', name: 'UGC', slug: 'ugc' },
  { id: '5', name: 'Commercial', slug: 'commercial' },
  { id: '6', name: 'Tiktok Trend', slug: 'tiktok-trend' },
  { id: '7', name: 'Black Friday', slug: 'black-friday' },
  { id: '8', name: 'Christmas Special', slug: 'christmas-special' },
  { id: '9', name: 'Kling 2.5 Turbo', slug: 'kling-turbo' },
  { id: '10', name: 'Seedance Pro', slug: 'seedance-pro' },
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
