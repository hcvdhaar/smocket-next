'use client';
import React from 'react';
import { BookmarkResponse } from '../../types/bookmark.type';
import Image from 'next/image';
import { deleteBookmark } from '../../actions/bookmark.actions';

async function deleteBookmarkItem(id: string) {
  await deleteBookmark(id);
}

export function Bookmarks({ data = [] }: { data: BookmarkResponse[] }) {
  return (
    <div className='border-1.5 h-full space-y-5'>
      {data &&
        data.map((bookmark, index) => (
          <div key={bookmark.id} className='border-cyan-600 border-1.5 p-4'>
            <div className='flex justify-between'>
              {/* Card Header */}
              <h3 className='font-bold'>{bookmark.title}</h3>
              <button className='border-2 border-gray-500 rounded-md p-5 py-2 '>
                edit
              </button>

              <button
                className='border-2 border-red-500 rounded-md p-5 py-2 '
                onClick={() => deleteBookmarkItem(bookmark.id!)}
              >
                delete
              </button>
            </div>
            <p>{bookmark.description}</p>

            {bookmark.defaultImageUrl && (
              <Image
                src={bookmark.defaultImageUrl}
                width={300}
                height={250}
                quality={75}
                alt={bookmark.title}
                priority={index < 6}
              />
            )}

            <a href={bookmark.url} target='_blank'>
              Go to Article
            </a>
          </div>
        ))}
    </div>
  );
}

/**
 * TODO:
 * - Check this (optimizing) warning: https://nextjs.org/learn-pages-router/seo/web-performance/lcp
 *   -> For now set priority for the first 6 images
 */
