import * as api from '../api';
import getClosestSearchResults from '../utils/getClosestSearchResults';

export const shouldSearch = (newSearch, searchResults, closestResults) => {
  if (
    searchResults &&
    Object.keys(searchResults).length > 0 &&
    closestResults &&
    closestResults.characters
  ) {
    if (closestResults.characters.length === 0) {
      return false;
    }

    const names = closestResults.characters.map(character => character.name);
    const allNamesStillMatch = names.every(name => name.indexOf(newSearch) === 0);
    if (allNamesStillMatch) {
      return false;
    }
  } else if (newSearch === '0' || newSearch === 0) {
    // this is a Marvel API bug
    return false;
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
  const { data: closestResults } = getClosestSearchResults(
    searchResults,
    search,
    pagination,
  );

  if (
    pagination === 0 &&
    !shouldSearch(search, searchResults, closestResults)
  ) {
    return Promise.resolve();
  }

  return api.fetchCharacters(search, pagination).then((data) => {
    dispatch({ type: 'ADD_SEARCH_RESULTS', searchKey, data });
  });
};

export const changeSearch = search => (dispatch, getState) => {
  dispatch({ type: 'CHANGE_SEARCH', search });
  dispatch({ type: 'RESET_PAGINATION' });

  if (search) {
    return fetchCharacters(dispatch, getState);
  }

  return Promise.resolve();
};

export const incrementPagination = () => (dispatch, getState) => {
  dispatch({ type: 'INCREMENT_PAGINATION' });
  return fetchCharacters(dispatch, getState);
};

export const decrementPagination = () => (dispatch, getState) => {
  dispatch({ type: 'DECREMENT_PAGINATION' });
  return fetchCharacters(dispatch, getState);
};
