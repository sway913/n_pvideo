import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoginModalOpen: boolean
  login: (user: User) => void
  logout: () => void
  openLoginModal: () => void
  closeLoginModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock 用户数据
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  credits: 200,
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const login = useCallback((userData: User) => {
    setUser(userData)
    setIsLoginModalOpen(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true)
  }, [])

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false)
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoginModalOpen,
    login,
    logout,
    openLoginModal,
    closeLoginModal,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// 导出 mock 用户用于测试
export { mockUser }
