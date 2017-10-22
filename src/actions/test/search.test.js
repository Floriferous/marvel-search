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

  describe('changeSearch', () => {
    it('dispatches changeSearch and adds returned results to the proper search key', () => {
      const newSearch = 'a';
      const expectedActions = [
        { search: newSearch, type: 'CHANGE_SEARCH' },
        {
          characters,
          searchKey: `${newSearch}-0`,
          type: 'ADD_SEARCH_RESULTS',
        },
      ];
      return store.dispatch(search.changeSearch(newSearch)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('when search is an empty string', () => {
      const newSearch = '';

      it('resets pagination if search is an empty string', () => {
        const expectedActions = [
          { search: '', type: 'CHANGE_SEARCH' },
          { type: 'RESET_PAGINATION' },
        ];
        return store.dispatch(search.changeSearch(newSearch)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('returns a promise', () => {
        expect(typeof store.dispatch(search.changeSearch(newSearch)).then).toBe('function');
      });
    });

    describe('when a search cache exists', () => {
      beforeEach(() => {
        store = mockStore({
          search: '',
          pagination: 0,
          searchResults: { 'a-0': [] },
        });
      });

      it('does not dispatch ADD_SEARCH_RESULTS', () => {
        const newSearch = 'a';
        const expectedActions = [{ search: 'a', type: 'CHANGE_SEARCH' }];
        return store.dispatch(search.changeSearch(newSearch)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('it returns a promise', () => {
        const newSearch = 'a';
        expect(typeof store.dispatch(search.changeSearch(newSearch)).then).toBe('function');
      });
    });
  });

  describe('changePagination', () => {
    it('dispatches changePagination and adds returned results', () => {
      const newPagination = 1;
      const expectedActions = [
        { pagination: newPagination, type: 'CHANGE_PAGINATION' },
        {
          characters,
          searchKey: `-${newPagination}`,
          type: 'ADD_SEARCH_RESULTS',
        },
      ];
      return store.dispatch(search.changePagination(newPagination)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('throws if pagination is not a number', () => {
      expect(() => search.changePagination('')()).toThrow('should be a number');
    });
  });
});
