'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Settings, Badge , Package} from 'lucide-react'
import { useState } from 'react'


const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: Badge },
  { href: '/dashboard/createProduct', label: 'Product', icon: Package },
  { href: '/dashboard/user-profile', label: 'Users', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex">
      <aside
        className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <span className="text-xl font-bold transition-all duration-300">
            {isOpen ? 'Admin' : 'A'}
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')

            return (
              <Link href={href} key={href}>
                <div
                  className={`flex items-center px-4 py-3 transition-colors cursor-pointer ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {isOpen && <span className="ml-3">{label}</span>}
                </div>
              </Link>
            )
          })}
        </nav>
      </aside>
    </div>
  )
}
