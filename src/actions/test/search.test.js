import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import * as search from '../search';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search action creators', () => {
  let store;
  const characters = [{ id: 0 }];
  beforeEach(() => {
    store = mockStore({ search: '', pagination: 0 });
    fetchMock.mock('*', {
      body: { data: { results: characters } },
      status: 200,
      sendAsJson: true,
    });
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('changePagination', () => {
    it('dispatches changePagination and adds returned results', () => {
      const expectedActions = [
        { pagination: 0, type: 'CHANGE_PAGINATION' },
        {
          characters,
          searchKey: '-0',
          type: 'ADD_SEARCH_RESULTS',
        },
      ];
      return store.dispatch(search.changePagination(0)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('throws if pagination is not a number', () => {
      expect(() => search.changePagination('')()).toThrow('should be a number');
    });
  });
});
