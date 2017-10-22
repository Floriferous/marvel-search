import bookmarks, { initialState } from '../bookmarks';

describe('bookmarks reducer', () => {
  it('returns initial state with no action', () => {
    expect(bookmarks(undefined, {})).toBe(initialState);
  });

  it('handles ADD_BOOKMARK', () => {
    const action1 = { type: 'ADD_BOOKMARK', character: { id: 'test' } };
    const newState = bookmarks(initialState, action1);
    expect(newState).toEqual({ [action1.character.id]: action1.character });
    const action2 = { type: 'ADD_BOOKMARK', character: { id: 'test1' } };
    expect(bookmarks(newState, action2)).toEqual({
      [action1.character.id]: action1.character,
      [action2.character.id]: action2.character,
    });
  });

  it('handles REMOVE_BOOKMARK', () => {
    const state = { test: { id: 'test' }, test2: { id: 'test2' } };
    const action = { type: 'REMOVE_BOOKMARK', id: 'test' };
    expect(bookmarks(state, action)).toEqual({ test2: { id: 'test2' } });
  });
});
