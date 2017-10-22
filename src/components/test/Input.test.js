import { testComponent } from '../../utils/testing';
import { Input } from '../Input';

describe('Input', () => {
  let props;
  const component = () => testComponent(Input, props);

  beforeEach(() => {
    props = { value: '', onChange: () => {} };
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    expect(component()).toMatchSnapshot();
  });

  it('renders an input', () => {
    expect(component().find('input').length).toBe(1);
  });
});
