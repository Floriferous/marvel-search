import { testComponent } from '../../utils/testing';
import CharacterBookmarkHelper from '../CharacterBookmarkHelper';

describe('CharacterBookmarkHelper', () => {
  let props;
  const component = () => testComponent(CharacterBookmarkHelper, props);

  beforeEach(() => {
    props = { isBookmarked: false };
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    expect(component()).toMatchSnapshot();
  });

  it('renders a p with class helper', () => {
    expect(component().find('p').length).toBe(1);
    expect(component()
      .find('p')
      .hasClass('helper')).toBe(true);
  });

  it('renders different test based on isBookmarked prop', () => {
    const text1 = component()
      .find('p')
      .text();
    testComponent.reset();
    props.isBookmarked = true;
    const text2 = component()
      .find('p')
      .text();

    expect(text1.length).toBeGreaterThan(0);
    expect(text2.length).toBeGreaterThan(0);
    expect(text1).not.toBe(text2);
  });
});
