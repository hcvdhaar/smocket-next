import React from 'react';
import prisma from '@/libs/db';
import { createBookMark } from './actions';

async function getBookMarks() {
  const allUsers = await prisma.bookmark.findMany();
  console.log(allUsers);
}

export default async function Home() {
  getBookMarks();

  return (
    <main className='flex-grow bg-orange-50'>
      <div className='grid grid-cols-12 gap-4'>
        <aside className='col-span-4'>
          <div className='sticky top-10'>Dit moet een sticky navbar zijn.</div>
        </aside>

        <div className='col-span-8'>
          <form className='flex flex-col space-y-5' action={createBookMark}>
            <div>
              <label htmlFor='title'>TITLE</label>
              <input type='text' id='url' name='title' />
            </div>
            <div>
              <label htmlFor='url'>URL</label>
              <input type='text' id='url' name='url' />
            </div>
            <div>
              <label htmlFor='decscription'>decscription</label>
              <input type='text' id='decscription' name='desc' />
            </div>

            <button>send it</button>
          </form>
        </div>
      </div>
    </main>
  );
}
