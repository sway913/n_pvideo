import { Typography } from 'antd'

const { Title, Paragraph } = Typography

function ToolsPage() {
  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
      <div className="text-center">
        <Title level={1} className="!text-5xl !text-white !mb-4">Tools</Title>
        <Paragraph className="!text-lg !text-white/50">工具页面 - 开发中...</Paragraph>
      </div>
    </div>
  )
}

export default ToolsPage
