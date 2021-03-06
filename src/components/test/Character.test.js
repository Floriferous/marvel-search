import { testComponent } from '../../utils/testing';
import Character from '../Character';

describe('Character', () => {
  let props;
  const component = () => testComponent(Character, props);

  beforeEach(() => {
    props = {
      character: {
        isBookmarked: false,
        name: 'superman',
        thumbnail: { path: 'test', extension: 'test2' },
      },
      toggleBookmark: jest.fn(),
    };
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    expect(component()).toMatchSnapshot();
  });

  it('renders a list item with class character', () => {
    expect(component().find('li').length).toBe(1);
    expect(component()
      .find('li')
      .hasClass('character')).toBe(true);
  });

  it('renders a div with class content, and not bookmarked', () => {
    expect(component().find('div').length).toBe(1);
    expect(component()
      .find('div')
      .props().className).toBe('content');
  });

  it('renders a div with class bookmarked when isBookmarked is true', () => {
    props.character.isBookmarked = true;
    expect(component()
      .find('div')
      .hasClass('bookmarked')).toBe(true);
  });

  describe('the list item', () => {
    let listItem;
    beforeEach(() => {
      listItem = component()
        .find('li')
        .first()
        .shallow();
    });

    it('renders a CharacterBookmarkHelper with prop isBookmarked', () => {
      expect(listItem.find('CharacterBookmarkHelper').length).toBe(1);
      expect(listItem.find('CharacterBookmarkHelper').length).toBe(1);
    });

    describe('the content div', () => {
      let div;
      beforeEach(() => {
        div = listItem
          .find('div')
          .first()
          .shallow();
      });

      it('contains the CharacterImage', () => {
        expect(div.find('CharacterImage').length).toBe(1);
      });

      it('contains the CharacterFooter', () => {
        expect(div.find('CharacterFooter').length).toBe(1);
      });
    });
  });

  it('calls toggleBookmark when the div is clicked with character as argument', () => {
    component()
      .find('.content')
      .simulate('click');
    expect(props.toggleBookmark).toHaveBeenCalledWith(props.character);
  });

  it('passes isBookmarked to the CharacterBookmarkHelper', () => {
    expect(component()
      .find('CharacterBookmarkHelper')
      .props().isBookmarked).toBe(props.character.isBookmarked);
  });

  it('passes name to CharacterImage', () => {
    expect(component()
      .find('CharacterImage')
      .props().name).toBe(props.character.name);
  });

  it('passes name to CharacterFooter', () => {
    expect(component()
      .find('CharacterFooter')
      .props().name).toBe(props.character.name);
  });

  it('passes the entire thumbnail to CharacterImage', () => {
    Object.keys(props.character.thumbnail).forEach((key) => {
      expect(component()
        .find('CharacterImage')
        .props()[key]).toBe(props.character.thumbnail[key]);
    });
  });
});
