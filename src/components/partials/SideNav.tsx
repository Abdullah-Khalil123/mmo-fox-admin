'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, User, Gamepad2, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

const links = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/users', label: 'Users', icon: User },
  { href: '/transactions', label: 'Transactions', icon: DollarSign },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col justify-between w-64 h-screen bg-gray-100 dark:bg-gray-900 p-4 border-r">
      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-800',
              pathname === href && 'bg-gray-300 dark:bg-gray-800 text-primary'
            )}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
      <Button variant={'destructive'} onClick={() => signOut()}>
        Sign Out
      </Button>
    </aside>
  );
}
