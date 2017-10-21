const initialState = 0;

const pagination = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGINATION':
      return action.search;
    default:
      return state;
  }
};

export default pagination;
