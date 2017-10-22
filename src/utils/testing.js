import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import configureStore from '../store';

Enzyme.configure({ adapter: new Adapter() });

export const testComponent = (Component, props, withStore) => {
  if (!testComponent.shallowComponent) {
    if (withStore) {
      const store = configureStore();
      testComponent.shallowComponent = Enzyme.shallow(
        <Component {...props} />,
        { context: store },
      );
    } else {
      testComponent.shallowComponent = Enzyme.shallow(<Component {...props} />);
    }
  }
  return testComponent.shallowComponent;
};

testComponent.reset = () => {
  testComponent.shallowComponent = undefined;
};

export const { shallow, mount, render } = Enzyme;
export default Enzyme;
