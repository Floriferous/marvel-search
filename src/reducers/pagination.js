export const initialState = 0;

const pagination = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGINATION':
      return action.pagination;
    case 'RESET_PAGINATION':
      return initialState;
    default:
      return state;
  }
};

export default pagination;
