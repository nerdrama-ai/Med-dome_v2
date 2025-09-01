import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import LogoMark from './components/LogoMark.jsx'

export default function App() {
  const location = useLocation()
  return (
    <div className="app-shell">
      <header className="app-header glass">
        <div className="left">
          <Link to="/" className="brand">
            <LogoMark />
            <div className="brand-text">
              <span className="title">CareNow</span>
              <span className="subtitle">Find. Book. Feel Better.</span>
            </div>
          </Link>
        </div>
        <div className="center hide-on-mobile">
          <input className="search" placeholder="Search doctors, specialties, cities..." />
        </div>
        <div className="right">
          <Link to="/hospital" className="admin-btn" aria-current={location.pathname.startsWith('/hospital') ? 'page' : undefined}>
            Hospital Portal
          </Link>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <span>© {new Date().getFullYear()} CareNow</span>
        <span>Made for demo — data stored in your browser</span>
      </footer>
    </div>
  )
}
