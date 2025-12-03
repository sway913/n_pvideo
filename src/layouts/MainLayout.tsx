import { Outlet } from 'react-router-dom'
import { Header } from '../components/common/Header'
import { LoginModal } from '../components/common/LoginModal'
import './MainLayout.css'

export function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <LoginModal />
    </div>
  )
}
