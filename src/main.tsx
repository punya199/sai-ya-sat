// src/main.tsx
import { ConfigProvider, theme } from 'antd'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoadingSpinner } from './components/LoadingSpinner'
import './index.css'

// Lazy load components for code splitting
const HomePage = React.lazy(() => import('./page/HomePage'))
const SummaryInformation = React.lazy(() => import('./page/SummaryInformation'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/summary-information',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SummaryInformation />
      </Suspense>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#C96221',
          borderRadius: 8,
          fontSize: 16,
          fontFamily: `'Noto Sans Thai', sans-serif`,
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
)
