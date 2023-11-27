import React from 'react';
import { Bookmarks, UrlSubmitForm } from './components';

export default async function Home() {
  return (
    <main className='flex-grow bg-gray-200'>
      <div className='flex flex-row'>
        <aside className='bg-dark_gray p-5 tablet-landscape-up:w-60 hidden tablet-landscape-up:block'>
          <div className='sticky top-10'>Dit moet een sticky navbar zijn.</div>
        </aside>

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
