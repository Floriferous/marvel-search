import React from 'react';
import PropTypes from 'prop-types';

const CharacterBookmarkHelper = ({ isBookmarked }) => (
  <p className="helper">
    {isBookmarked ? 'Click to un-bookmark' : 'Click to bookmark'}
  </p>
);

CharacterBookmarkHelper.propTypes = {
  isBookmarked: PropTypes.bool.isRequired,
};

export default CharacterBookmarkHelper;
