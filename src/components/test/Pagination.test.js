import { testComponent } from '../../utils/testing';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  let props;
  const component = () => testComponent(Pagination, props);

  beforeEach(() => {
    props = {
      showNext: true,
      pagination: 1,
      decrementPagination: jest.fn(),
      incrementPagination: jest.fn(),
    };
    testComponent.reset();
  });

  it('renders a div with class pagination', () => {
    expect(component().find('div').length).toBe(1);
    expect(component()
      .find('div')
      .hasClass('pagination')).toBe(true);
  });

  it('renders a p tag with class pagination and pagination incremented by 1', () => {
    expect(component().find('p').length).toBe(1);
    expect(component()
      .find('p')
      .hasClass('value')).toBe(true);
    expect(component()
      .find('p')
      .first()
      .text()).toBe(`${props.pagination + 1}`);
  });

  describe('when pagination equals 0', () => {
    beforeEach(() => {
      props.pagination = 0;
    });

    it('renders one button with class increment', () => {
      expect(component().find('button').length).toBe(1);
      expect(component()
        .find('button')
        .first()
        .hasClass('increment')).toBe(true);
    });
  });

  describe('when pagination is larger than 0 and showNext is false', () => {
    beforeEach(() => {
      props.pagination = 1;
      props.showNext = false;
    });

    it('renders one button with class increment', () => {
      expect(component().find('button').length).toBe(1);
      expect(component()
        .find('button')
        .first()
        .hasClass('decrement')).toBe(true);
    });
  });

  describe('when pagination is larger than 0', () => {
    it('renders two buttons with classes increment and decrement', () => {
      expect(component().find('button').length).toBe(2);
      expect(component().find('.increment').length).toBe(1);
      expect(component().find('.decrement').length).toBe(1);
    });
  });

  it('calls decrementPagination when the .decrement button is clicked', () => {
    component()
      .find('.decrement')
      .first()
      .simulate('click');
    expect(props.decrementPagination).toHaveBeenCalled();
  });

  it('calls incrementPagination when the .increment button is clicked', () => {
    component()
      .find('.increment')
      .simulate('click');
    expect(props.incrementPagination).toHaveBeenCalled();
  });
});
