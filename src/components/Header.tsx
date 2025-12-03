import { useState } from 'react'
import './Header.css'

const navItems = ['Explore', 'Video', 'Edit', 'Tools']

export function Header() {
  const [activeNav, setActiveNav] = useState('Explore')

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-text">Nami Video</span>
        </div>
      </div>

      <nav className="header-nav">
        <div className="nav-pill">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${activeNav === item ? 'active' : ''}`}
              onClick={() => setActiveNav(item)}
            >
              {item}
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
