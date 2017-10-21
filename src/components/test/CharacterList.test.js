import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from '../../utils/testing';
import CharacterList from '../CharacterList';

describe('CharacterList', () => {
  let component;

  beforeEach(() => {
    component = props => shallow(<CharacterList {...props} />);
  });

  // it('matches its snapshot', () => {
  //   const tree = renderer.create(<CharacterList />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('renders Empty if no characters are provided', () => {
    expect(component({ characters: null }).find('Empty').length).toBe(1);
  });
});
