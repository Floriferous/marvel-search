import React from 'react';
import PropTypes from 'prop-types';

import CharacterListContainer from './CharacterListContainer';
import Character from './Character';
import Empty from './Empty';
import Loading from './Loading';
import CharacterListHelper from './CharacterListHelper';
import Pagination from './Pagination';

export const CharacterList = ({
  characters,
  isSearching,
  toggleBookmark,
  showPagination,
  showNext,
}) => {
  if (isSearching && !characters) {
    return <Loading />;
  } else if (!characters || characters.length === 0) {
    return <Empty isSearching={isSearching} />;
  }

  return (
    <div className="character-list">
      <CharacterListHelper isSearching={isSearching} />
      <ul>
        {characters.map(character => (
          <Character
            key={character.id}
            character={character}
            toggleBookmark={toggleBookmark}
          />
        ))}
      </ul>
      {showPagination && <Pagination showNext={showNext} />}
    </div>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.objectOf(PropTypes.any),
  isSearching: PropTypes.bool.isRequired,
  toggleBookmark: PropTypes.func.isRequired,
  showPagination: PropTypes.bool.isRequired,
};

CharacterList.defaultProps = {
  characters: undefined,
};

export default CharacterListContainer(CharacterList);
