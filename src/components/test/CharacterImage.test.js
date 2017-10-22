import { testComponent } from '../../utils/testing';
import CharacterImage, { createImageSource } from '../CharacterImage';

describe('CharacterImage', () => {
  let props;
  const component = () => testComponent(CharacterImage, props);

  beforeEach(() => {
    props = { path: 'myPath', extension: 'jpg' };
    testComponent.reset();
  });

  it('matches its snapshot', () => {
    expect(component()).toMatchSnapshot();
  });

  it('renders a div with class image', () => {
    expect(component().find('div').length).toBe(1);
    expect(component()
      .find('div')
      .hasClass('image')).toBe(true);
  });

  it('gets a backgroundImage built from its props', () => {
    const url = createImageSource(props.path, props.extension);
    expect(component()
      .find('div')
      .props().style.backgroundImage).toEqual(`url(${url})`);
  });

  describe('createImageSource', () => {
    it('returns a url with a path, size and extension at the end', () => {
      expect(createImageSource(props.path, props.extension)).toBe('myPath/portrait_uncanny.jpg');
    });
  });
});
