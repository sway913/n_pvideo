import { useMemo } from 'react'
import { Card, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import type { FeaturedCard } from '../../../types'

const { Title } = Typography

// Default data
const defaultCards: FeaturedCard[] = [
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

// Types
interface FeaturedCardsProps {
  cards?: FeaturedCard[]
}

// Component
function FeaturedCards({ cards = defaultCards }: FeaturedCardsProps) {
  const memoizedCards = useMemo(() => cards, [cards])

  return (
    <section className="px-9 mt-4">
      <div className="grid grid-cols-3 gap-3">
        {memoizedCards.map((card) => (
          <Card
            key={card.id}
            hoverable
            className="!bg-transparent !border-none group"
            cover={
              <div className="relative h-[252px] rounded-xl overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                {card.label && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <span className="font-['Sansita_One'] text-4xl font-normal text-white uppercase whitespace-nowrap">
                      {card.label}
                    </span>
                  </div>
                )}
                {card.link && (
                  <div className="absolute top-4 right-4 opacity-80 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowRightOutlined className="text-white text-xl -rotate-45" />
                  </div>
                )}
              </div>
            }
          >
            <Title level={5} className="!text-white !text-sm !font-medium !mt-2 !mb-0">
              {card.title}
            </Title>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default FeaturedCards
