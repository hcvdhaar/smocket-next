'use server';

import React from 'react';
import { BookmarkItem } from '../BookmarkItem';
import { getBookMarks } from '@/app/actions/bookmark.actions';

export async function Bookmarks() {
  const { data } = await getBookMarks();

  return (
    <div className='grid grid-cols-12 gap-4'>
      {data ? (
        data.map((bookmark, index) => (
          <BookmarkItem
            key={bookmark.id}
            bookmark={bookmark as any}
            index={index}
          />
        ))
      ) : (
        <div>No bookmarks found</div>
      )}
    </div>
  );
}

/**
 * - Check this (optimizing) warning: https://nextjs.org/learn-pages-router/seo/web-performance/lcp
 *   -> For now set priority for the first 6 images
 */
