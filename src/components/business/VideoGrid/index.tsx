import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Video } from '../../../types'
import './VideoGrid.css'

// 模拟视频数据
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

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: titles[i % titles.length],
    image: images[i % images.length],
    height: heights[i % heights.length],
  }))
}

interface VideoGridProps {
  title: string
  videos?: Video[]
  viewAllText?: string
  viewAllLink?: string
}

export function VideoGrid({ 
  title, 
  videos, 
  viewAllText = 'View all',
  viewAllLink 
}: VideoGridProps) {
  const navigate = useNavigate()
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const displayVideos = videos || generateVideos(16)

  // 将视频分成5列
  const columns: Video[][] = [[], [], [], [], []]
  displayVideos.forEach((video, index) => {
    columns[index % 5].push(video)
  })

  const handleViewAll = () => {
    if (viewAllLink) {
      navigate(viewAllLink)
    }
  }

  const handleVideoClick = (videoId: number) => {
    navigate(`/video/${videoId}`)
  }

  return (
    <section className="video-grid-section">
      <h2 className="section-title">{title}</h2>
      <div className="video-grid-container">
        <div className="video-grid">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="video-column">
              {column.map((video) => (
                <div
                  key={video.id}
                  className="video-item"
                  style={{ height: video.height }}
                  onMouseEnter={() => setHoveredId(video.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleVideoClick(video.id)}
                >
                  <img src={video.image} alt={video.title} />
                  {hoveredId === video.id && (
                    <div className="video-overlay">
                      <div className="video-info">
                        <h4 className="video-title">{video.title}</h4>
                        <button 
                          className="remix-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            // 处理 Remix 操作
                          }}
                        >
                          <span>Remix</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="grid-fade-overlay" />
        <button className="view-all-btn" onClick={handleViewAll}>
          <span>{viewAllText} {title}</span>
        </button>
      </div>
    </section>
  )
}
