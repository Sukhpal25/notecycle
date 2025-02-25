import React from 'react'
import Link from 'next/link'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#002851] shadow-md"> {/* UC Davis Blue */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center text-[#C99700] font-bold text-xl"> {/* UC Davis Gold */}
                NoteCycle
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="text-white border-[#C99700] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/courses" className="border-transparent text-gray-300 hover:text-[#C99700] hover:border-[#C99700] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Courses
                </Link>
                <Link href="/upload" className="border-transparent text-gray-300 hover:text-[#C99700] hover:border-[#C99700] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Upload Notes
                </Link>
                <Link href="/dashboard" className="border-transparent text-gray-300 hover:text-[#C99700] hover:border-[#C99700] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link href="/profile" className="text-gray-300 hover:text-[#C99700] px-3 py-2 rounded-md text-sm font-medium">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default Layout