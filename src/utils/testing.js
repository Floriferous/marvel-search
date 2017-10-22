import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

export const testComponent = (Component, props) => {
  if (!testComponent.mountedLockScreen) {
    testComponent.mountedLockScreen = Enzyme.shallow(<Component {...props} />);
  }
  return testComponent.mountedLockScreen;
};

testComponent.reset = () => {
  testComponent.mountedLockScreen = undefined;
};

export const { shallow, mount, render } = Enzyme;
export default Enzyme;
