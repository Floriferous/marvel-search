import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from '../../utils/testing';
import Input from '../Input';

describe('Input', () => {
  let component;

  beforeEach(() => {
    component = props =>
      shallow(<Input value="" onChange={() => {}} {...props} />);
  });

  // it('matches its snapshot', () => {
  //   const tree = renderer.create(<Input />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('renders an input', () => {
    expect(component().find('input').length).toBe(1);
  });
});
