import { Prisma } from '@prisma/client';

export type Tag = {
  id: number;
  label: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BookmarkResponse = Prisma.BookmarkCreateInput;
