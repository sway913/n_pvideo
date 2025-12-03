import './FeaturedCards.css'

interface FeaturedCard {
  id: number
  title: string
  image: string
  label?: string
}

const featuredCards: FeaturedCard[] = [
  {
    id: 1,
    title: 'Sora 2-Realism at Every Frame',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop',
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

export function FeaturedCards() {
  return (
    <section className="featured-section">
      <div className="featured-cards">
        {featuredCards.map((card) => (
          <div key={card.id} className="featured-card">
            <div className="card-image">
              <img src={card.image} alt={card.title} />
              <div className="card-overlay" />
              {card.label && (
                <div className="card-label">
                  <span>{card.label}</span>
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
