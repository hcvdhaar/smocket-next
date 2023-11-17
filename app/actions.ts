'use server';

import prisma from '@/libs/db';
import { Prisma } from '@prisma/client';

function bookmarkFactory(
  url: string,
  title: string,
  description: string
): Prisma.BookmarkCreateInput {
  return {
    url,
    title,
    description,
    tags: [],
    categories: [],
    imageUrls: [],
  };
}

export async function createBookMark(formData: FormData) {
  // Do some validation and error handling here
  const url = (formData.get('url') as string) ?? '';
  const title = (formData.get('title') as string) ?? '';
  const desc = (formData.get('desc') as string) ?? '';
  const bookmark = bookmarkFactory(url, title, desc);

  const response = await prisma.bookmark.create({ data: bookmark });

  console.log('createBookMark', response);
}
