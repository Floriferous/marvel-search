import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { getValueAtKey } from '../utils/localStorage';
import rootReducer from '../reducers';

const configureStore = (testInitialStore) => {
  const bookmarks = getValueAtKey('bookmarks') || {};

  return createStore(
    rootReducer,
    testInitialStore || { bookmarks },
    applyMiddleware(thunk, createLogger()),
  );
};

export default configureStore;
