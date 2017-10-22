import fetch from 'node-fetch';
import { fetchCharacters } from '../index';

global.fetch = fetch;

describe('marvel API', () => {
  describe('fetchCharacters', () => {
    let search;
    let pagination;

    it('returns a list of characters');
    // FIXME
    // search = 'sp';
    // pagination = 0;
    // return fetchCharacters(search, pagination).then((characters) => {
    //   expect(characters).toBeDefined();
    // });
  });
});
