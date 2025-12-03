import { useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './RemixPage.css'

// 图片上传图标
function UploadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill="rgba(255,255,255,0.1)" />
      <path d="M16 10V22M10 16H22" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// 关闭图标
function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// 播放图标
function PlayIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.5)"/>
      <path d="M26 20L44 32L26 44V20Z" fill="white"/>
    </svg>
  )
}

interface UploadedImage {
  id: string
  file: File
  preview: string
}

export function RemixPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const title = searchParams.get('title') || 'Brazil Jersey in Transit'
  
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理图片上传
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: UploadedImage[] = []
    for (let i = 0; i < Math.min(files.length, 5 - uploadedImages.length); i++) {
      const file = files[i]
      if (file.size > 10 * 1024 * 1024) continue // 跳过超过10MB的文件
      
      newImages.push({
        id: `img-${Date.now()}-${i}`,
        file,
        preview: URL.createObjectURL(file)
      })
    }

    setUploadedImages(prev => [...prev, ...newImages].slice(0, 5))
  }

  // 删除已上传的图片
  const handleRemoveImage = (id: string) => {
    setUploadedImages(prev => {
      const removed = prev.find(img => img.id === id)
      if (removed) {
        URL.revokeObjectURL(removed.preview)
      }
      return prev.filter(img => img.id !== id)
    })
  }

  // 生成视频
  const handleGenerate = async () => {
    if (uploadedImages.length === 0) return
    
    setIsGenerating(true)
    
    // 模拟生成视频过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock 生成的视频URL
    setGeneratedVideo('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=800&fit=crop')
    setIsGenerating(false)
  }

  // 返回上一页
  const handleClose = () => {
    navigate(-1)
  }

  return (
    <div className="remix-page">
      {/* 背景遮罩 */}
      <div className="remix-backdrop" onClick={handleClose} />
      
      {/* 主内容区 */}
      <div className="remix-panel">
        {/* 关闭按钮 */}
        <button className="remix-close-btn" onClick={handleClose}>
          <CloseIcon />
        </button>

        <div className="remix-content">
          {/* 左侧表单区 */}
          <div className="remix-form">
            <div className="remix-form-inner">
              {/* 标题 */}
              <h1 className="remix-title">{title}</h1>
              
              {/* 描述 */}
              <p className="remix-description">
                A train appears behind the subject at full speed—loud, fast, and intense. 
                A perfect jump-scare or dramatic backdrop
              </p>

              {/* 上传区域 */}
              <div className="upload-section">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  multiple
                  onChange={handleFileSelect}
                  className="upload-input"
                />
                
                <div 
                  className="upload-area"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadedImages.length === 0 ? (
                    <div className="upload-placeholder">
                      <UploadIcon />
                      <div className="upload-text">
                        <span className="upload-label">Upload Image</span>
                        <span className="upload-hint">Please upload 1–5 images.(PNG/JPG, under 10MB)</span>
                      </div>
                    </div>
                  ) : (
                    <div className="uploaded-images">
                      {uploadedImages.map(img => (
                        <div key={img.id} className="uploaded-image">
                          <img src={img.preview} alt="" />
                          <button 
                            className="remove-image-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveImage(img.id)
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {uploadedImages.length < 5 && (
                        <div className="add-more-image">
                          <UploadIcon />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 生成按钮 */}
              <button 
                className={`generate-btn ${isGenerating ? 'generating' : ''} ${uploadedImages.length === 0 ? 'disabled' : ''}`}
                onClick={handleGenerate}
                disabled={isGenerating || uploadedImages.length === 0}
              >
                {isGenerating ? 'Generating...' : 'Generate Video'}
              </button>
            </div>
          </div>

          {/* 右侧预览区 */}
          <div className="remix-preview">
            <div className="preview-container">
              {generatedVideo ? (
                <div className="preview-video">
                  <img src={generatedVideo} alt="Generated video preview" />
                  <div className="play-overlay">
                    <PlayIcon />
                  </div>
                </div>
              ) : (
                <div className="preview-placeholder">
                  <img 
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=800&fit=crop" 
                    alt="Preview" 
                  />
                  <div className="preview-mask" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
