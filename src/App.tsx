import './App.css'
import { Header } from './components/Header'
import { CategoryTabs } from './components/CategoryTabs'
import { FeaturedCards } from './components/FeaturedCards'
import { VideoGrid } from './components/VideoGrid'

function App() {
  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <section className="categories-section">
          <CategoryTabs />
        </section>

        <FeaturedCards />

        <div className="gallery-header">
          <h1 className="gallery-title">Nano Banana Pro Gallery</h1>
        </div>

        <VideoGrid title="Nano Banana Pro" viewAllText="View all" />
        
        <VideoGrid title="Christmas Special" viewAllText="View all" />
        
        <VideoGrid title="Viral" viewAllText="View all" />
      </main>
    </div>
  )
}

export default App
