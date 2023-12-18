import React from 'react';
import { Bookmarks, Sidebar, UrlSubmitForm } from './components';

export default async function Home() {
  return (
    <main className='flex-grow bg-gray-200'>
      <div className='flex flex-row h-full'>
        <Sidebar />

        <div className='flex-1 p-5'>
          <div className='mb-4'>
            <UrlSubmitForm />
          </div>

          <div className='flex justify-evenly py-4 px-2 border-3 border-dark_gray rounded-lg mb-4'>
            <button className='border-2 border-dark_gray rounded-md p-2 py-1 text-sm'>
              filter 1
            </button>
            <button className='border-2 border-dark_gray rounded-md p-2 py-1 text-sm'>
              filter 1
            </button>
            <button className='border-2 border-dark_gray rounded-md p-2 py-1 text-sm'>
              filter 1
            </button>
          </div>

          <Bookmarks />
        </div>
      </div>
    </main>
  );
}
