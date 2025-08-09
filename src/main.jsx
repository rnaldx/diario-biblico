import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import DayPage from './pages/DayPage.jsx'
import NotePage from './pages/NotePage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import { registerSW } from 'virtual:pwa-register'

const router = createBrowserRouter([
  { path: '/', element: <App />,
    children: [
      { index: true, element: <CalendarPage /> },
      { path: 'day/:iso', element: <DayPage /> },
      { path: 'note/:id', element: <NotePage /> },
      { path: 'search', element: <SearchPage /> },
    ]
  },
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)

registerSW({ immediate: true })
