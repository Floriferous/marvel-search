export const initialState = {};

const searchResults = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_RESULTS':
      return { ...state, [action.searchKey]: action.data };
    default:
      return state;
  }
};

export default searchResults;
