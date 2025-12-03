import { Outlet } from 'react-router-dom'
import { Header, LoginModal } from '../components/common'

// Component
function MainLayout() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-[72px]">
        <Outlet />
      </main>
      <LoginModal />
    </div>
  )
}

export default MainLayout
