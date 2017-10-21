import React from 'react';
import PropTypes from 'prop-types';

import CharacterImage from './CharacterImage';
import CharacterFooter from './CharacterFooter';
import CharacterBookmarkHelper from './CharacterBookmarkHelper';

const Character = (props) => {
  const {
    character: { name, thumbnail, isBookmarked },
    toggleBookmark,
  } = props;

  return (
    <li className="character">
      <div
        className={`content${isBookmarked ? ' bookmarked' : ''}`}
        onClick={() => toggleBookmark(props.character)}
      >
        <CharacterImage name={name} {...thumbnail} />
        <CharacterFooter name={name} />
      </div>
      <CharacterBookmarkHelper isBookmarked={isBookmarked} />
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
    isBookmarked: PropTypes.bool.isRequired,
  }).isRequired,
  toggleBookmark: PropTypes.func.isRequired,
};

export default Character;
