import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from '../../utils/testing';
import App from '../App';

describe('App', () => {
  let component;
  beforeEach(() => {
    component = () => shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders a Provider', () => {
    expect(component().find('Provider').length).toBe(1);
  });

  describe('the Provider', () => {
    let Provider;
    beforeEach(() => {
      Provider = component().find('Provider');
    });

    it('is given 2 props', () => {
      expect(Object.keys(Provider.props()).length).toBe(2);
    });

    it('is given a store prop', () => {
      expect(Provider.props().store).toBeDefined();
    });

    it('is given HomePage as a child', () => {
      expect(Provider.props().children).toBeDefined();
    });
  });
});
