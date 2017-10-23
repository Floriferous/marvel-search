import keys from '../config/API_KEY';
import constants from '../config/constants';

export const endpoint = 'https://gateway.marvel.com/v1/public/characters';

/**
 * getQuery - Given an object of query parameters, returns a string with
 * the parameters chained together
 *
 * @param {Object} params must be { paramName: paramValue }
 *
 * @return {String}
 */
export const createQuery = params =>
  (params
    ? `?${Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')}`
    : '');

export const createUrl = (search, pagination) =>
  endpoint +
  createQuery({
    apikey: keys.public,
    nameStartsWith: search,
    orderBy: 'name',
    limit: constants.CHARACTERS_PER_PAGE,
    offset: pagination * constants.CHARACTERS_PER_PAGE || 0,
  });

export const fetchCharacters = (search, pagination) =>
  fetch(createUrl(search, pagination), {
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    })
    .then(json => json.data && json.data)
    // Turns each query from 55kB to ~5kB
    .then(({ results, total }) => ({
      total,
      characters: results.map(({ name, id, thumbnail }) => ({
        name,
        id,
        thumbnail,
      })),
    }));
