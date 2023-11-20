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
    <main className='flex-grow bg-gray-200 p-5'>
      <div className='grid grid-cols-12 gap-4 h-full'>
        <aside className='col-span-2 bg-slate-400'>
          <div className='sticky top-10'>Dit moet een sticky navbar zijn.</div>
        </aside>

        <div className='col-span-8'>
          <UrlSubmitForm />

          <div>
            <div>
              <h1>Filter and sorting bar and maybe a settings button</h1>
            </div>
            <h1>BOOKMARK COLLECTION</h1>
            <Bookmarks data={bookmarks as unknown as BookmarkResponse[]} />
          </div>
        </div>
      </div>
    </main>
  );
}
