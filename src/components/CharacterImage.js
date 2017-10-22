import React from 'react';
import PropTypes from 'prop-types';

export const createImageSource = (path, extension) => {
  const imageSize = 'portrait_uncanny';

  return `${path}/${imageSize}.${extension}`;
};

const CharacterImage = ({ path, extension }) => (
  <div
    className="image"
    style={{ backgroundImage: `url(${createImageSource(path, extension)})` }}
  />
);

CharacterImage.propTypes = {
  path: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired,
};

export default CharacterImage;
