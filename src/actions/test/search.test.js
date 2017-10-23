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
        'CHANGE_SEARCH',
        'RESET_PAGINATION',
        'ADD_SEARCH_RESULTS',
      ];
      return store.dispatch(search.changeSearch(newSearch)).then(() => {
        expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
      });
    });

    describe('when search is an empty string', () => {
      const newSearch = '';

      it('resets pagination if search is an empty string', () => {
        const expectedActions = ['CHANGE_SEARCH', 'RESET_PAGINATION'];
        return store.dispatch(search.changeSearch(newSearch)).then(() => {
          expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
        });
      });

      it('returns a promise', () => {
        expect(typeof store.dispatch(search.changeSearch(newSearch)).then).toBe('function');
      });
    });

    describe('when a search cache exists', () => {
      beforeEach(() => {
        store = mockStore({
          search: 'a',
          pagination: 0,
          searchResults: { 'a-0': { characters: [] } },
        });
      });

      it('does not dispatch ADD_SEARCH_RESULTS', () => {
        const newSearch = 'test';
        const expectedActions = ['CHANGE_SEARCH', 'RESET_PAGINATION'];
        return store.dispatch(search.changeSearch(newSearch)).then(() => {
          expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
        });
      });

      it('it returns a promise', () => {
        const newSearch = 'a';
        expect(typeof store.dispatch(search.changeSearch(newSearch)).then).toBe('function');
      });

      it('does not dispatch ADD_SEARCH_RESULTS if a previous cache is empty', () => {
        store = mockStore({
          search: 'asd',
          pagination: 0,
          searchResults: { 'a-0': { characters: [] } },
        });
        const newSearch = 'asd';
        const expectedActions = ['CHANGE_SEARCH', 'RESET_PAGINATION'];
        return store.dispatch(search.changeSearch(newSearch)).then(() => {
          expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
        });
      });

      it('does not dispatch ADD_SEARCH_RESULTS if the previous cache will return the same results', () => {
        store = mockStore({
          search: 'asd',
          pagination: 0,
          searchResults: {
            'as-0': { characters: [{ name: 'asda' }, { name: 'asdu' }] },
          },
        });
        const newSearch = 'asd';
        const expectedActions = ['CHANGE_SEARCH', 'RESET_PAGINATION'];
        return store.dispatch(search.changeSearch(newSearch)).then(() => {
          expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
        });
      });

      it('does not dispatch ADD_SEARCH_RESULTS if search is 0', () => {
        store = mockStore({ search: '0', pagination: 0, searchResults: {} });
        const newSearch = '0';
        const expectedActions = ['CHANGE_SEARCH', 'RESET_PAGINATION'];
        return store.dispatch(search.changeSearch(newSearch)).then(() => {
          expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
        });
      });

      it('does dispatch ADD_SEARCH_RESULTS if pagination is larger than 0', () => {
        store = mockStore({
          search: 'asd',
          pagination: 1,
          searchResults: { 'a-0': { characters: [] } },
        });
        const newSearch = 'asd';
        const expectedActions = [
          'CHANGE_SEARCH',
          'RESET_PAGINATION',
          'ADD_SEARCH_RESULTS',
        ];
        return store.dispatch(search.changeSearch(newSearch)).then(() => {
          expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
        });
      });

      it('does dispatch ADD_SEARCH_RESULTS if a previous cache is non-empty', () => {
        store = mockStore({
          search: 'as',
          pagination: 0,
          searchResults: { 'a-0': { characters: [{ name: 'abdul' }] } },
        });
        const newSearch = 'as';
        const expectedActions = [
          'CHANGE_SEARCH',
          'RESET_PAGINATION',
          'ADD_SEARCH_RESULTS',
        ];
        return store.dispatch(search.changeSearch(newSearch)).then(() => {
          expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
        });
      });

      it('does dispatch ADD_SEARCH_RESULTS if pagination is larger than 0, even if a better cache exists', () => {
        store = mockStore({
          search: 'asd',
          pagination: 1,
          searchResults: { 'a-1': { characters: [] } },
        });
        const newSearch = 'asd';
        const expectedActions = [
          'CHANGE_SEARCH',
          'RESET_PAGINATION',
          'ADD_SEARCH_RESULTS',
        ];
        return store.dispatch(search.changeSearch(newSearch)).then(() => {
          expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
        });
      });
    });
  });

  describe('pagination', () => {
    it('dispatches incrementPagination and adds returned results', () => {
      const newPagination = 1;
      const expectedActions = ['INCREMENT_PAGINATION', 'ADD_SEARCH_RESULTS'];
      return store
        .dispatch(search.incrementPagination(newPagination))
        .then(() => {
          expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
        });
    });

    it('dispatches decrementPagination and adds returned results', () => {
      const newPagination = 1;
      const expectedActions = ['DECREMENT_PAGINATION', 'ADD_SEARCH_RESULTS'];
      return store
        .dispatch(search.decrementPagination(newPagination))
        .then(() => {
          expect(store.getActions().map(a => a.type)).toEqual(expectedActions);
        });
    });
  });
});
