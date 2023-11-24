import { createBookmark } from '../actions/bookmark.actions';
import { BaseInput } from './BaseInput/BaseInput';

export const UrlSubmitForm = () => {
  return (
    <form action={createBookmark}>
      <BaseInput placeholder='Gimme an url and see the magic...' name='url' />
    </form>
  );
};
