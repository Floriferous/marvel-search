import pagination, { initialState } from '../pagination';

describe('pagination reducer', () => {
  it('returns initial state with no action', () => {
    expect(pagination(undefined, {})).toEqual(initialState);
  });

  it('handles CHANGE_PAGINATION', () => {
    const action = { type: 'CHANGE_PAGINATION', pagination: 2 };
    expect(pagination(initialState, action)).toEqual(action.pagination);
    expect(pagination('anything', action)).toEqual(action.pagination);
  });

  it('handles RESET_PAGINATION', () => {
    const action = { type: 'RESET_PAGINATION' };
    expect(pagination(initialState, action)).toEqual(initialState);
    expect(pagination('anything', action)).toEqual(initialState);
  });
});
