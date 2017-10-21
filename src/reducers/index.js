import { combineReducers } from 'redux';

import search from './search';
import pagination from './pagination';
import searchResults from './searchResults';

const rootReducer = combineReducers({
  search,
  pagination,
  searchResults,
});

export default rootReducer;
