import { combineReducers } from 'redux';

import search from './search';
import pagination from './pagination';
import searchResults from './searchResults';
import bookmarks from './bookmarks';

const rootReducer = combineReducers({
  search,
  pagination,
  searchResults,
  bookmarks,
});

export default rootReducer;
