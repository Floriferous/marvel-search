import searchResults, { initialState } from '../searchResults';

describe('searchResults reducer', () => {
  it('returns initial state with no action', () => {
    expect(searchResults(undefined, {})).toEqual(initialState);
  });

  it('handles ADD_SEARCH_RESULTS', () => {
    const action = {
      type: 'ADD_SEARCH_RESULTS',
      searchKey: 'test',
      characters: [{ id: 'testId' }],
    };
    expect(searchResults(initialState, action)).toEqual({
      [action.searchKey]: action.characters,
    });
  });
});
