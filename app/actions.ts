'use server';

import prisma from '@/libs/db';
import { Prisma } from '@prisma/client';
import { getLinkPreview } from 'link-preview-js';
import { LinkPreviewResponseType } from './types';
import { revalidatePath } from 'next/cache';

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

// TODO: It seems it does not parse (redirects) to Medium articles.
export async function createBookmark(formData: FormData) {
  const url = (formData.get('url') as string) ?? '';

  // TODO: Better error handling.
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

  console.log('response', response);

  if (response) {
    revalidatePath('/');
  }
}
