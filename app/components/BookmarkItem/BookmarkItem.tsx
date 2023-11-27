'use client';

import Image from 'next/image';
import { deleteBookmark } from '@/app/actions/bookmark.actions';
import { BookmarkResponse } from '@/app/types/bookmark.type';

interface BookmarkItemProps {
  bookmark: BookmarkResponse;
  index: number;
}

async function deleteBookmarkItem(id: string) {
  await deleteBookmark(id);
}

export const BookmarkItem: React.FC<BookmarkItemProps> = ({
  bookmark,
  index,
}) => {
  return (
    <div
      key={bookmark.id}
      className='border-3 rounded-lg p-4 border-dark_gray w-full col-span-12 tablet-up:col-span-6 laptop-up:col-span-4 desktop-up:col-span-3'
    >
      <div className='flex justify-between items-center py-2'>
        <h3 className='font-bold text-lg'>{bookmark.title}</h3>

        <div className='flex gap-2'>
          <button className='border-2 border-dark_gray rounded-md p-2 py-1 text-sm'>
            edit
          </button>

          <button
            className='border-2 border-dark_gray rounded-md p-2 py-1 text-sm'
            onClick={() => deleteBookmarkItem(bookmark.id!)}
          >
            delete
          </button>
        </div>
      </div>

      {/* <p>{bookmark.description}</p> */}

      {bookmark.defaultImageUrl && (
        <Image
          src={bookmark.defaultImageUrl}
          width={300}
          height={250}
          className='rounded-lg w-full h-36 object-cover'
          quality={75}
          alt={bookmark.title}
          priority={index < 6}
        />
      )}

      <a href={bookmark.url} target='_blank'>
        Go to Article
      </a>
    </div>
  );
};
