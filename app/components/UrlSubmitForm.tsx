import { createBookmark } from '../actions/bookmark.actions';
import { BaseButton } from './BaseButton/BaseButton';
import { BaseInput } from './BaseInput/BaseInput';

export const UrlSubmitForm = () => {
  return (
    <form action={createBookmark} className='flex gap-2'>
      <BaseInput placeholder='Gimme an url and see the magic...' name='url' />
      <BaseButton type='submit'>Create bookmark</BaseButton>
    </form>
  );
};
