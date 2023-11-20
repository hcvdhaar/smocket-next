import { createBookmark } from '../actions/bookmark.actions';

export const UrlSubmitForm = () => {
  return (
    <form action={createBookmark}>
      <input type='text' name='url' />
    </form>
  );
};

/**
 * TODO:
 * - Rename this component to something descriptive
 */
