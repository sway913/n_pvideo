import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { ExplorePage, VideoPage, EditPage, ToolsPage, CategoryPage, RemixPage } from '../pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/explore" replace />,
      },
      {
        path: 'explore',
        element: <ExplorePage />,
      },
      {
        path: 'video',
        element: <VideoPage />,
      },
      {
        path: 'edit',
        element: <EditPage />,
      },
      {
        path: 'tools',
        element: <ToolsPage />,
      },
      {
        path: 'category/:slug',
        element: <CategoryPage />,
      },
      {
        path: 'video/:id',
        element: <VideoPage />,
      },
      {
        path: 'remix',
        element: <RemixPage />,
      },
    ],
  },
])
