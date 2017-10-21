const initialState = {};

const searchResults = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_RESULTS':
      return { ...state, [action.searchKey]: action.characters };
    default:
      return state;
  }
};

export default searchResults;
