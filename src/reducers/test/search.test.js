import search, { initialState } from '../search';

describe('search reducer', () => {
  it('returns initial state with no action', () => {
    expect(search(undefined, {})).toEqual(initialState);
  });

  it('handles CHANGE_SEARCH', () => {
    const action = { type: 'CHANGE_SEARCH', search: 'test' };
    expect(search(initialState, action)).toEqual('test');
    expect(search('anything', action)).toEqual('test');
  });

  it('handles RESET_SEARCH', () => {
    const action = { type: 'RESET_SEARCH' };
    expect(search(initialState, action)).toEqual('');
    expect(search('anything', action)).toEqual('');
  });
});
