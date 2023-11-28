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
      className='border-3 rounded-lg p-4 border-dark_gray w-full col-span-12 tablet-up:col-span-6 laptop-up:col-span-4 desktop-up:col-span-3 desktop-large-up:col-span-2'
    >
      <div className='flex justify-between items-center py-2'>
        <h3 className='font-bold text-lg'>{bookmark.title}</h3>

        <div className='flex gap-2'>
          <Button onPress={onOpen}>edit</Button>

          <Button onClick={() => deleteBookmarkItem(bookmark.id!)}>
            delete
          </Button>
        </div>
      </div>

      {/* <p>{bookmark.description}</p> */}

      {bookmark.defaultImageUrl && (
        <Image
          src={bookmark.defaultImageUrl}
          width={300}
          height={250}
          className='rounded-lg w-full h-36 object-cover'
          quality={75}
          alt={bookmark.title}
          priority={index < 6}
        />
      )}

      <a href={bookmark.url} target='_blank'>
        Go to Article
      </a>

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
