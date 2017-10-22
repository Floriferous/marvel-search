export const initialState = {};

const bookmarks = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return { ...state, [action.character.id]: action.character };
    case 'REMOVE_BOOKMARK': {
      // rest spread does not work with numeric keys, so use toString
      // to avoid the error
      const { [action.id.toString()]: deletedItem, ...rest } = state;
      return rest;
    }
    default:
      return state;
  }
};

export default bookmarks;
