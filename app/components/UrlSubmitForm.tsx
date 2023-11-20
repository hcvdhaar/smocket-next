import { createBookmark } from '../actions/bookmark.actions';

export const UrlSubmitForm = () => {
  return (
    <form action={createBookmark}>
      <input type='text' name='url' />
    </form>
  );
};
