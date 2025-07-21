'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { User, Gamepad2, DollarSign, Menu, LogOut, LayoutDashboard, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/users', label: 'Users', icon: User },
  { href: '/orders', label: 'Orders', icon: DollarSign },
];

export default function SideNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Handle scroll effect for sidebar header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4 fixed top-0 left-0 z-30">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-all"
        >
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Button>
      </div>

      {/* Backdrop on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with subtle scroll effect */}
          <div className={cn(
            "p-5 pt-7 border-b border-gray-200 dark:border-gray-800 transition-all duration-300",
            isScrolling ? "py-4" : "pb-6"
          )}>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg shadow">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Admin Panel
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
              Manage your platform efficiently
            </p>
          </div>

          <div className="flex-1 overflow-y-auto py-5 px-3">
            <nav className="space-y-1">
              {links.map(({ href, label, icon: Icon, exact }) => {
                // Updated isActive logic to match base paths
                const isActive = exact
                  ? pathname === href
                  : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-100 group',
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-l-4 border-blue-500 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={cn(
                      "p-2 rounded-lg transition-all",
                      isActive
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200/60 dark:bg-gray-700 text-gray-700 dark:text-gray-300 group-hover:bg-blue-500 group-hover:text-white"
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={cn(
                      isActive ? "text-blue-700 dark:text-blue-300 font-medium" : "font-normal"
                    )}>
                      {label}
                    </span>
                    <ChevronRight className={cn(
                      "ml-auto w-4 h-4 transition-transform duration-200",
                      isActive ? "text-blue-500 transform translate-x-0" : "text-gray-400 transform -translate-x-1 group-hover:translate-x-0 group-hover:text-blue-500"
                    )} />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer with sign out */}
          <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="bg-gray-300 border-2 border-dashed rounded-xl w-10 h-10" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-center text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 border-gray-300 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-400/50 transition-all group"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}