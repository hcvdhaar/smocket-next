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
export async function getBookMarks() {
  try {
    const bookmark = await prisma.bookmark.findMany({
      include: {
        tags: true,
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
    const response = await prisma.bookmark.create({
      data: {
        ...bookmark,
        tags: {
          create: [{ name: 'Angular' }, { name: 'OOP Design Patterns' }],
        },
      },
    });

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

export async function updateBookmarkWithTags({
  bookmarkId,
  tags,
}: {
  bookmarkId: string;
  tags: string[];
}) {
  const requestCreateTags = tags.map((tag) => {
    return {
      name: tag,
    };
  });

  const bookmark = await prisma.bookmark.update({
    where: {
      id: bookmarkId,
    },
    data: {
      tags: {
        create: requestCreateTags,
      },
    },
  });

  if (bookmark) {
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

export async function deleteTagOnBookmark({
  bookmarkId,
  tagId,
}: {
  bookmarkId: string;
  tagId: string;
}) {
  const response = await prisma.bookmark.update({
    where: {
      id: bookmarkId,
    },
    data: {
      tags: {
        delete: {
          id: tagId,
        },
      },
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
    tags: undefined,
    categories: [],
    imageUrls: linkPreview.images,
    defaultImageUrl: linkPreview.images[0],
  };
}
