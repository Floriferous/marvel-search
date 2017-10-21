import React from 'react';
import PropTypes from 'prop-types';

const createImageSource = (path, extension) => {
  const imageSize = 'portrait_medium';

  return `${path}/${imageSize}.${extension}`;
};

const CharacterImage = ({ path, extension, name }) => (
  <img src={createImageSource(path, extension)} alt={name} />
);

CharacterImage.propTypes = {};

export default CharacterImage;
