// components/layout/Navbar.jsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar({ user, onToggleSidebar }) {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Hamburger Menu */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
            EstateFlow
          </Link>
          <span className="ml-2 text-sm text-gray-500 hidden sm:inline">CRM</span>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">{user?.name}</span>
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {user?.name.split(' ').map(n => n[0]).toUpperCase().join('')}
          </div>
        </div>
      </div>
    </header>
  );
}