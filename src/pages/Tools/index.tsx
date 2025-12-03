import { Outlet } from 'react-router-dom'

function ToolsPage() {
  return (
    <div className="min-h-[calc(100vh-72px)]">
      <Outlet />
    </div>
  )
}

export default ToolsPage
