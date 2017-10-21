import React from 'react';
import PropTypes from 'prop-types';

const createImageSource = (path, extension) => {
  const imageSize = 'portrait_uncanny';

  return `${path}/${imageSize}.${extension}`;
};

const CharacterImage = ({ path, extension, name }) => (
  <div
    className="image"
    style={{ backgroundImage: `url(${createImageSource(path, extension)})` }}
  />
);

CharacterImage.propTypes = {};

export default CharacterImage;
