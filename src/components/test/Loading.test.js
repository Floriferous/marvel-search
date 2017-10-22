import { testComponent } from '../../utils/testing';
import Loading from '../Loading';

describe('Loading', () => {
  let props;
  const component = () => testComponent(Loading, props);

  beforeEach(() => {
    props = {};
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    expect(component()).toMatchSnapshot();
  });

  it('renders a p with some text', () => {
    expect(component().find('p').length).toBe(1);
    expect(component()
      .find('p')
      .text().length).toBeGreaterThan(0);
  });
});
