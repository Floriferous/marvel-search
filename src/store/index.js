import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const configureStore = () =>
  createStore(rootReducer, applyMiddleware(thunk, createLogger()));

export default configureStore;
