'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900 text-white flex items-center justify-between px-4 border-b border-gray-700">
      {/* Brand */}
      <div className="text-xl font-bold">
        <Link href="/">Admin Panel</Link>
      </div>

      {/* Desktop nav items */}
      <div className="hidden md:flex gap-6 items-center">
        <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
        <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
        <Link href="/contact-us" className="hover:text-gray-300 transition-colors">Contact</Link>

        {user ? (
          <>
            <Link href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
            <span className="text-sm text-gray-400 italic">({user.role})</span>
            <button onClick={handleLogout} className="hover:text-red-400 transition-colors">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-gray-300 transition-colors">Login</Link>
            <Link href="/register" className="hover:text-gray-300 transition-colors">Register</Link>
          </>
        )}
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-gray-400 hover:text-white focus:outline-none"
      >
        ☰
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col md:hidden z-50 shadow-lg">
          <Link href="/" className="px-4 py-2 hover:bg-gray-700">Home</Link>
          <Link href="/about" className="px-4 py-2 hover:bg-gray-700">About</Link>
          <Link href="/contact-us" className="px-4 py-2 hover:bg-gray-700">Contact</Link>

          {user ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 hover:bg-gray-700">Dashboard</Link>
              <button onClick={handleLogout} className="px-4 py-2 text-left hover:bg-gray-700 text-red-300">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 hover:bg-gray-700">Login</Link>
              <Link href="/register" className="px-4 py-2 hover:bg-gray-700">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
