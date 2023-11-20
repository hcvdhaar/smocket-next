import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { NavBar } from './components/NavBar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/* TODO: Checkout why this is should be a min-height of 100vh */}
      <body className='min-h-screen bg-slate-800'>
        <Providers>
          {/* This is the content container */}
          {/* To let the child with a flex: 1 stretch to the botton we need to set a min-height: 100vh here as well. */}
          {/* TODO: checkout why setting all these min-heights are needed. */}
          <div className='relative flex flex-col h-screen'>
            <NavBar />
            {/* children is basically the router slot where all the pages are being rendered */}
            {children}

            <footer className='p-5  bg-purple-400'>I am a footer</footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
