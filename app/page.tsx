import React from 'react';
import prisma from '@/libs/db';
import { Bookmarks, UrlSubmitForm } from './components';
import { BookmarkResponse } from './types/bookmark.type';

async function getBookMarks() {
  const bookmarks = await prisma.bookmark.findMany();
  return bookmarks;
}

export default async function Home() {
  const bookmarks = await getBookMarks();

  return (
    <main className='flex-grow bg-gray-200'>
      <div className='grid grid-cols-12 gap-4 h-full'>
        <aside className='col-span-2 bg-dark_gray p-5'>
          <div className='sticky top-10'>Dit moet een sticky navbar zijn.</div>
        </aside>

        <div className='col-span-8 mt-4'>
          <div className='mb-4'>
            <UrlSubmitForm />
          </div>

          <div className='flex justify-evenly py-4 px-2 border-1 rounded-lg mb-4'>
            <button className='border-2 border-gray-500 rounded-md p-2 py-1 text-sm'>
              filter 1
            </button>
            <button className='border-2 border-gray-500 rounded-md p-2 py-1 text-sm'>
              filter 1
            </button>
            <button className='border-2 border-gray-500 rounded-md p-2 py-1 text-sm'>
              filter 1
            </button>
          </div>

          <div>
            <Bookmarks data={bookmarks as unknown as BookmarkResponse[]} />
          </div>
        </div>
      </div>
    </main>
  );
}
