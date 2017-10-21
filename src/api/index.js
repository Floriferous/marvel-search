import keys from '../config/API_KEY';
import constants from '../config/constants';

const endpoint = 'https://gateway.marvel.com/v1/public/characters';

/**
 * getQuery - Given an object of query parameters, returns a string with
 * the parameters chained together
 *
 * @param {Object} params must be { paramName: paramValue }
 *
 * @return {String}
 */
const getQuery = params =>
  `?${Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')}`;

const getUrl = (search, pagination) =>
  endpoint +
  getQuery({
    apikey: keys.public,
    nameStartsWith: search,
    orderBy: 'name',
    limit: constants.CHARACTERS_PER_PAGE,
    offset: pagination * constants.CHARACTERS_PER_PAGE || 0,
  });

const fetchCharacters = (search, pagination) =>
  fetch(getUrl(search, pagination), {
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then(json => json.data);

export default fetchCharacters;
