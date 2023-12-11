import { Chip } from '@nextui-org/react';
import { Prisma } from '@prisma/client';
import React from 'react';

export interface TagsProps {
  tags: Prisma.TagCreateInput[];
}

export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className='flex gap-2 flex-wrap '>
      {tags?.map((tag) => (
        <Chip key='tag' variant='flat' color='warning'>
          {tag.name}
        </Chip>
      ))}
    </div>
  );
};
