import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from '../../utils/testing';
import HomePage from '../HomePage';

describe('HomePage', () => {
  let component;

  beforeEach(() => {
    component = () => shallow(<HomePage />);
  });

  // it('matches its snapshot', () => {
  //   const tree = renderer.create(<HomePage />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('renders a main as its root', () => {
    expect(component().find('main').length).toBe(1);
  });

  it('renders one h1, Input and CharacterList', () => {
    expect(component().find('h1').length).toBe(1);
    expect(component().find('Input').length).toBe(1);
    expect(component().find('CharacterList').length).toBe(1);
  });
});
