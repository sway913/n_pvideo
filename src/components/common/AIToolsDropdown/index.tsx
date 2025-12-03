import { useState, useRef, useEffect } from 'react'
import { Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

// Types
interface ToolItem {
  id: string
  name: string
  path: string
}

interface AIToolsDropdownProps {
  className?: string
}

// Component
function AIToolsDropdown({ className = '' }: AIToolsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  
  const tools: ToolItem[] = [
    { id: 'upscale', name: 'Upscale', path: '/tools/upscale' },
    { id: 'subtitle-remover', name: 'Subtitle Remover', path: '/tools/subtitle-remover' },
    { id: 'background-remover', name: 'Background Remover', path: '/tools/background-remover' }
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        type="text"
        className={`!flex !items-center !gap-2 !text-xl !font-bold !p-0 !h-auto ${
          isOpen 
            ? '!text-white' 
            : '!text-white/50 hover:!text-white/80'
        }`}
        onClick={toggleDropdown}
      >
        AI Tools
        <DownOutlined 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[210px] py-[10px] px-[8px] bg-white/20 border border-white/35 backdrop-blur-[40px] rounded-[16px] shadow-lg z-50">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              className="flex items-center justify-between px-[16px] py-[8px] rounded-[12px] hover:bg-black/20 cursor-pointer transition-colors"
              onClick={() => {
                navigate(tool.path)
                setIsOpen(false)
              }}
            >
              <span className="text-base font-bold text-white">{tool.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AIToolsDropdown