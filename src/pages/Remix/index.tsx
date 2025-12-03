import { useState, useRef, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, message } from 'antd'
import { CloseOutlined, SoundOutlined, ExpandOutlined } from '@ant-design/icons'

interface UploadedImage {
  id: string
  file: File
  preview: string
}

// 上传图标组件
const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="25.33" height="25.33" rx="6.67" stroke="white" strokeWidth="2.67" fill="none"/>
    <path d="M10 20L14 16L18 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 16L22 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2" fill="white"/>
    <path d="M22.67 18.67V24M22.67 24V29.33M22.67 24H17.33M22.67 24H28" stroke="white" strokeWidth="2.67" strokeLinecap="round"/>
  </svg>
)

function RemixPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const title = searchParams.get('title') || 'Brazil Jersey in Transit'
  const description = searchParams.get('desc') || 'A train appears behind the subject at full speed—loud, fast, and intense. A perfect jump-scare or dramatic backdrop'
  // 从URL参数获取模板图片
  const templateImage = searchParams.get('image') || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=800&fit=crop'
  
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理图片上传
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: UploadedImage[] = []
    for (let i = 0; i < Math.min(files.length, 5 - uploadedImages.length); i++) {
      const file = files[i]
      if (file.size > 10 * 1024 * 1024) continue
      
      newImages.push({
        id: `img-${Date.now()}-${i}`,
        file,
        preview: URL.createObjectURL(file)
      })
    }

    setUploadedImages(prev => [...prev, ...newImages].slice(0, 5))
  }, [uploadedImages.length])

  // 删除已上传的图片
  const handleRemoveImage = useCallback((id: string) => {
    setUploadedImages(prev => {
      const removed = prev.find(img => img.id === id)
      if (removed) {
        URL.revokeObjectURL(removed.preview)
      }
      return prev.filter(img => img.id !== id)
    })
  }, [])

  // 生成视频
  const handleGenerate = useCallback(async () => {
    if (uploadedImages.length === 0) {
      message.warning({
        content: 'Please upload your image!',
        className: 'custom-toast',
        style: {
          marginTop: '20vh',
        },
      })
      return
    }
    
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGeneratedVideo('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=800&fit=crop')
    setIsGenerating(false)
  }, [uploadedImages.length])

  // 返回上一页
  const handleClose = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <div className="fixed inset-0 z-[200]">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/[0.82]" 
        onClick={handleClose} 
      />
      
      {/* 主内容区 - 距顶部84px */}
      <div className="absolute left-0 right-0 bottom-0 top-[84px] bg-[#131517] rounded-t-[24px] overflow-hidden animate-slideUp">
        {/* 关闭按钮 */}
        <div className="absolute top-0 right-0 p-6">
          <Button
            type="text"
            icon={<CloseOutlined className="text-white text-sm" />}
            onClick={handleClose}
            className="!w-9 !h-9 !flex !items-center !justify-center !rounded-full !bg-transparent hover:!bg-white/10 !border-0"
          />
        </div>

        {/* 内容区域 - 左右布局 */}
        <div className="flex justify-between gap-12 px-[60px] pt-[24px] h-full">
          {/* 左侧表单区 - 508x764 */}
          <div 
            className="relative w-[508px] h-[764px] bg-[#131517] rounded-3xl flex-shrink-0"
            style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            {/* 标题 */}
            <h2 
              className="absolute text-white font-bold text-[32px] leading-[1.45] tracking-tight"
              style={{ 
                left: 23, 
                top: 18, 
                fontFamily: 'ChillDINGothic, Inter, sans-serif',
                letterSpacing: '-0.03em'
              }}
            >
              {title}
            </h2>
            
            {/* 描述 */}
            <p 
              className="absolute text-white/50 text-sm leading-[1.45]"
              style={{ 
                left: 23, 
                top: 72, 
                width: 466,
                fontFamily: 'ChillDINGothic, Inter, sans-serif',
                fontWeight: 500
              }}
            >
              {description}
            </p>

            {/* 上传区域 - 460x345 */}
            <div 
              className="absolute cursor-pointer transition-colors hover:border-white/20"
              style={{ 
                left: 24, 
                top: 134, 
                width: 460, 
                height: 345,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px dashed rgba(255, 255, 255, 0.1)',
                borderRadius: 12
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {uploadedImages.length === 0 ? (
                <div className="absolute flex flex-col items-center gap-2" style={{ left: 76, top: 141, width: 308 }}>
                  <UploadIcon />
                  <div className="flex flex-col items-center gap-0.5">
                    <span 
                      className="text-white text-sm font-semibold"
                      style={{ fontFamily: 'ChillDINGothic, Inter, sans-serif' }}
                    >
                      Upload Image
                    </span>
                    <span 
                      className="text-white/30 text-sm text-center"
                      style={{ fontFamily: 'ChillDINGothic, Inter, sans-serif', fontWeight: 600 }}
                    >
                      Please upload 1–5 images.(PNG/JPG, under 10MB)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 flex flex-wrap gap-3">
                  {uploadedImages.map(img => (
                    <div key={img.id} className="relative w-20 h-20 rounded-lg overflow-hidden group">
                      <img src={img.preview} alt="" className="w-full h-full object-cover" />
                      <button 
                        className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
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
                    <div className="w-20 h-20 bg-white/5 rounded-lg flex items-center justify-center border border-dashed border-white/10">
                      <span className="text-white/40 text-2xl">+</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 生成按钮 - 457x48 */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="absolute flex items-center justify-center rounded-[50px] font-bold text-xl text-black disabled:opacity-50 transition-opacity"
              style={{ 
                left: 23, 
                top: 688, 
                width: 457, 
                height: 48,
                background: 'linear-gradient(135deg, rgba(100, 255, 72, 1) 0%, rgba(200, 252, 57, 1) 100%)',
                fontFamily: 'ChillDINGothic, Inter, sans-serif',
                fontWeight: 700,
                lineHeight: 1.1
              }}
            >
              {isGenerating ? 'Generating...' : 'Generate Video'}
            </button>
          </div>

          {/* 右侧预览区 - 764x764 */}
          <div 
            className="relative flex-shrink-0 rounded-2xl overflow-hidden"
            style={{ width: 764, height: 764 }}
          >
            {generatedVideo ? (
              <div className="relative w-full h-full">
                <img src={generatedVideo} alt="Generated video preview" className="w-full h-full object-cover" />
                {/* 控制按钮 */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <SoundOutlined className="text-white text-lg" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <ExpandOutlined className="text-white text-lg" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                {/* 模板预览图 - 从参数传入 */}
                <img 
                  src={templateImage} 
                  alt="Template Preview" 
                  className="w-full h-full object-cover"
                />
                {/* 控制按钮 */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                    <SoundOutlined className="text-white text-lg" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                    <ExpandOutlined className="text-white text-lg" />
                  </div>
                </div>
                {/* 左下角小图 - 用户上传的参考图预览 */}
                {uploadedImages.length > 0 && (
                  <div 
                    className="absolute rounded-xl overflow-hidden"
                    style={{ 
                      left: 22, 
                      bottom: 21, 
                      width: 120, 
                      height: 120,
                      border: '4px solid rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    <img 
                      src={uploadedImages[0].preview} 
                      alt="Reference" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemixPage
