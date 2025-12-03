import { Typography } from 'antd'

const { Title, Paragraph } = Typography

function EditPage() {
  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
      <div className="text-center">
        <Title level={1} className="!text-5xl !text-white !mb-4">Edit</Title>
        <Paragraph className="!text-lg !text-white/50">视频编辑页面 - 开发中...</Paragraph>
      </div>
    </div>
  )
}

export default EditPage
