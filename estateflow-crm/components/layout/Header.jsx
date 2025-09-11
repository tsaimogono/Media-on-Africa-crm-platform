// components/layout/Header.jsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header({ user, onSidebarToggle }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    onSidebarToggle?.();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo + Title */}
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 className="ml-2 text-lg font-semibold text-gray-800">EstateFlow CRM</h2>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">{user?.name}</span>
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {user?.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Optional) */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white border-t p-4 space-y-2">
          {[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Leads', href: '/leads' },
            { name: 'Clients', href: '/clients' },
            { name: 'Properties', href: '/properties' },
            { name: 'Deals', href: '/deals' },
            { name: 'Tasks', href: '/tasks' },
            { name: 'Settings', href: '/settings' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-md text-sm ${
                pathname === item.href
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => {
              // Simulate logout
              window.location.href = '/login';
            }}
            className="w-full text-left text-sm text-red-600 hover:text-red-800 px-4 py-2 rounded"
          >
            Log Out
          </button>
        </nav>
      )}
    </header>
  );
}