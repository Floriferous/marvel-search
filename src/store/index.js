import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { getValueAtKey } from '../utils/localStorage';
import rootReducer from '../reducers';

const configureStore = (testInitialStore) => {
  const bookmarks = getValueAtKey('bookmarks') || {};

  const middleWares = [];
  middleWares.push(thunk);

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middleWares.push(logger);
  }

  return createStore(
    rootReducer,
    testInitialStore || { bookmarks },
    applyMiddleware(...middleWares),
  );
};

export default configureStore;
