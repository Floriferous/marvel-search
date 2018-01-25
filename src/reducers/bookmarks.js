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
    // INCREASE_BOOKMARK_POSITION
    case 'INCREASE_BOOKMARK_POSITION': {
      const index = state.findIndex(id => id === action.id);
      const newState = state.slice().filter(id => id !== action.id);
      return [
        ...newState.slice(0, index - 1),
        action.id,
        ...newState.slice(index - 1),
      ];
    }

    // DECREASE_BOOKMARK_POSITION
    default:
      return state;
  }
};

export default bookmarks;
