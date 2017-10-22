import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { testComponent } from '../../utils/testing';
import App from '../App';

describe('App', () => {
  const component = () => testComponent(App);

  beforeEach(() => {
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
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
