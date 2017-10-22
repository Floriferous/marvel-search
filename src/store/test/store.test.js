import configureStore from '..';
import * as storage from '../../utils/localStorage';

jest.mock('../../utils/localStorage', () => ({
  getValueAtKey: jest.fn(),
}));

describe('configureStore', () => {
  it('does not throw', () => {
    expect(configureStore).not.toThrow();
  });

  it('returns a redux store', () => {
    const store = configureStore();
    expect(store).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
  });

  it('gets the bookmarks from localStorage', () => {
    const storedBookmarks = 'bookmarkValues';
    storage.getValueAtKey.mockReturnValueOnce(storedBookmarks);
    const store = configureStore();
    expect(storage.getValueAtKey).toBeCalled();
    expect(store.getState().bookmarks).toBe(storedBookmarks);
  });

  it('initializes bookmarks if none exist', () => {
    storage.getValueAtKey.mockReturnValueOnce(undefined);
    const store = configureStore();
    expect(store.getState().bookmarks).toEqual({});
  });
});
