'use client';

import Image from 'next/image';
import { deleteBookmark } from '@/app/actions/bookmark.actions';
import { BookmarkResponse } from '@/app/types/bookmark.type';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Chip,
} from '@nextui-org/react';

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      key={bookmark.id}
      className='border-3 rounded-lg p-4 border-dark_gray w-full col-span-12 tablet-up:col-span-6 laptop-up:col-span-4 desktop-up:col-span-3 desktop-large-up:col-span-2 flex flex-col gap-4'
    >
      <div className='flex-grow'>
        <h3 className='font-bold text-lg'>
          <a
            href={bookmark.url}
            target='_blank'
            className='hover:underline decoration-2'
          >
            {bookmark.title}
          </a>
        </h3>
      </div>

      <div className='flex gap-2 flex-wrap '>
        <Chip variant='flat' color='warning'>
          JS
        </Chip>

        <Chip variant='flat' color='primary'>
          React
        </Chip>

        <Chip variant='flat' color='success'>
          Node JS
        </Chip>

        <Chip variant='flat' color='warning'>
          + Add tag
        </Chip>
      </div>

      {bookmark.defaultImageUrl && (
        <div className='flex flex-col gap-4'>
          <Image
            src={bookmark.defaultImageUrl}
            width={300}
            height={250}
            className='rounded-lg w-full h-36 object-cover'
            quality={75}
            alt={bookmark.title}
            priority={index < 6}
          />
          <div className='flex gap-4 justify-end'>
            <Button
              size='sm'
              color='default'
              variant='bordered'
              aria-label='Add a tag'
              className='text-white opacity-50 hover:opacity-100'
              onPress={onOpen}
            >
              Add a tag
            </Button>

            <Button
              size='sm'
              color='default'
              variant='bordered'
              aria-label='edit bookmark'
              className='text-white opacity-50 hover:opacity-100'
            >
              Edit
            </Button>

            <Button
              size='sm'
              color='default'
              variant='bordered'
              aria-label='delete bookmark'
              className='text-white opacity-50 hover:opacity-100 hover:text-danger hover:border-danger'
              onPress={() => deleteBookmarkItem(bookmark.id!)}
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* MODAL */}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label='Tag name'
                  placeholder='Enter a tag'
                  variant='bordered'
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
