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

type ActionResponse<DataType> = {
  data: DataType | null;
  error: { message: string } | null;
};

function createResponse<DataType>(
  data: DataType | null,
  errorMessage: string | null
): ActionResponse<DataType> {
  const error = errorMessage ? { message: errorMessage } : null;

  return {
    data,
    error,
  };
}

async function handleRequest<T>(dbAction: (args?: any) => Promise<T>) {
  try {
    const response = await dbAction();

    return createResponse(response, null);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createResponse(null, error.message);
    }

    return createResponse(null, 'Something went wrong');
  }
}

// Get all bookmarks
export async function getBookMarks(): Promise<
  ActionResponse<Prisma.BookmarkCreateInput[] | null>
> {
  return handleRequest(prisma.bookmark.findMany);
}

// Get a single bookmark
export async function getBookMark(id: string) {
  try {
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        id,
      },
    });

    return createResponse(bookmark, null);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createResponse(null, error.message);
    }

    return createResponse(null, 'Something went wrong');
  }
}

// Create a bookmark
export async function createBookmark(formData: FormData) {
  const url = (formData.get('url') as string) ?? '';

  if (url === '') {
    return createResponse(null, 'Bookmark URL is required');
  }

  try {
    const preview = (await getLinkPreview(url)) as LinkPreviewResponseType;
    const bookmark = bookmarkFactory(preview);
    const response = await prisma.bookmark.create({ data: bookmark });

    if (response) {
      revalidatePath('/');
    }

    return createResponse(response, null);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createResponse(null, error.message);
    }

    return createResponse(null, 'Something went wrong');
  }
}

// Update a bookmark
// TODO: Some proper error handling
export async function updateBookmark(id: string, formData: FormData) {
  const preview = {} as LinkPreviewResponseType;

  const bookmark = bookmarkFactory(preview);
  const response = await prisma.bookmark.update({
    where: {
      id,
    },
    data: bookmark,
  });

  if (response) {
    revalidatePath('/');
  }
}

// Delete a bookmark
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
