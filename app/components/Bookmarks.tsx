import React from 'react';
import { Bookmark } from '../types/bookmark.type';

export function Bookmarks({ data }: { data: Bookmark[] }) {
  return (
    <div className='border-1.5 h-full space-y-5'>
      {data.map((bookmark) => (
        <div key={bookmark.id} className='border-cyan-600 border-1.5 p-4'>
          {bookmark.title}
          <br />
          <br />
          {bookmark.description}
        </div>
      ))}
    </div>
  );
}
