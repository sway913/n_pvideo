import { CategoryTabs, FeaturedCards, VideoGrid } from '../../components/business'
import './ExplorePage.css'

export function ExplorePage() {
  return (
    <div className="explore-page">
      <section className="categories-section">
        <CategoryTabs />
      </section>

      <FeaturedCards />

      <div className="gallery-header">
        <h1 className="gallery-title">Nano Banana Pro Gallery</h1>
      </div>

      <VideoGrid 
        title="Nano Banana Pro" 
        viewAllText="View all"
        viewAllLink="/category/nano-banana-pro"
      />
      
      <VideoGrid 
        title="Christmas Special" 
        viewAllText="View all"
        viewAllLink="/category/christmas-special"
      />
      
      <VideoGrid 
        title="Viral" 
        viewAllText="View all"
        viewAllLink="/category/viral"
      />
    </div>
  )
}
