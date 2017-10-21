import React from 'react';
import PropTypes from 'prop-types';

import CharacterImage from './CharacterImage';
import CharacterFooter from './CharacterFooter';

const Character = ({ name, thumbnail }) => (
  <li className="character">
    <div className="content">
      <CharacterImage name={name} {...thumbnail} />
      <CharacterFooter name={name} />
    </div>
    <p className="helper">Click to bookmark</p>
  </li>
);

Character.propTypes = {};

export default Character;
