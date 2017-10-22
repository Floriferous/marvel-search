import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import * as bookmarks from '../bookmarks';
import * as storage from '../../utils/localStorage';

jest.mock('../../utils/localStorage', () => ({
  saveValueAtKey: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('bookmarks action creators', () => {
  let store;
  const characters = [{ id: 0 }];
  beforeEach(() => {
    store = mockStore({ bookmarks: {} });
    fetchMock.mock('*', {
      body: { data: { results: characters } },
      status: 200,
      sendAsJson: true,
    });
  });

  describe('toggleBookmark', () => {
    it('adds a bookmark when it does not exist', () => {
      const newBookmark = { id: 'test' };
      const expectedActions = [
        { character: { id: 'test' }, type: 'ADD_BOOKMARK' },
      ];
      store.dispatch(bookmarks.toggleBookmark(newBookmark));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('removes a bookmark when it exists', () => {
      store = mockStore({ bookmarks: { test: {} } });
      const newBookmark = { id: 'test' };
      const expectedActions = [{ id: 'test', type: 'REMOVE_BOOKMARK' }];
      store.dispatch(bookmarks.toggleBookmark(newBookmark));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('calls saveValueAtKey', () => {
      const newBookmark = { id: 'test' };
      store.dispatch(bookmarks.toggleBookmark(newBookmark));
      expect(storage.saveValueAtKey).toBeCalled();
    });
  });
});
