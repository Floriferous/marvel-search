import { testComponent } from '../../utils/testing';
import { Input } from '../Input';

describe('Input', () => {
  let props;
  const component = () => testComponent(Input, props);

  beforeEach(() => {
    props = { search: '', changeSearch: jest.fn() };
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    expect(component()).toMatchSnapshot();
  });

  it('renders an input', () => {
    expect(component().find('input').length).toBe(1);
  });

  it('passes search to the input value', () => {
    expect(component()
      .find('input')
      .props().value).toBe(props.search);
  });

  it('calls changeSearch on input change', () => {
    const changeValue = 'test';
    component()
      .find('input')
      .simulate('change', { target: { value: changeValue } });
    expect(props.changeSearch).toHaveBeenCalledWith(changeValue);
  });

  it('has a placeholder', () => {
    expect(component()
      .find('input')
      .props().placeholder).toBeDefined();
  });

  it('has autoFocus', () => {
    expect(component()
      .find('input')
      .props().autoFocus).toBe(true);
  });
});
