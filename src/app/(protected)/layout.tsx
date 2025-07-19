import React, { ReactNode } from 'react';
import SideNav from '@/components/layouts/SideNav'; // adjust path if needed
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session === null) {
    redirect('/login');
  }
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 transition-all duration-300">
        <div className="p-4 md:p-6 max-h-dvh overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default layout;