import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactQueryClientProvider } from '@/utils/ReactQueryClientProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import RightSection from '@/components/RightSection';
import { Toaster } from '@/components/ui/sonner';
import Providers from '@/components/Providers';
import { SocketProvider } from './contexts/WebsocketContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Zodiac',
    template: '%s - Zodiac',
  },
  description: 'Place for all zodiacs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={inter.className}>
        <Providers>
          <SocketProvider>
            <ReactQueryClientProvider>
              <ThemeProvider>
                <div className="flex flex-col h-screen overflow-y-auto ">
                  <Navbar />
                  <div className="flex h-screen">
                    <LeftSidebar />
                    {children}
                    <RightSection />
                  </div>
                  <Toaster richColors />
                </div>
              </ThemeProvider>
            </ReactQueryClientProvider>
          </SocketProvider>
        </Providers>
      </body>
    </html>
  );
}
