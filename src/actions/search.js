import * as api from '../api';

export const createSearchKey = (search, pagination) =>
  `${search}-${pagination}`;

const fetchCharacters = (dispatch, getState) => {
  const { search, pagination, searchResults } = getState();
  const searchKey = createSearchKey(search, pagination);

  if (searchResults[searchKey]) {
    return Promise.resolve();
  }
  return api.fetchCharacters(search).then((characters) => {
    dispatch({
      type: 'ADD_SEARCH_RESULTS',
      searchKey,
      characters,
    });
  });
};

export const changeSearch = search => (dispatch, getState) => {
  dispatch({
    type: 'CHANGE_SEARCH',
    search,
  });

  if (search) {
    fetchCharacters(dispatch, getState);
  } else {
    dispatch({ type: 'RESET_PAGINATION' });
  }
};

export const changePagination = pagination => (dispatch, getState) => {
  dispatch({
    type: 'CHANGE_PAGINATION',
    pagination,
  });

  fetchCharacters(dispatch, getState);
};
