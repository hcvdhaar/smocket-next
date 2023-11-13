import React from 'react';
import { Bookmarks } from './components/Bookmarks';
import { promises as fs } from 'fs';
import { Bookmark } from './types/bookmark.type';

// This function runs on the server, since this a page component is by default a server component.
// Therefor it to fetch the data before it renders the page.
async function fetchFakeProducts(): Promise<Bookmark[]> {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();

  return data;
}

export default async function Home() {
  const data = await fetchFakeProducts();

  return (
    <main className='flex-grow bg-orange-50'>
      <div className='grid grid-cols-12 gap-4'>
        <aside className='col-span-4'>
          <div className='sticky top-10'>Dit moet een sticky navbar zijn.</div>
        </aside>

        <div className='col-span-8'>
          <div>
            <input type='text' />
          </div>
          <div>
            <Bookmarks data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
