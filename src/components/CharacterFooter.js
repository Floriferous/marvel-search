import React from 'react';
import PropTypes from 'prop-types';

const CharacterFooter = ({ name }) => (
  <div className="footer">
    <h3>{name}</h3>
  </div>
);

CharacterFooter.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CharacterFooter;
