import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store';
import HomePage from './HomePage';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <HomePage />
  </Provider>
);

export default App;
