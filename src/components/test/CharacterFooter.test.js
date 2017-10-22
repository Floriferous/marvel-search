import React from 'react';
import renderer from 'react-test-renderer';

import { testComponent } from '../../utils/testing';
import CharacterFooter from '../CharacterFooter';

describe('CharacterFooter', () => {
  let props;
  const component = () => testComponent(CharacterFooter, props);

  beforeEach(() => {
    props = { name: 'batman' };
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    const tree = renderer.create(<CharacterFooter />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a div with class footer', () => {
    expect(component().find('div').length).toBe(1);
    expect(component()
      .find('div')
      .hasClass('footer')).toBe(true);
  });

  describe('the div', () => {
    let div;

    beforeEach(() => {
      div = component()
        .find('div')
        .shallow();
    });

    it('contains an h3 with name in it', () => {
      expect(div.find('h3').length).toBe(1);
      expect(div.find('h3').text()).toBe(props.name);
    });
  });
});
