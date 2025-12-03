import { useLocation, useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../../../constants'
import './Header.css'

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  // 根据当前路径确定激活的导航项
  const getActiveNav = () => {
    const currentPath = location.pathname
    const activeItem = NAV_ITEMS.find(item => currentPath.startsWith(item.path))
    return activeItem?.id || 'explore'
  }

  const handleNavClick = (path: string) => {
    navigate(path)
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo" onClick={() => navigate('/')}>
          <span className="logo-text">Nami Video</span>
        </div>
      </div>

      <nav className="header-nav">
        <div className="nav-pill">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${getActiveNav() === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="header-right">
        <div className="credits">
          <svg className="credits-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="credits-amount">200</span>
        </div>
        <button className="assets-btn">
          <span>Assets</span>
        </button>
        <div className="avatar">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="User Avatar" />
        </div>
      </div>
    </header>
  )
}
