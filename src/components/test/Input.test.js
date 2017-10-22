import React from 'react';
import renderer from 'react-test-renderer';

import { testComponent } from '../../utils/testing';
import { Input } from '../Input';

describe('Input', () => {
  let props;
  const component = () => testComponent(Input, props);

  beforeEach(() => {
    props = { value: '', onChange: () => {} };
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an input', () => {
    expect(component().find('input').length).toBe(1);
  });
});
