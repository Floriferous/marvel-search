import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store';
import HomePage from './HomePage';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  }
}

export default App;
