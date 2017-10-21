import React from 'react';
import PropTypes from 'prop-types';

import CharacterImage from './CharacterImage';
import CharacterFooter from './CharacterFooter';

const Character = (props) => {
  const { character: { name, thumbnail }, toggleBookmark } = props;

  return (
    <li className="character">
      <div className="content" onClick={() => toggleBookmark(props.character)}>
        <CharacterImage name={name} {...thumbnail} />
        <CharacterFooter name={name} />
      </div>
      <p className="helper">Click to bookmark</p>
    </li>
  );
};

Character.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      path: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  toggleBookmark: PropTypes.func.isRequired,
};

export default Character;
