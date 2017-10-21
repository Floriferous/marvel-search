const initialState = {};

const bookmarks = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_BOOKMARK':
      return { ...state, [action.character.id]: action.character };
    default:
      return state;
  }
};

export default bookmarks;
