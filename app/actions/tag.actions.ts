import prisma from '@/libs/db';
import { revalidatePath } from 'next/cache';

export async function deleteTag(tagId: string) {
  const response = await prisma.tag.delete({
    where: {
      id: tagId,
    },
  });
}
