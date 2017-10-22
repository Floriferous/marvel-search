import React from 'react';
import PropTypes from 'prop-types';

const CharacterListHelper = ({ isSearching }) => (
  <p className="helper">
    {isSearching
      ? 'Click on the characters to add them to your bookmarks'
      : 'Your bookmarks'}
  </p>
);

CharacterListHelper.propTypes = {};

export default CharacterListHelper;
