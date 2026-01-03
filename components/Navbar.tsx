// File: components/Navbar.tsx

import React from 'react'
import Link from 'next/link'

/**
 * Navigation bar component
 * Responsive design with mobile-friendly layout
 */
const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
              DevBlog
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <a
              href="/studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Studio
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
