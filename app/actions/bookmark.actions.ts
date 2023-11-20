'use server';

import prisma from '@/libs/db';
import { Prisma } from '@prisma/client';
import { getLinkPreview } from 'link-preview-js';
import { LinkPreviewResponseType } from '../types';
import { revalidatePath } from 'next/cache';

/**
 * TODO:
 * - Implement pagination.
 * - Zod or Yup for validation
 * - Better error handling
 * - Seperate link preview to a seperate file/lib and improve it.
 */

export async function getBookMarks() {
  const bookmarks = await prisma.bookmark.findMany();
  return bookmarks;
}

export async function createBookmark(formData: FormData) {
  const url = (formData.get('url') as string) ?? '';

  if (url === '') {
    return null;
  }

  const preview = (await getLinkPreview(url)) as LinkPreviewResponseType;
  const bookmark = bookmarkFactory(preview);
  const response = await prisma.bookmark.create({ data: bookmark });

  if (response) {
    revalidatePath('/');
  }
}

export async function deleteBookmark(id: string) {
  const response = await prisma.bookmark.delete({
    where: {
      id,
    },
  });

  if (response) {
    revalidatePath('/');
  }
}

function bookmarkFactory(
  linkPreview: LinkPreviewResponseType
): Prisma.BookmarkCreateInput {
  return {
    url: linkPreview.url,
    title: linkPreview.title,
    description: linkPreview.description,
    tags: [],
    categories: [],
    imageUrls: linkPreview.images,
    defaultImageUrl: linkPreview.images[0],
  };
}
