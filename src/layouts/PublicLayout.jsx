import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Logo from '../components/common/Logo'

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Horizontal Navbar for Public Landing */}
      <header className="sticky top-0 z-50 bg-white border-b border-outline-variant px-6 py-4">
        <div className="max-w-container mx-auto flex items-center justify-between">
          <Link to="/">
            <Logo variant="full" theme="light" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              Masuk / Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Public Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="bg-primary text-white py-8 px-6 border-t border-outline-variant">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <Logo variant="full" theme="dark" />
          <p>© {new Date().getFullYear()} Fattah Wedding Organizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
