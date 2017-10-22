export const initialState = '';

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH':
      return action.search;
    case 'RESET_SEARCH':
      return initialState;
    default:
      return state;
  }
};

export default search;
