import { useState, useCallback, useRef, useEffect } from 'react'
import { RightOutlined, CheckOutlined } from '@ant-design/icons'

// Types
export interface ModelInfo {
  id: string
  name: string
  description: string
  image: string
}

interface ModelDropdownProps {
  models: ModelInfo[]
  selectedModel: ModelInfo
  onSelect: (model: ModelInfo) => void
  className?: string
}

// CheckIcon matching Figma design (16x15.27)
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M2 8L6 12L14 4" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ModelDropdown({ models, selectedModel, onSelect, className = '' }: ModelDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleSelect = useCallback((model: ModelInfo) => {
    onSelect(model)
    setIsOpen(false)
  }, [onSelect])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Label */}
      <span className="block text-base font-bold text-white/40 mb-2">Model</span>
      
      {/* Trigger Button */}
      <div 
        className="flex items-center gap-4 p-2 bg-white/[0.04] rounded-xl cursor-pointer hover:bg-white/[0.08] transition-colors"
        onClick={handleToggle}
      >
        {/* Model Image */}
        <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0">
          <img 
            src={selectedModel.image} 
            alt={selectedModel.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        {/* Model Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
          <div className="text-base font-bold text-white leading-[1.375]">
            {selectedModel.name}
          </div>
          <div className="text-xs font-semibold text-white/50 truncate leading-[1.833]">
            {selectedModel.description}
          </div>
        </div>
        
        {/* Arrow Icon */}
        <RightOutlined 
          className={`text-white/50 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} 
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#282A2C] rounded-xl p-2 shadow-xl"
          style={{ 
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
            maxHeight: '320px',
            overflowY: 'auto'
          }}
        >
          <div className="flex flex-col gap-1">
            {models.map((model) => {
              const isSelected = model.id === selectedModel.id
              
              return (
                <div
                  key={model.id}
                  className={`flex items-center gap-4 p-2 rounded-xl cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-white/[0.08]' 
                      : 'hover:bg-white/[0.04] rounded-lg'
                  }`}
                  onClick={() => handleSelect(model)}
                >
                  {/* Model Image */}
                  <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={model.image} 
                      alt={model.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  {/* Model Info */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="text-sm font-semibold text-white leading-[1.57]">
                      {model.name}
                    </div>
                    <div className="text-xs font-semibold text-white/50 truncate leading-[1.833]">
                      {model.description}
                    </div>
                  </div>
                  
                  {/* Check Icon for selected item */}
                  {isSelected && (
                    <div className="flex-shrink-0">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ModelDropdown
