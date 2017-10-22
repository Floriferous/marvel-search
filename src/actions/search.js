import * as api from '../api';
import getClosestSearchResults from '../utils/getClosestSearchResults';

export const shouldSearchAgain = (newSearch, closestResults) => {
  if (closestResults) {
    if (closestResults.length === 0) {
      return false;
    }

    const names = closestResults.map(character => character.name);
    const allNamesStillMatch = names.every(name => name.indexOf(newSearch) === 0);
    if (allNamesStillMatch) {
      return false;
    }
  }

  return true;
};

export const createSearchKey = (search, pagination) =>
  `${search}-${pagination}`;

export const fetchCharacters = (dispatch, getState) => {
  const { search, pagination, searchResults } = getState();
  const searchKey = createSearchKey(search, pagination);

  // exact results exist
  if (searchResults && searchResults[searchKey]) {
    return Promise.resolve();
  }
  const { characters: closestResults } = getClosestSearchResults(
    searchResults,
    search,
    pagination,
  );

  // Don't perform additional searches if the closest result is empty
  if (
    searchResults &&
    Object.keys(searchResults).length > 0 &&
    !shouldSearchAgain(search, closestResults)
  ) {
    return Promise.resolve();
  }

  return api.fetchCharacters(search).then((characters) => {
    dispatch({ type: 'ADD_SEARCH_RESULTS', searchKey, characters });
  });
};

export const changeSearch = search => (dispatch, getState) => {
  dispatch({ type: 'CHANGE_SEARCH', search });

  if (search) {
    return fetchCharacters(dispatch, getState);
  }
  dispatch({ type: 'RESET_PAGINATION' });

  return Promise.resolve();
};

export const changePagination = pagination => (dispatch, getState) => {
  if (typeof pagination === 'number') {
    dispatch({ type: 'CHANGE_PAGINATION', pagination });
  } else {
    throw new Error('pagination should be a number');
  }

  return fetchCharacters(dispatch, getState);
};
