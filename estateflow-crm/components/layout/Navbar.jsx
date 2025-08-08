// components/layout/Navbar.jsx
'use client';

import { usePathname } from 'next/navigation';

export default function Navbar({ user, onToggleSidebar }) {
  const pathname = usePathname();
  const pageName = pathname.split('/').pop();

  const formattedPageName =
    pageName?.charAt(0).toUpperCase() + pageName?.slice(1) || 'Dashboard';

  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 py-3 border-b flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Hamburger Button (mobile) */}
        <button
          onClick={onToggleSidebar}
          className="text-gray-600 hover:text-gray-900 lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Page Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {formattedPageName}
        </h2>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user?.name || 'Agent'}
        </span>
        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
          {user?.name?.charAt(0).toUpperCase() || 'A'}
        </div>
      </div>
    </header>
  );
}