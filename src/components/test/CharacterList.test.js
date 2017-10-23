import { testComponent } from '../../utils/testing';
import ConnectedCharacterList, { CharacterList } from '../CharacterList';

describe('CharacterList', () => {
  let props;
  const component = () => testComponent(CharacterList, props, true);

  beforeEach(() => {
    props = {
      isSearching: false,
      toggleBookmark: jest.fn(),
      showPagination: false,
    };
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    expect(component()).toMatchSnapshot();
  });

  it('renders Loading if user is currently searching and no characters are provided', () => {
    props.isSearching = true;
    expect(component().find('Loading').length).toBe(1);
  });

  describe('when characters is an empty array', () => {
    beforeEach(() => {
      props.characters = [];
    });

    it('renders Empty if user is currently searching', () => {
      props.isSearching = true;
      expect(component().find('Empty').length).toBe(1);
    });

    it('it passes isSearching to Empty', () => {
      props.isSearching = false;
      expect(component()
        .find('Empty')
        .props().isSearching).toBe(props.isSearching);
    });
  });

  it('renders Empty if no characters are provided', () => {
    props.characters = null;
    expect(component().find('Empty').length).toBe(1);
  });

  // FIXME: Unable to properly test the existence of connected components
  it('does not render Pagination if showPagination is false');
  // , () => {
  //   props.showPagination = false;
  //   expect(component().find(Pagination).length).toBe(0);
  // });

  it('renders Pagination if showPagination is true');
  // , () => {
  // props.showPagination = true;
  // expect(component().find(Pagination).length).toBe(1);
  // });

  describe('when characters is a non empty array', () => {
    beforeEach(() => {
      props.characters = [
        { id: 'test1', name: 'superman' },
        { id: 'test2', name: 'superman' },
      ];
    });

    it('renders a div with character-list class', () => {
      expect(component().find('div').length).toBe(1);
      expect(component()
        .find('div')
        .hasClass('character-list')).toBe(true);
    });

    describe('the div', () => {
      let div;

      beforeEach(() => {
        div = component()
          .find('div')
          .shallow();
      });

      it('renders a ul', () => {
        expect(div.find('ul').length).toBe(1);
      });

      it('renders a CharacterListHelper', () => {
        expect(div.find('CharacterListHelper').length).toBe(1);
      });
    });

    it('renders one Character per character', () => {
      expect(component().find('Character').length).toBe(props.characters.length);
    });

    it('passes isSearching to CharacterListHelper', () => {
      expect(component()
        .find('CharacterListHelper')
        .props().isSearching).toBe(props.isSearching);
    });

    describe('each Character', () => {
      let characters;
      beforeEach(() => {
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
