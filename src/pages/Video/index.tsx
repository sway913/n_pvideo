import { useState, useCallback, useMemo } from 'react'
import { Button, Input, Upload, message } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { ModelDropdown } from '../../components/common'
import type { ModelInfo } from '../../components/common'

// Types
interface VideoTabItem {
  id: string
  name: string
}

interface RatioOption {
  id: string
  label: string
  icon: React.ReactNode
}

interface InspirationVideo {
  id: number
  image: string
  height: number
}

// Mock Data
const VIDEO_TABS: VideoTabItem[] = [
  { id: 'image-to-video', name: 'Image to Video' },
  { id: 'text-to-video', name: 'Text to Video' },
  { id: 'keyframe-video', name: 'Keyframe Video' },
]

const MODELS: ModelInfo[] = [
  {
    id: 'soar-2',
    name: 'Soar_2',
    description: 'The_most_popular_model_at_present',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=100&h=100&fit=crop',
  },
  {
    id: 'soar-1',
    name: 'Soar_1',
    description: 'Fast_generation_model',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=100&h=100&fit=crop',
  },
  {
    id: 'ultra-hd',
    name: 'Ultra_HD',
    description: 'High_quality_video_output',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
  },
  {
    id: 'creative-ai',
    name: 'Creative_AI',
    description: 'Best_for_artistic_content',
    image: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=100&h=100&fit=crop',
  },
  {
    id: 'fast-render',
    name: 'Fast_Render',
    description: 'Quick_preview_generation',
    image: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=100&h=100&fit=crop',
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Movie_style_video_effects',
    image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=100&h=100&fit=crop',
  },
]

const RATIO_OPTIONS: RatioOption[] = [
  { id: '16:9', label: '16:9', icon: <div className="w-7 h-4 border-[1.5px] border-current rounded-sm" /> },
  { id: '9:16', label: '9:16', icon: <div className="w-4 h-7 border-[1.5px] border-current rounded-sm" /> },
  { id: '4:3', label: '4:3', icon: <div className="w-6 h-5 border-[1.5px] border-current rounded-sm" /> },
  { id: '3:4', label: '3:4', icon: <div className="w-5 h-6 border-[1.5px] border-current rounded-sm" /> },
  { id: '1:1', label: '1:1', icon: <div className="w-5 h-5 border-[1.5px] border-current rounded-sm" /> },
]

const INSPIRATION_VIDEOS: InspirationVideo[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400', height: 346 },
  { id: 2, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400', height: 258 },
  { id: 3, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', height: 362 },
  { id: 4, image: 'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?w=400', height: 287 },
  { id: 5, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400', height: 332 },
  { id: 6, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400', height: 259 },
  { id: 7, image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400', height: 362 },
  { id: 8, image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400', height: 287 },
  { id: 9, image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400', height: 332 },
  { id: 10, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', height: 259 },
  { id: 11, image: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=400', height: 362 },
  { id: 12, image: 'https://images.unsplash.com/photo-1518173946687-a4c036bc3c96?w=400', height: 287 },
]

// Sub Components
function VideoSubTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <div className="inline-flex items-center gap-4 px-[22px] py-[9px] bg-[#131517] border border-white/10 rounded-[30px]">
      {VIDEO_TABS.map((tab) => (
        <Button
          key={tab.id}
          type="text"
          className={`!text-base !font-bold !p-0 !h-auto !border-none transition-all ${
            activeTab === tab.id ? '!text-white' : '!text-white/50 hover:!text-white/80'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.name}
        </Button>
      ))}
    </div>
  )
}

function ContentToggle({ activeView, onViewChange }: { activeView: 'history' | 'inspirations'; onViewChange: (view: 'history' | 'inspirations') => void }) {
  return (
    <div className="relative inline-flex items-center w-[218px] h-10 bg-[#131517] border border-white/10 rounded-[30px] overflow-hidden">
      {/* Sliding background indicator */}
      <div 
        className="absolute top-[1px] h-[38px] bg-white rounded-[30px] transition-all duration-300"
        style={{
          left: activeView === 'history' ? '1px' : '92px',
          width: activeView === 'history' ? '92px' : '125px'
        }}
      />
      {/* History button */}
      <button
        className="relative z-10 w-[93px] h-full flex items-center justify-center text-base font-semibold transition-colors duration-300"
        style={{ color: activeView === 'history' ? '#000000' : '#FFFFFF' }}
        onClick={() => onViewChange('history')}
      >
        History
      </button>
      {/* Inspirations button */}
      <button
        className="relative z-10 flex-1 h-full flex items-center justify-center text-base font-semibold transition-colors duration-300"
        style={{ color: activeView === 'inspirations' ? '#000000' : '#FFFFFF' }}
        onClick={() => onViewChange('inspirations')}
      >
        Inspirations
      </button>
    </div>
  )
}

// ModelSelector has been replaced by the unified ModelDropdown component from common

// Upload icon component matching Figma design
function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer rounded rectangle frame */}
      <rect x="1.75" y="1.75" width="24.5" height="24.5" rx="5.83" stroke="white" strokeWidth="2.33" fill="none" />
      {/* Mountain/landscape shape */}
      <path d="M1.75 20L8 14L14 20" stroke="white" strokeWidth="2.33" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Sun circle */}
      <circle cx="20" cy="8" r="2.5" fill="white" />
      {/* Plus icon in bottom right */}
      <g transform="translate(17, 17)">
        <line x1="4.5" y1="0" x2="4.5" y2="9" stroke="white" strokeWidth="2.33" strokeLinecap="round" />
        <line x1="0" y1="4.5" x2="9" y2="4.5" stroke="white" strokeWidth="2.33" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function ImageUploader({ fileList, onChange }: { fileList: UploadFile[]; onChange: (files: UploadFile[]) => void }) {
  const uploadProps: UploadProps = {
    listType: 'picture-card',
    fileList,
    maxCount: 3,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('只能上传图片文件!')
        return Upload.LIST_IGNORE
      }
      return false
    },
    onChange: ({ fileList: newFileList }) => {
      onChange(newFileList)
    },
  }

  const imageLabels = ['Image 1', 'Image 2\n（optional）', 'Image 3\n（optional）']

  return (
    <div className="h-[145px]">
      {/* Header row */}
      <div className="flex items-center justify-between mb-[11px]">
        <span className="text-base font-bold text-white/50">Image</span>
        <span className="text-[13px] font-medium text-white/50">Upload PNG, JPG, up to 10 images</span>
      </div>
      {/* Upload boxes row */}
      <div className="flex gap-[7px] [&_.ant-upload]:!border-0 [&_.ant-upload-select]:!border-0 [&_.ant-upload]:!bg-transparent [&_.ant-upload-wrapper]:!block">
        {[0, 1, 2].map((index) => (
          <div key={index} className="w-[110px] h-[110px] relative">
            {fileList[index] ? (
              <div className="w-full h-full rounded-xl overflow-hidden border border-dashed border-white/10 bg-white/[0.04]">
                <img
                  src={fileList[index].thumbUrl || fileList[index].url || URL.createObjectURL(fileList[index].originFileObj as Blob)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/60 text-white text-xs flex items-center justify-center hover:bg-black/80 transition-colors outline-none"
                  onClick={() => {
                    const newList = [...fileList]
                    newList.splice(index, 1)
                    onChange(newList)
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <Upload {...uploadProps} showUploadList={false} className="!border-0">
                <div className="w-[110px] h-[110px] border border-dashed border-white/10 rounded-xl bg-white/[0.04] flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-colors outline-none">
                  <div className="flex flex-col items-center opacity-60">
                    <UploadIcon />
                    <span className="text-xs text-white text-center mt-[2px] leading-[1.45] whitespace-pre-line">
                      {imageLabels[index]}
                    </span>
                  </div>
                </div>
              </Upload>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Keyframe upload icon component - matching Figma design
function KeyframeUploadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle (sun) */}
      <circle cx="9.33" cy="9.33" r="2.67" fill="white" />
      {/* Outer frame with rounded corners */}
      <rect x="2" y="2" width="25.33" height="25.33" rx="6.67" stroke="white" strokeWidth="2.67" fill="none" />
      {/* Mountain shape */}
      <path d="M2 24L12 14L22 24" stroke="white" strokeWidth="2.67" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Plus icon in bottom right */}
      <g transform="translate(20.67, 16.67)">
        <line x1="5.33" y1="0" x2="5.33" y2="10.67" stroke="white" strokeWidth="2.67" strokeLinecap="round" />
        <line x1="0" y1="5.33" x2="10.67" y2="5.33" stroke="white" strokeWidth="2.67" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// Link/swap icon for keyframe connection - "ic-替换" matching Figma design
// Inner icon: 22x22, path: 18.33x15.71 at offset (1.83, 3.05)
function KeyframeLinkIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="16" cy="16" r="16" fill="#111111" />
      {/* Inner swap/replace icon - two horizontal arrows */}
      <g transform="translate(5, 5)" opacity="0.9">
        {/* Top arrow pointing right */}
        <path 
          d="M3 7H16L13 4" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        <path 
          d="M16 7L13 10" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        {/* Bottom arrow pointing left */}
        <path 
          d="M19 15H6L9 18" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        <path 
          d="M6 15L9 12" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  )
}

// Keyframe uploader component for First Frame and End Frame
function KeyframeUploader({ 
  firstFrame, 
  endFrame, 
  onFirstFrameChange, 
  onEndFrameChange 
}: { 
  firstFrame: UploadFile | null
  endFrame: UploadFile | null
  onFirstFrameChange: (file: UploadFile | null) => void
  onEndFrameChange: (file: UploadFile | null) => void
}) {
  const createUploadProps = (onChange: (file: UploadFile | null) => void): UploadProps => ({
    listType: 'picture-card',
    maxCount: 1,
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('只能上传图片文件!')
        return Upload.LIST_IGNORE
      }
      const uploadFile: UploadFile = {
        uid: Date.now().toString(),
        name: file.name,
        status: 'done',
        originFileObj: file,
      }
      onChange(uploadFile)
      return false
    },
  })

  const UploadBox = ({ 
    file, 
    label, 
    onChange, 
    uploadProps 
  }: { 
    file: UploadFile | null
    label: string
    onChange: (file: UploadFile | null) => void
    uploadProps: UploadProps
  }) => (
    <div className="w-[167px] h-[167px] relative">
      {file ? (
        <div 
          className="w-full h-full rounded-xl overflow-hidden bg-white/[0.04]"
          style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
        >
          <img
            src={file.thumbUrl || file.url || (file.originFileObj ? URL.createObjectURL(file.originFileObj as Blob) : '')}
            alt={label}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/60 text-white text-xs flex items-center justify-center hover:bg-black/80 transition-colors outline-none"
            onClick={() => onChange(null)}
          >
            ×
          </button>
        </div>
      ) : (
        <Upload {...uploadProps} className="!border-0 [&_.ant-upload]:!border-0 [&_.ant-upload-select]:!border-0 [&_.ant-upload]:!bg-transparent">
          <div 
            className="w-[167px] h-[167px] rounded-xl bg-white/[0.04] flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.06] transition-colors"
            style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
          >
            <div className="flex flex-col items-center opacity-60">
              <KeyframeUploadIcon />
              <span className="text-sm text-white text-center mt-2 font-semibold">
                {label}
              </span>
            </div>
          </div>
        </Upload>
      )}
    </div>
  )

  return (
    <div className="space-y-[11px]">
      {/* Image label */}
      <span className="text-base font-bold text-white/50">Image</span>
      
      {/* Upload boxes row with link icon overlay */}
      <div className="flex items-start relative">
        {/* First Frame */}
        <UploadBox
          file={firstFrame}
          label="First Frame"
          onChange={onFirstFrameChange}
          uploadProps={createUploadProps(onFirstFrameChange)}
        />
        
        {/* Gap spacer */}
        <div className="w-[9px] flex-shrink-0" />
        
        {/* End Frame */}
        <UploadBox
          file={endFrame}
          label="End Frame"
          onChange={onEndFrameChange}
          uploadProps={createUploadProps(onEndFrameChange)}
        />
        
        {/* Link icon overlay - centered between two boxes */}
        <div 
          className="absolute z-10"
          style={{ left: '155px', top: '68px' }}
        >
          <KeyframeLinkIcon />
        </div>
      </div>
    </div>
  )
}

function PromptInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-2">
      <span className="text-base font-bold text-white/40">Prompt</span>
      <Input.TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Please describe the video content you want to generate"
        className="!bg-white/[0.04] !border-none !rounded-xl !text-white/70 !text-sm !min-h-[120px] !resize-none placeholder:!text-white/30"
        autoSize={{ minRows: 4, maxRows: 6 }}
      />
    </div>
  )
}

function RatioSelector({ selectedRatio, onSelect }: { selectedRatio: string; onSelect: (ratio: string) => void }) {
  return (
    <div className="space-y-2">
      <span className="text-base font-bold text-white/40">Ration</span>
      <div className="flex items-center gap-2">
        {RATIO_OPTIONS.map((option) => (
          <div
            key={option.id}
            className={`w-[62px] h-[62px] rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
              selectedRatio === option.id
                ? 'bg-[#C3FC3A]/10 border border-[#C3FC3A] text-white'
                : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.08]'
            }`}
            onClick={() => onSelect(option.id)}
          >
            <div className={selectedRatio === option.id ? 'text-[#C3FC3A]' : ''}>
              {option.icon}
            </div>
            <span className={`text-xs font-bold ${selectedRatio === option.id ? 'text-white' : 'text-white/60'}`}>
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function InspirationGrid({ videos }: { videos: InspirationVideo[] }) {
  const columns = useMemo(() => {
    const cols: InspirationVideo[][] = [[], [], [], []]
    videos.forEach((video, index) => {
      cols[index % 4].push(video)
    })
    return cols
  }, [videos])

  return (
    <div className="flex gap-2">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex-1 flex flex-col gap-2">
          {column.map((video) => (
            <div
              key={video.id}
              className="relative rounded-lg overflow-hidden cursor-pointer group"
              style={{ height: video.height }}
            >
              <img
                src={video.image}
                alt={`Inspiration ${video.id}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// Main Component
function VideoPage() {
  const [activeTab, setActiveTab] = useState('image-to-video')
  const [activeView, setActiveView] = useState<'history' | 'inspirations'>('inspirations')
  const [selectedRatio, setSelectedRatio] = useState('16:9')
  const [prompt, setPrompt] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  // Keyframe Video states
  const [firstFrame, setFirstFrame] = useState<UploadFile | null>(null)
  const [endFrame, setEndFrame] = useState<UploadFile | null>(null)
  const [selectedModel, setSelectedModel] = useState<ModelInfo>(MODELS[0])

  const handleModelSelect = useCallback((model: ModelInfo) => {
    setSelectedModel(model)
  }, [])

  const handleGenerate = useCallback(() => {
    if (activeTab === 'image-to-video' && fileList.length === 0) {
      message.warning('请先上传至少一张图片')
      return
    }
    if (activeTab === 'text-to-video' && !prompt.trim()) {
      message.warning('请输入视频描述内容')
      return
    }
    if (activeTab === 'keyframe-video' && (!firstFrame || !endFrame)) {
      message.warning('请上传首帧和尾帧图片')
      return
    }
    message.success('视频生成任务已提交!')
  }, [activeTab, fileList, prompt, firstFrame, endFrame])

  // Check if generate button should be disabled for keyframe mode
  const isKeyframeReady = activeTab !== 'keyframe-video' || (firstFrame && endFrame)

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  const handleViewChange = useCallback((view: 'history' | 'inspirations') => {
    setActiveView(view)
  }, [])

  return (
    <div className="min-h-[calc(100vh-72px)] pt-6">
      {/* Top Navigation Row - Sub Tabs left, Content Toggle aligned with right panel */}
      <div className="px-[60px] flex items-start mb-6">
        {/* Left: Sub Tabs */}
        <div className="w-[392px] flex-shrink-0">
          <VideoSubTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        {/* Right: History/Inspirations Toggle - aligned with right content area */}
        <div className="ml-[48px]">
          <ContentToggle activeView={activeView} onViewChange={handleViewChange} />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[60px] flex gap-[48px]">
        {/* Left Panel - Creation Form */}
        <div className="w-[392px] flex-shrink-0">
          <div className="bg-[#131517] border border-white/10 rounded-3xl p-6 space-y-4">
            <ModelDropdown 
              models={MODELS} 
              selectedModel={selectedModel} 
              onSelect={handleModelSelect}
            />
            {/* Image Uploader - only show for image-to-video tab */}
            {activeTab === 'image-to-video' && (
              <ImageUploader fileList={fileList} onChange={setFileList} />
            )}
            {/* Keyframe Uploader - only show for keyframe-video tab */}
            {activeTab === 'keyframe-video' && (
              <KeyframeUploader
                firstFrame={firstFrame}
                endFrame={endFrame}
                onFirstFrameChange={setFirstFrame}
                onEndFrameChange={setEndFrame}
              />
            )}
            <PromptInput value={prompt} onChange={setPrompt} />
            <RatioSelector selectedRatio={selectedRatio} onSelect={setSelectedRatio} />
            
            {/* Generate Button */}
            <Button
              type="primary"
              className={`!w-full !h-11 !rounded-[50px] !text-xl !font-bold gradient-green-btn !border-none !text-black transition-opacity ${
                isKeyframeReady ? 'hover:!opacity-90' : '!opacity-30'
              }`}
              onClick={handleGenerate}
            >
              Generate Video
            </Button>
          </div>
        </div>

        {/* Right Panel - Content Grid */}
        <div className="flex-1 min-w-0">
          {activeView === 'inspirations' ? (
            <InspirationGrid videos={INSPIRATION_VIDEOS} />
          ) : (
            <div className="flex items-center justify-center h-[600px] text-white/50">
              暂无历史记录
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoPage
