import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Avatar } from 'antd'
import { LogoutOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { useAuth } from '../../context/AuthContext'

// Types
interface SidebarItemProps {
  icon: React.ReactNode
  text: string
  isActive?: boolean
  onClick?: () => void
}

// Components
function SidebarItem({ icon, text, isActive = false, onClick }: SidebarItemProps) {
  return (
    <div 
      className={`flex items-center gap-4 px-4 py-3 rounded-[36px] cursor-pointer ${isActive ? 'bg-[#67FF48]/10' : 'hover:bg-white/5'}`}
      onClick={onClick}
    >
      <span className={`text-xl ${isActive ? 'text-[#67FF48]' : 'text-white'}`}>
        {icon}
      </span>
      <span className={`text-xl font-bold ${isActive ? 'text-[#67FF48]' : 'text-white/50'}`}>
        {text}
      </span>
    </div>
  )
}

function UserProfile({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Avatar 
        size={48} 
        className="bg-[#131517] flex items-center justify-center"
      >
        <span className="text-xl font-bold text-white">{name.charAt(0)}</span>
      </Avatar>
      <div>
        <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
        <p className="text-sm text-white/50">{email}</p>
      </div>
    </div>
  )
}

function AccountContent() {
  const { user } = useAuth()
  
  if (!user) return null
  
  return (
    <div className="w-full">
      {/* User Profile Section */}
      <div className="flex items-center justify-between mb-8 p-6 bg-[#131517] rounded-[30px]">
        <div className="flex items-center gap-6">
          <Avatar 
            size={110} 
            className="bg-[#000] flex items-center justify-center"
          >
            <span className="text-4xl font-bold text-white">{user.name.charAt(0)}</span>
          </Avatar>
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{user.name}</h2>
            <p className="text-xl text-white/50">{user.email || `${user.name.toLowerCase()}@gmail.com`}</p>
          </div>
        </div>
        <Button 
          className="flex items-center gap-2 bg-black border-none hover:bg-gray-800 rounded-[8px] h-auto py-2 px-3"
        >
          <UserOutlined className="text-white text-lg" />
          <span className="text-white text-base font-semibold">Edit profile</span>
        </Button>
      </div>
      
      {/* Account Details Section */}
      <div className="mb-6">
        <div className="bg-[#131517] rounded-[16px] p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Account details</h2>
          <div className="space-y-6">
            <div>
              <p className="text-base text-white/50 mb-2">Username</p>
              <p className="text-base text-white">{user.name.toLowerCase()}</p>
            </div>
            
            <div>
              <p className="text-base text-white/50 mb-2">Email</p>
              <p className="text-base text-white">{user.email || `${user.name.toLowerCase()}@gmail.com`}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Account Section */}
      <div>
        <div className="bg-[#131517] rounded-[16px] p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Delete Account</h2>
              <p className="text-base text-white/50">This will permanently delete your account</p>
            </div>
            <Button 
              className="flex items-center gap-2 bg-red-500/10 border-none hover:bg-red-500/20 rounded-[8px] h-auto py-2 px-3"
              danger
            >
              <span className="text-red-500 text-base font-medium">Delete account</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PublishedContent() {
  // Mock data for published videos
  const mockVideos = [
    {
      id: 1,
      title: "Mountain Landscape",
      thumbnail: "https://picsum.photos/seed/p1/300/200",
      views: 1200,
      likes: 42,
      date: "2023-10-15"
    },
    {
      id: 2,
      title: "Ocean Sunset",
      thumbnail: "https://picsum.photos/seed/p2/300/200",
      views: 850,
      likes: 38,
      date: "2023-10-10"
    },
    {
      id: 3,
      title: "City Nightlife",
      thumbnail: "https://picsum.photos/seed/p3/300/200",
      views: 2100,
      likes: 95,
      date: "2023-10-05"
    }
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-white mb-6">Published</h1>
      
      {mockVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVideos.map((video) => (
            <div key={video.id} className="bg-[#131517] rounded-[16px] overflow-hidden">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                  {video.views} views
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 truncate">{video.title}</h3>
                <div className="flex justify-between text-sm text-white/50">
                  <span>{video.date}</span>
                  <span>{video.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#131517] rounded-[16px] p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <VideoCameraOutlined className="text-2xl text-white/50" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Create.Share.Inspire</h2>
            <p className="text-white/50 mb-6">Publish your generations and see how others bring their ideas to life.</p>
            <Button className="bg-gradient-to-r from-[#64FF48] to-[#C8FC39] text-black font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity">
              Publish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Component
function AccountPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState<'account' | 'published'>('account')
  
  if (!user) {
    return null
  }
  
  const handleSignOut = () => {
    logout()
    navigate('/')
  }
  
  return (
    <div className="min-h-screen pt-[72px] pb-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#67FF48] bg-[#67FF48]/10 px-4 py-2 rounded-[36px]">
            Account
          </h1>
          
          <Button 
            className="flex items-center gap-2 bg-white/10 border-none hover:bg-white/20 rounded-[30px] h-auto py-3 px-4"
            onClick={handleSignOut}
          >
            <LogoutOutlined className="text-white" />
            <span className="text-white text-lg font-bold">Sign out</span>
          </Button>
        </div>
        
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-[280px] bg-[#000] p-4 rounded-[30px]">
            <UserProfile name={user.name} email={user.email || `${user.name.toLowerCase()}@gmail.com`} />
            
            <div className="space-y-2">
              <SidebarItem 
                icon={<UserOutlined />} 
                text="Account" 
                isActive={activeMenu === 'account'}
                onClick={() => setActiveMenu('account')}
              />
              <SidebarItem 
                icon={<VideoCameraOutlined />} 
                text="Published" 
                isActive={activeMenu === 'published'}
                onClick={() => setActiveMenu('published')}
              />
            </div>
          </div>
          
          {/* Right Content */}
          <div className="flex-1">
            {activeMenu === 'account' && <AccountContent />}
            {activeMenu === 'published' && <PublishedContent />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage