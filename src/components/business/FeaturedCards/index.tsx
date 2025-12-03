import type { FeaturedCard } from '../../../types'
import './FeaturedCards.css'

// 模拟数据 - 后续可从 API 获取
const featuredCards: FeaturedCard[] = [
  {
    id: 1,
    title: 'Sora 2-Realism at Every Frame',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop',
    link: '/video/sora-2',
  },
  {
    id: 2,
    title: 'Edit Videos by Prompts',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop',
    label: 'AI VIDEO EDITOR',
  },
  {
    id: 3,
    title: 'Meet Veo 3.1 - Seamless from Start to End.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop',
  },
]

// 箭头图标组件
function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.83334 14.1667L14.1667 5.83334" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.83334 5.83334H14.1667V14.1667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

interface FeaturedCardsProps {
  cards?: FeaturedCard[]
}

export function FeaturedCards({ cards = featuredCards }: FeaturedCardsProps) {
  return (
    <section className="featured-section">
      <div className="featured-cards">
        {cards.map((card, index) => (
          <div key={card.id} className="featured-card">
            <div className="card-image">
              <img src={card.image} alt={card.title} />
              <div className="card-overlay" />
              {card.label && (
                <div className="card-label">
                  <span>{card.label}</span>
                </div>
              )}
              {card.link && (
                <div className="card-arrow">
                  <ArrowIcon />
                </div>
              )}
            </div>
            <h3 className="card-title">{card.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
