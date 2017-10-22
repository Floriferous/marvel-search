import fetch from 'node-fetch';
import { fetchCharacters, createQuery, createUrl, endpoint } from '../index';

global.fetch = fetch;

describe('marvel API', () => {
  describe('fetchCharacters', () => {
    let search;
    let pagination;

    it('returns a list of characters');
    // FIXME MARVEL throws a weird '409: Conflict' error here
    // might be related to testing environment which uses node-fetch
    // It is already tested (though not fully) in the search action creator tests with mocks

    // search = 'sp';
    // pagination = 0;
    // return fetchCharacters(search, pagination).then((characters) => {
    //   expect(characters).toBeDefined();
    // });
  });

  describe('createUrl', () => {
    it('returns a url with the minimum required components', () => {
      expect(createUrl().indexOf(endpoint)).toBe(0);
      expect(createUrl().indexOf('apikey')).toBeGreaterThan(0);
      expect(createUrl().indexOf('nameStartsWith')).toBeGreaterThan(0);
    });
  });

  describe('createQuery', () => {
    it('returns an empty string if params is not defined', () => {
      expect(createQuery()).toBe('');
    });

    it('returns a string with http query params', () => {
      expect(createQuery({ param: 'test' })).toBe('?param=test');
      expect(createQuery({ param: 'test', param2: 'test2' })).toBe('?param=test&param2=test2');
    });
  });
});
