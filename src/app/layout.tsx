import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReduxStoreProvider } from '@/providers/redux';

import './globals.css';
import ReactQueryProvider from '@/providers/react-query';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ReduxStoreProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ReduxStoreProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
