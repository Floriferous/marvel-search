import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

export const testComponent = (Component, props) => {
  if (!testComponent.shallowComponent) {
    testComponent.shallowComponent = Enzyme.shallow(<Component {...props} />);
  }
  return testComponent.shallowComponent;
};

testComponent.reset = () => {
  testComponent.shallowComponent = undefined;
};

export const { shallow, mount, render } = Enzyme;
export default Enzyme;
