// components/layout/Sidebar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ✅ Import all icons once, without duplicates
import {
  LayoutDashboard,
  Phone,
  Users,
  Building2,
  Briefcase,
  CheckSquare,
  Settings as SettingsIcon,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'agent', 'client'] },
  { name: 'Leads', href: '/leads', icon: Phone, roles: ['admin', 'agent'] },
  { name: 'Clients', href: '/clients', icon: Users, roles: ['admin', 'agent'] },
  { name: 'Properties', href: '/properties', icon: Building2, roles: ['admin', 'agent'] },
  { name: 'Deals', href: '/deals', icon: Briefcase, roles: ['admin', 'agent'] },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare, roles: ['admin', 'agent'] },
  { name: 'Settings', href: '/settings', icon: SettingsIcon, roles: ['admin'] },
];

export default function Sidebar({ user, isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-indigo-600">EstateFlow</h1>
          <p className="text-sm text-gray-500">Real Estate CRM</p>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4">
          <ul className="space-y-1">
            {menuItems
              .filter((item) => user && item.roles.includes(user.role))
              .map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors
                        ${
                          pathname === item.href
                            ? 'bg-indigo-100 text-indigo-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <span className="flex-shrink-0">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t">
          <p className="text-sm font-medium">{user?.name || 'User'}</p>
          <p className="text-xs text-gray-500 capitalize">
            {user?.role === 'admin'
              ? 'Administrator'
              : user?.role
                ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`
                : 'Agent'}
          </p>
        </div>
      </aside>
    </>
  );
}