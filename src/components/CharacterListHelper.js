import React from 'react';
import PropTypes from 'prop-types';

const CharacterListHelper = ({ isSearching }) => (
  <h3 className="helper">
    {isSearching
      ? 'Click on the characters to add them to your bookmarks'
      : 'Your bookmarks'}
  </h3>
);

CharacterListHelper.propTypes = {
  isSearching: PropTypes.bool.isRequired,
};

export default CharacterListHelper;
