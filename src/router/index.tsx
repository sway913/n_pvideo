import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { ExplorePage, VideoPage, EditPage, ToolsPage, CategoryPage, RemixPage, AccountPage } from '../pages'
import UpscalePage from '../pages/Tools/upscale'
import SubtitleRemoverPage from '../pages/Tools/subtitle-remover'
import BackgroundRemoverPage from '../pages/Tools/background-remover'

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
        children: [
          {
            path: 'upscale',
            element: <UpscalePage />,
          },
          {
            path: 'subtitle-remover',
            element: <SubtitleRemoverPage />,
          },
          {
            path: 'background-remover',
            element: <BackgroundRemoverPage />,
          },
        ],
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
      {
        path: 'account',
        element: <AccountPage />,
      },
    ],
  },
])