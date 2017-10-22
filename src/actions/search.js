import * as api from '../api';

export const createSearchKey = (search, pagination) =>
  `${search}-${pagination}`;

export const fetchCharacters = ({
  dispatch, getState, search, pagination,
}) => {
  const { searchResults } = getState();
  const searchKey = createSearchKey(search, pagination);

  if (searchResults && searchResults[searchKey]) {
    return Promise.resolve();
  }

  return api.fetchCharacters(search).then((characters) => {
    dispatch({ type: 'ADD_SEARCH_RESULTS', searchKey, characters });
  });
};

export const changeSearch = search => (dispatch, getState) => {
  dispatch({ type: 'CHANGE_SEARCH', search });

  if (search) {
    return fetchCharacters({
      dispatch,
      getState,
      search,
      pagination: getState().pagination,
    });
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

  return fetchCharacters({
    dispatch,
    getState,
    pagination,
    search: getState().search,
  });
};
