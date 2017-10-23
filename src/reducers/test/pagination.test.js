import pagination, { initialState } from '../pagination';

describe('pagination reducer', () => {
  it('returns initial state with no action', () => {
    expect(pagination(undefined, {})).toEqual(initialState);
  });

  it('handles INCREMENT_PAGINATION', () => {
    const action = { type: 'INCREMENT_PAGINATION' };
    expect(pagination(initialState, action)).toEqual(initialState + 1);
  });

  it('handles DECREMENT_PAGINATION', () => {
    const action = { type: 'DECREMENT_PAGINATION' };
    expect(pagination(initialState, action)).toEqual(initialState - 1);
  });

  it('handles RESET_PAGINATION', () => {
    const action = { type: 'RESET_PAGINATION' };
    expect(pagination(initialState, action)).toEqual(initialState);
    expect(pagination('anything', action)).toEqual(initialState);
  });
});
