import React, { ReactNode } from 'react';
import SideNav from '@/components/partials/SideNav'; // adjust path if needed

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default layout;
