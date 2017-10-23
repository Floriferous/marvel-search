import { mapStateToProps } from '../CharacterListContainer';
import constants from '../../config/constants';

describe('CharacterListContainer', () => {
  describe('mapStateToProps', () => {
    let store;

    beforeEach(() => {
      store = {
        search: '',
        pagination: 0,
        searchResults: {
          'test-0': { characters: [{ id: 0 }], total: 6 },
          'a-0': { characters: [{ id: 0 }] },
        },
        bookmarks: { 10: { name: 'hello', id: 10 } },
      };
    });

    it('returns an isSearching boolean', () => {
      expect(mapStateToProps(store).isSearching).toBe(false);
      store.search = 'a';
      expect(mapStateToProps(store).isSearching).toBe(true);
    });

    it('returns showPagination to be false if total is smaller than CHARACTERS_PER_PAGE', () => {
      store.search = 'a';
      expect(mapStateToProps(store).showPagination).toBe(false);
    });

    it('returns showPagination to be true if total is larger than CHARACTERS_PER_PAGE', () => {
      store.search = 'a';
      store.searchResults['a-0'].total = constants.CHARACTERS_PER_PAGE + 1;
      expect(mapStateToProps(store).showPagination).toBe(true);
    });

    describe('when search is an empty string', () => {
      it('returns bookmarks as an array and adds isBookmarked to each character', () => {
        expect(mapStateToProps(store).characters).toEqual([
          { ...store.bookmarks[10], isBookmarked: true },
        ]);
      });
    });

    describe('when the current search results exist', () => {
      beforeEach(() => {
        store.search = 'a';
      });

      it('returns the characters for a search if they exist', () => {
        expect(mapStateToProps(store).characters).toEqual([
          { ...store.searchResults['a-0'].characters[0], isBookmarked: false },
        ]);
      });

      it('returns isLoading to be false', () => {
        expect(mapStateToProps(store).isLoading).toBe(false);
      });
    });

    describe('when the current search results have not fetched yet', () => {
      beforeEach(() => {
        store.search = 'test1';
      });
      it('returns the closest search if it exists', () => {
        // the results from 'test'
        expect(mapStateToProps(store).characters).toEqual([
          {
            ...store.searchResults['test-0'].characters[0],
            isBookmarked: false,
          },
        ]);
      });

      it('returns isLoading to be true', () => {
        expect(mapStateToProps(store).isLoading).toBe(true);
      });
    });
  });
});
