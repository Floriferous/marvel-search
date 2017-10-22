import { testComponent } from '../../utils/testing';
import HomePage from '../HomePage';

describe('HomePage', () => {
  const component = () => testComponent(HomePage, {}, true);

  beforeEach(() => {
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    expect(component()).toMatchSnapshot();
  });

  it('renders a main as its root', () => {
    expect(component().find('main').length).toBe(1);
  });

  it('renders an h1, Input, CharacterList, and Disclaimer');
  // , () => {
  //   expect(component().find('h1').length).toBe(1);
  //   expect(component().find('Input').length).toBe(1);
  //   expect(component().find('CharacterList').length).toBe(1);
  //   expect(component().find('Disclaimer').length).toBe(1);
  // });
});
