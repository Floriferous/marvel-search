import React from 'react';

import { testComponent } from '../../utils/testing';
import PaginationContainer from '../PaginationContainer';

describe('PaginationContainer', () => {
  const div = () => <div />;
  const wrapper = PaginationContainer(div);
  const initialStore = { pagination: 100 };
  const component = () => testComponent(wrapper, {}, initialStore);
  beforeEach(() => {
    testComponent.reset();
  });

  it('passes pagination to the component', () => {
    expect(component().find('div').length).toBe(1);
    expect(component()
      .find('div')
      .props().pagination).toBe(initialStore.pagination);
  });

  it('passes the required pagination action creators to the component', () => {
    expect(component()
      .find('div')
      .props().decrementPagination).toBeDefined();
    expect(component()
      .find('div')
      .props().incrementPagination).toBeDefined();
  });
});
