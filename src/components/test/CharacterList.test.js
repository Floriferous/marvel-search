import React from 'react';
import renderer from 'react-test-renderer';

import { testComponent } from '../../utils/testing';
import ConnectedCharacterList, { CharacterList } from '../CharacterList';

describe('CharacterList', () => {
  let props;
  const component = () => testComponent(CharacterList, props);

  beforeEach(() => {
    props = {};
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    const tree = renderer.create(<CharacterList {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Loading if user is currently searching and no characters are provided', () => {
    props = { isSearching: true };
    expect(component().find('Loading').length).toBe(1);
  });

  describe('when characters is an empty array', () => {
    beforeEach(() => {
      props = { characters: [] };
    });

    it('renders Empty if user is currently searching', () => {
      props.isSearching = true;
      expect(component().find('Empty').length).toBe(1);
    });

    it('it passes isSearching to Empty', () => {
      props.isSearching = 'test';
      expect(component()
        .find('Empty')
        .props().isSearching).toBe(props.isSearching);
    });
  });

  it('renders Empty if no characters are provided', () => {
    props = { characters: null };
    expect(component().find('Empty').length).toBe(1);
  });

  describe('when characters is a non empty array', () => {
    beforeEach(() => {
      props = { characters: [{ id: 'test1' }, { id: 'test2' }] };
    });

    it('renders a list with character-list class', () => {
      expect(component().find('ul').length).toBe(1);
      expect(component()
        .find('ul')
        .hasClass('character-list')).toBe(true);
    });

    it('renders one Character per character', () => {
      expect(component().find('Character').length).toBe(props.characters.length);
    });

    describe('each Character', () => {
      let characters;
      beforeEach(() => {
        props.toggleBookmark = 'testFunc';
        characters = component().find('Character');
      });

      it('is passed the character id as a key', () => {
        characters.forEach((c, i) => {
          expect(c.key()).toBe(props.characters[i].id);
        });
      });

      it('is passed the character as a prop', () => {
        characters.forEach((c, i) => {
          expect(c.props().character).toBe(props.characters[i]);
        });
      });

      it('is passed toggleBookmark as a prop', () => {
        characters.forEach((c) => {
          expect(c.props().toggleBookmark).toBe(props.toggleBookmark);
        });
      });
    });
  });
});
