'use client';

import { useRef } from 'react';
import { createBookmark } from '../../actions/bookmark.actions';
import { BaseButton } from '../BaseButton/BaseButton';
import { BaseInput } from '../BaseInput/BaseInput';

const createBookmarkItem = async (formdata: FormData) => {
  const { data, error } = await createBookmark(formdata);

  console.log('response from createBookmarkItem', data);
  console.log('error?', error);
};

export const UrlSubmitForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={(formdata) => {
        createBookmarkItem(formdata);
        formRef.current?.reset();
      }}
      className='flex gap-2'
      ref={formRef}
    >
      <BaseInput placeholder='Gimme an url and see the magic...' name='url' />
      <BaseButton type='submit'>Create bookmark</BaseButton>
    </form>
  );
};
