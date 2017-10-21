import { saveValueAtKey } from '../utils/localStorage';

export const toggleBookmark = character => (dispatch, getState) => {
  if (getState().bookmarks[character.id]) {
    dispatch({ type: 'REMOVE_BOOKMARK', id: character.id });
  } else {
    dispatch({ type: 'ADD_BOOKMARK', character });
  }

  saveValueAtKey('bookmarks', getState().bookmarks);
};
