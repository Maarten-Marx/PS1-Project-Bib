import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import App from './pages/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cancel from './pages/Cancel'
import Confirm from './pages/Confirm'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/cancel/:hash',
        element: <Cancel />
    },
    {
        path: '/confirm',
        element: <Confirm />
    }
])

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
