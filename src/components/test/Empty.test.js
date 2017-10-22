import { testComponent } from '../../utils/testing';
import Empty from '../Empty';

describe('Empty', () => {
  let props;
  const component = () => testComponent(Empty, props);

  beforeEach(() => {
    props = { isSearching: false };
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    expect(component()).toMatchSnapshot();
  });

  it('renders a h2 with class helper', () => {
    expect(component().find('h2').length).toBe(1);
    expect(component()
      .find('h2')
      .hasClass('empty')).toBe(true);
  });

  it('renders different test based on isBookmarked prop', () => {
    const text1 = component()
      .find('h2')
      .text();
    testComponent.reset();
    props.isSearching = true;
    const text2 = component()
      .find('h2')
      .text();

    expect(text1.length).toBeGreaterThan(0);
    expect(text2.length).toBeGreaterThan(0);
    expect(text1).not.toBe(text2);
  });
});
