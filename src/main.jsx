import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import DoctorPage from './pages/DoctorPage.jsx'
import Admin from './pages/Admin.jsx'
import './styles.css'

const router = createBrowserRouter([
  { 
    path: '/', element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'doctor/:id', element: <DoctorPage /> },
      { path: 'hospital', element: <Admin /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
