import prisma from '@/libs/db';

export async function getAllTags() {
  const tags = await prisma.tag.findMany();

  return tags;
}

export async function deleteTag(tagId: string) {
  const response = await prisma.tag.delete({
    where: {
      id: tagId,
    },
  });
}
