import React from 'react';

import { testComponent } from '../../utils/testing';
import InputContainer from '../InputContainer';

describe('InputContainer', () => {
  const div = () => <div />;
  const wrapper = InputContainer(div);
  const initialStore = { search: 'test' };
  const component = () => testComponent(wrapper, {}, initialStore);
  beforeEach(() => {
    testComponent.reset();
  });

  it('passes search to the component', () => {
    expect(component().find('div').length).toBe(1);
    expect(component()
      .find('div')
      .props().search).toBe(initialStore.search);
  });

  it('passes the search action creators to the component', () => {
    expect(component()
      .find('div')
      .props().changeSearch).toBeDefined();
    expect(component()
      .find('div')
      .props().changePagination).toBeDefined();
  });
});
