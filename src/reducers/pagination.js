export const initialState = 0;

const pagination = (state = initialState, action) => {
  switch (action.type) {
    case 'DECREMENT_PAGINATION':
      return state - 1;
    case 'INCREMENT_PAGINATION':
      return state + 1;
    case 'RESET_PAGINATION':
      return initialState;
    default:
      return state;
  }
};

export default pagination;
