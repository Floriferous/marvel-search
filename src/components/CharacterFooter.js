import React from 'react';
import PropTypes from 'prop-types';

const CharacterFooter = ({ name, isBookmarked }) => (
  <div className="footer">
    <h3>{name}</h3>
  </div>
);

CharacterFooter.propTypes = {};

export default CharacterFooter;