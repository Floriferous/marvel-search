import React from 'react';
import PropTypes from 'prop-types';

import CharacterListContainer from './CharacterListContainer';
import Character from './Character';
import Empty from './Empty';
import Loading from './Loading';

const CharacterList = ({ characters, isSearching, toggleBookmark }) => {
  if (isSearching && !characters) {
    return <Loading />;
  } else if (characters.length === 0) {
    return <Empty isSearching={isSearching} />;
  }

  return (
    <ul className="character-list">
      {characters.map(character => (
        <Character
          key={character.id}
          character={character}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </ul>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object),
  isSearching: PropTypes.bool.isRequired,
  toggleBookmark: PropTypes.func.isRequired,
};

CharacterList.defaultProps = {
  characters: undefined,
};

export default CharacterListContainer(CharacterList);
