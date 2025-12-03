import { useState, useMemo, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Tag } from 'antd'
import { FireOutlined, ThunderboltOutlined, LikeOutlined } from '@ant-design/icons'
import type { Video, VideoTag } from '../../../types'

const { Title } = Typography

// Helper function
const generateVideos = (count: number): Video[] => {
  const heights = [297, 345, 396, 269, 377, 299]
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

// Tag Badge Component
interface VideoTagBadgeProps {
  tag: VideoTag
}

const VideoTagBadge = memo(function VideoTagBadge({ tag }: VideoTagBadgeProps) {
  if (!tag) return null

  const tagConfig = {
    hot: { label: '热门', icon: <FireOutlined />, className: 'bg-gradient-to-br from-red-500 to-pink-500' },
    new: { label: 'New', icon: <ThunderboltOutlined />, className: 'bg-gradient-to-b from-sky-500 to-cyan-400' },
    recommended: { label: '推荐', icon: <LikeOutlined />, className: 'bg-gradient-to-b from-blue-600 to-blue-400' },
  }

  const config = tagConfig[tag]

  return (
    <Tag className={`absolute top-2 right-2 !border-none !px-1.5 !py-0.5 !text-[10px] !font-bold !text-white ${config.className} flex items-center gap-0.5 z-10`}>
      {config.icon}
      {config.label}
    </Tag>
  )
})

// Types
interface VideoGridProps {
  title: string
  videos?: Video[]
  viewAllText?: string
  viewAllLink?: string
}

// Component
function VideoGrid({
  title,
  videos,
  viewAllText = 'View all',
  viewAllLink
}: VideoGridProps) {
  const navigate = useNavigate()
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const displayVideos = useMemo(() => videos || generateVideos(16), [videos])

  const columns = useMemo(() => {
    const cols: Video[][] = [[], [], [], [], []]
    displayVideos.forEach((video, index) => {
      cols[index % 5].push(video)
    })
    return cols
  }, [displayVideos])

  const handleViewAll = useCallback(() => {
    if (viewAllLink) {
      navigate(viewAllLink)
    }
  }, [viewAllLink, navigate])

  const handleVideoClick = useCallback((videoId: number) => {
    navigate(`/video/${videoId}`)
  }, [navigate])

  const handleRemixClick = useCallback((e: React.MouseEvent, video: Video) => {
    e.stopPropagation()
    navigate(`/remix?title=${encodeURIComponent(video.title)}&id=${video.id}`)
  }, [navigate])

  return (
    <section className="px-9 mt-12">
      <Title level={2} className="!text-4xl !font-bold !text-white !uppercase !mb-4">
        {title}
      </Title>
      <div className="relative">
        {/* 视频网格区域 - 固定高度并裁剪 */}
        <div className="h-[600px] overflow-hidden">
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
        </div>
        {/* 底部渐变遮罩 */}
        <div className="absolute bottom-0 left-0 right-0 h-[245px] bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
        {/* View all 按钮 */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <Button
            type="text"
            className="!w-[200px] !h-[48px] !rounded-xl !flex !items-center !justify-center"
            style={{
              background: 'rgba(105, 255, 71, 0.2)',
              border: '1px solid rgba(105, 255, 71, 0.2)',
            }}
            onClick={handleViewAll}
          >
            <span className="gradient-text-green text-base font-bold">
              View all {title}
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default VideoGrid
