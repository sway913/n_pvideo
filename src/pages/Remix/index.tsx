import { useState, useRef, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { PlusOutlined, CloseOutlined, PlayCircleFilled } from '@ant-design/icons'

const { Title, Paragraph } = Typography

interface UploadedImage {
  id: string
  file: File
  preview: string
}

function RemixPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const title = searchParams.get('title') || 'Brazil Jersey in Transit'
  
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
    if (uploadedImages.length === 0) return
    
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGeneratedVideo('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=800&fit=crop')
    setIsGenerating(false)
  }, [uploadedImages.length])

  // 返回上一页
  const handleClose = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/80" 
        onClick={handleClose} 
      />
      
      {/* 主内容区 */}
      <div className="relative w-full max-h-[calc(100vh-84px)] bg-[#131517] rounded-t-3xl overflow-hidden animate-slideUp">
        {/* 关闭按钮 */}
        <Button
          type="text"
          icon={<CloseOutlined className="text-white text-lg" />}
          onClick={handleClose}
          className="!absolute !top-6 !right-6 !z-10 !w-9 !h-9 !flex !items-center !justify-center !rounded-full hover:!bg-white/10"
        />

        <div className="flex p-12 gap-12 h-[calc(100vh-84px)]">
          {/* 左侧表单区 */}
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-6">
              {/* 标题 */}
              <Title level={2} className="!text-white !text-3xl !font-bold !mb-0">
                {title}
              </Title>
              
              {/* 描述 */}
              <Paragraph className="!text-white/50 !text-base !mb-0">
                A train appears behind the subject at full speed—loud, fast, and intense. 
                A perfect jump-scare or dramatic backdrop
              </Paragraph>

              {/* 上传区域 */}
              <div className="mt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div 
                  className="border-2 border-dashed border-white/20 rounded-xl p-6 cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadedImages.length === 0 ? (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        <PlusOutlined className="text-white text-xl" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Upload Image</p>
                        <p className="text-white/40 text-sm">Please upload 1–5 images.(PNG/JPG, under 10MB)</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
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
                        <div className="w-20 h-20 bg-white/5 rounded-lg flex items-center justify-center">
                          <PlusOutlined className="text-white/40 text-xl" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 生成按钮 */}
              <Button
                type="primary"
                size="large"
                onClick={handleGenerate}
                disabled={isGenerating || uploadedImages.length === 0}
                loading={isGenerating}
                className="!bg-gradient-to-r !from-green-400 !to-lime-400 !border-0 !rounded-full !h-12 !text-base !font-semibold !text-black disabled:!opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate Video'}
              </Button>
            </div>
          </div>

          {/* 右侧预览区 */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden relative">
              {generatedVideo ? (
                <div className="relative w-full h-full">
                  <img src={generatedVideo} alt="Generated video preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <PlayCircleFilled className="text-white text-6xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=800&fit=crop" 
                    alt="Preview" 
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemixPage
