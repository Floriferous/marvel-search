import { testComponent } from '../../utils/testing';
import Disclaimer from '../Disclaimer';

describe('Disclaimer', () => {
  let props;
  const component = () => testComponent(Disclaimer, props);

  beforeEach(() => {
    props = {};
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    expect(component()).toMatchSnapshot();
  });

  it('renders a div with class disclaimer', () => {
    expect(component().find('div').length).toBe(1);
    expect(component()
      .find('div')
      .hasClass('disclaimer')).toBe(true);
  });

  describe('the div', () => {
    let div;

    beforeEach(() => {
      div = component()
        .find('div')
        .shallow();
    });

    it('renders a p with the disclaimer', () => {
      expect(div.find('p').length).toBe(1);
      expect(div.find('p').text().length).toBeGreaterThan(0);
    });
  });
});
