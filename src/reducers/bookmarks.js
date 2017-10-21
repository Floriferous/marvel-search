const initialState = {};

const bookmarks = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return { ...state, [action.character.id]: action.character };
    case 'REMOVE_BOOKMARK': {
      const { [action.id]: deletedItem, ...rest } = state;
      return rest;
    }
    default:
      return state;
  }
};

export default bookmarks;
