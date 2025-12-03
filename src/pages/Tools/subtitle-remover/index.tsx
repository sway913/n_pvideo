import { Button } from 'antd'

function SubtitleRemoverPage() {
  return (
    <div className="min-h-[calc(100vh-72px)] pt-8 pb-16 px-6">
      <div className="max-w-[1244px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧内容 */}
          <div className="w-full lg:w-[508px] flex-shrink-0">
            <div className="bg-[#131517] border border-white/10 rounded-[24px] p-6 h-full">
              <h1 className="text-[32px] font-bold text-white mb-2 leading-tight">Subtitle Remover</h1>
              <p className="text-[14px] text-white/50 mb-8">
                Remove subtitles from your videos automatically.
              </p>
              
              {/* 上传区域 */}
              <div className="mb-8">
                <div 
                  className="bg-white/5 border border-dashed border-white/10 rounded-[12px] overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderStyle: 'dashed',
                    borderWidth: '1px',
                    borderRadius: '12px',
                    height: '460px',
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <div className="w-[32px] h-[32px] mb-4 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="16" fill="#D9D9D9" />
                        <circle cx="16" cy="12" r="2.667" stroke="white" strokeWidth="2.667" />
                        <path d="M10.667 18.667L13.333 16L16 18.667L18.667 16L21.333 18.667V21.333C21.333 21.687 21.193 22.027 20.943 22.277C20.693 22.527 20.353 22.667 20 22.667H12C11.647 22.667 11.307 22.527 11.057 22.277C10.807 22.027 10.667 21.687 10.667 21.333V18.667Z" stroke="white" strokeWidth="2.667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.667 18.667H21.333" stroke="white" strokeWidth="2.667" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p className="text-white text-[14px] font-semibold mb-1">Upload Video</p>
                    <p className="text-white/30 text-[14px] text-center">
                      Click or drag to upload video<br />
                      (MP4, M4A, MOV; Max 200MB)
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 启动按钮 */}
              <Button
                type="primary"
                className="w-full h-[48px] rounded-[50px] text-[20px] font-bold flex items-center justify-center !bg-gradient-to-r !from-[#64FF48] !to-[#C8FC39] !text-black !opacity-30 cursor-not-allowed"
                disabled
              >
                Remove Subtitles
              </Button>
            </div>
          </div>
          
          {/* 右侧示例区域 */}
          <div className="flex-1">
            <div className="bg-white/5 border border-white/10 rounded-[24px] h-full min-h-[688px] overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-[344px] h-[688px] mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[10px]"></div>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="text-white/30 text-lg">示例预览</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubtitleRemoverPage