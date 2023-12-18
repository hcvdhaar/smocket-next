'use client';

import Image from 'next/image';
import {
  deleteBookmark,
  updateBookmarkWithTags,
} from '@/app/actions/bookmark.actions';
import { BookmarkResponse } from '@/app/types/bookmark.type';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Chip,
} from '@nextui-org/react';
import { Tags } from '../Tags/Tags';
import { useState } from 'react';

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

  const [selectedId, setSelectedId] = useState<string>();

  const [tagsInput, setTagsInput] = useState<string>('');

  const openModel = (id: string) => {
    setSelectedId(id);
    onOpen();
  };

  const onUpdateWithTags = () => {
    console.log(selectedId);
    updateBookmarkWithTags({
      bookmarkId: selectedId!,
      tags: tagsInput.split(','),
    });
  };

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

      <Tags tags={bookmark.tags as any} />

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
        </div>
      )}
      <div className='flex gap-4 justify-end'>
        <Button
          size='sm'
          color='default'
          variant='bordered'
          aria-label='Add a tag'
          className='text-white opacity-50 hover:opacity-100'
          onPress={() => openModel(bookmark.id!)}
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
                  placeholder='Enter a tag, when multiple separate with comma'
                  variant='bordered'
                  className='text-dark'
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button
                  color='primary'
                  onPress={() => {
                    onUpdateWithTags();
                    onClose();
                  }}
                >
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
