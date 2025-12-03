import { useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { CATEGORIES } from '../../constants'
import type { Video, VideoTag } from '../../types'

const { Title, Paragraph } = Typography

// 模拟视频数据生成
const generateVideos = (count: number): Video[] => {
  const heights = [297, 345, 396, 269, 377, 299, 320, 380, 260, 350]
  const images = [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400',
    'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400',
    'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400',
    'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400',
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
    'Commercial Ad',
    'Short Film',
    'Animation Demo',
    'Product Showcase',
  ]
  const tags: VideoTag[] = ['hot', 'new', 'recommended', null, null, null, null]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: titles[i % titles.length],
    image: images[i % images.length],
    height: heights[i % heights.length],
    tag: tags[Math.floor(Math.random() * tags.length)],
  }))
}

// 标签配置
const TAG_CONFIG = {
  hot: { label: '热门', icon: '🔥', bgClass: 'bg-gradient-to-br from-red-500 to-pink-400' },
  new: { label: 'New', icon: null, bgClass: 'bg-gradient-to-b from-sky-500 to-cyan-300' },
  recommended: { label: '推荐', icon: '👍', bgClass: 'bg-gradient-to-b from-blue-600 to-blue-400' },
}

// 标签组件
function VideoTagBadge({ tag }: { tag: VideoTag }) {
  if (!tag) return null
  const config = TAG_CONFIG[tag]
  
  return (
    <div className={`absolute top-2 right-2 z-10 flex items-center gap-0.5 px-1.5 h-5 rounded-full ${config.bgClass}`}>
      {config.icon && <span className="text-[10px]">{config.icon}</span>}
      <span className="text-[10px] font-bold text-white">{config.label}</span>
    </div>
  )
}

function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // 根据 slug 获取分类信息
  const category = useMemo(() => {
    return CATEGORIES.find(c => c.slug === slug)
  }, [slug])

  // 生成该分类的视频列表
  const videos = useMemo(() => generateVideos(30), [])

  // 将视频分成5列用于瀑布流
  const columns: Video[][] = useMemo(() => {
    const cols: Video[][] = [[], [], [], [], []]
    videos.forEach((video, index) => {
      cols[index % 5].push(video)
    })
    return cols
  }, [videos])

  const handleVideoClick = useCallback((videoId: number) => {
    navigate(`/video/${videoId}`)
  }, [navigate])

  const handleRemixClick = useCallback((e: React.MouseEvent, video: Video) => {
    e.stopPropagation()
    navigate(`/remix?title=${encodeURIComponent(video.title)}&id=${video.id}&image=${encodeURIComponent(video.image)}`)
  }, [navigate])

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] gap-6">
        <Title level={1} className="!text-3xl !text-white">分类不存在</Title>
        <Button 
          type="primary" 
          onClick={() => navigate('/explore')}
          className="bg-gradient-to-r from-green-400 to-lime-400 border-0 rounded-full px-6 py-2 h-auto font-semibold"
        >
          返回首页
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      {/* 分类标题和描述 */}
      <header className="px-10 pt-6">
        <Title 
          level={1} 
          className="!font-bold !text-white !uppercase !text-6xl !leading-tight !mb-0"
        >
          {category.name} Gallery
        </Title>
        {category.description && (
          <Paragraph className="!text-white/50 !text-base !mt-2 max-w-3xl">
            {category.description}
          </Paragraph>
        )}
      </header>

      {/* 视频瀑布流网格 */}
      <section className="px-9 mt-6">
        <div className="grid grid-cols-5 gap-2">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-2">
              {column.map((video) => (
                <div
                  key={video.id}
                  className="relative rounded-lg overflow-hidden cursor-pointer group"
                  style={{ height: video.height }}
                  onMouseEnter={() => setHoveredId(video.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleVideoClick(video.id)}
                >
                  <img 
                    src={video.image} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {video.tag && <VideoTagBadge tag={video.tag} />}
                  {hoveredId === video.id && (
                    <div className="absolute inset-0 flex flex-col justify-end animate-fadeIn">
                      {/* 底部渐变遮罩层 */}
                      <div className="absolute bottom-0 left-0 right-0 h-[187px] bg-gradient-to-t from-black to-transparent rounded-b-lg" />
                      {/* 内容区域 */}
                      <div className="relative z-10 flex flex-col items-center justify-center pb-10">
                        <h4 className="text-white text-xl font-bold mb-4 px-4 text-center truncate max-w-full tracking-tight">
                          {video.title}
                        </h4>
                        <Button
                          type="text"
                          className="!border-none !text-black !text-base !font-bold !w-[160px] !h-[39px] !rounded-xl hover:!opacity-90"
                          style={{
                            background: 'linear-gradient(135deg, #64FF48 0%, #C8FC39 100%)',
                          }}
                          onClick={(e) => handleRemixClick(e, video)}
                        >
                          Remix
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CategoryPage
