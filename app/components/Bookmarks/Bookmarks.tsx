'use client';
import React from 'react';
import { BookmarkResponse } from '../../types/bookmark.type';
import { BookmarkItem } from '../BookmarkItem';

export function Bookmarks({ data = [] }: { data: BookmarkResponse[] }) {
  return (
    <div className='h-full space-y-5 grid'>
      {data &&
        data.map((bookmark, index) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} index={index} />
        ))}
    </div>
  );
}

/**
 * TODO:
 * - Check this (optimizing) warning: https://nextjs.org/learn-pages-router/seo/web-performance/lcp
 *   -> For now set priority for the first 6 images
 */
