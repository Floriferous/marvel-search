import { testComponent } from '../../utils/testing';
import CharacterListHelper from '../CharacterListHelper';

describe('CharacterListHelper', () => {
  let props;
  const component = () => testComponent(CharacterListHelper, props);

  beforeEach(() => {
    props = { isSearching: false };
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

  it('renders different test based on isSearching prop', () => {
    const text1 = component()
      .find('p')
      .text();
    testComponent.reset();
    props.isSearching = true;
    const text2 = component()
      .find('p')
      .text();

    expect(text1.length).toBeGreaterThan(0);
    expect(text2.length).toBeGreaterThan(0);
    expect(text1).not.toBe(text2);
  });
});
