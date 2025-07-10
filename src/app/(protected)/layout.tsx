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
      <main className="p-6 w-full max-h-dvh overflow-y-scroll">{children}</main>
    </div>
  );
};

export default layout;
