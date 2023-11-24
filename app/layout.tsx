import type { Metadata } from 'next';
import { Providers } from './providers';
import { NavBar } from './components/Navbar/NavBar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smocket Bookmarks',
  description:
    'Making your bookmarks easy to find and accessible from anywhere',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='bg-dark'>
      <body className='min-h-screen'>
        <Providers>
          <div className='relative flex flex-col h-screen'>
            <NavBar />

            {children}

            <footer className='p-5  bg-purple-400'>I am a footer</footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
