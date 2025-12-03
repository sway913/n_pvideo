import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { StarOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { NAV_ITEMS } from '../../../constants'
import { useAuth } from '../../../context/AuthContext'
import AIToolsDropdown from '../AIToolsDropdown'

// Types
interface HeaderProps {
  className?: string
}

// Component
function Header({ className = '' }: HeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, openLoginModal, logout } = useAuth()

  const getActiveNav = useCallback(() => {
    const currentPath = location.pathname
    const activeItem = NAV_ITEMS.find(item => currentPath.startsWith(item.path))
    return activeItem?.id || 'explore'
  }, [location.pathname])

  const handleNavClick = useCallback((path: string) => {
    navigate(path)
  }, [navigate])

  const handleLogoClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleAccountMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'account':
        navigate('/account')
        break
      case 'logout':
        logout()
        break
      default:
        break
    }
  }

  const accountItems: MenuProps['items'] = [
    {
      key: 'account',
      icon: <UserOutlined />,
      label: 'Account',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign out',
    },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 h-[72px] flex items-center justify-between px-6 bg-transparent z-[100] ${className}`}>
      <div className="flex-1">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={handleLogoClick}
        >
          <span className="text-2xl font-semibold text-white drop-shadow-sm">Nami Video</span>
        </div>
      </div>

      <nav className="flex-1 flex justify-center">
        <div className="flex items-center gap-9 px-[60px] py-[11px] bg-white/10 rounded-[45px] shadow-md">
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.id}
              type="text"
              className={`!text-xl !font-bold !p-0 !h-auto ${
                getActiveNav() === item.id 
                  ? '!text-white' 
                  : '!text-white/50 hover:!text-white/80'
              }`}
              onClick={() => handleNavClick(item.path)}
            >
              {item.name}
            </Button>
          ))}
          <div className="flex items-center">
            <AIToolsDropdown />
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-end gap-4">
        {isAuthenticated && user ? (
          <>
            <div className="flex items-center gap-2">
              <StarOutlined className="text-2xl text-white" />
              <span className="text-xl font-bold text-white">{user.credits}</span>
            </div>
            <Button 
              className="!px-[62px] !py-[11px] !h-auto !bg-white/10 !rounded-[30px] !border-none !text-white !text-base !font-bold hover:!bg-white/20"
            >
              Assets
            </Button>
            <Dropdown menu={{ items: accountItems, onClick: handleAccountMenuClick }} trigger={['click']}>
              <Avatar 
                src={user.avatar} 
                alt={user.name}
                size={48}
                className="cursor-pointer"
              />
            </Dropdown>
          </>
        ) : (
          <Button
            className="!px-4 !py-2 !h-auto gradient-green !rounded-[50px] !border-none !text-black !text-[15px] !font-semibold hover:!scale-105 hover:!shadow-lg hover:!shadow-green-400/40 transition-all"
            onClick={openLoginModal}
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header