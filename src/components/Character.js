import React from 'react';
import PropTypes from 'prop-types';

import CharacterImage from './CharacterImage';
import CharacterFooter from './CharacterFooter';

const Character = ({ name, thumbnail }) => (
  <li className="character">
    <CharacterImage name={name} {...thumbnail} />
    <CharacterFooter name={name} />
  </li>
);

Character.propTypes = {};

export default Character;
