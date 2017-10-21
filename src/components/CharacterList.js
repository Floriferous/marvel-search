import React from 'react';
import PropTypes from 'prop-types';

import CharacterListContainer from './CharacterListContainer';
import Character from './Character';
import Empty from './Empty';
import Loading from './Loading';

const CharacterList = ({ characters, isSearching }) => {
  if (isSearching && !characters) {
    return <Loading />;
  }
  if (characters.length === 0) {
    return <Empty isSearching={isSearching} />;
  }

  return (
    <div className="character-list">
      {characters.map(character => (
        <Character key={character.id} {...character} />
      ))}
    </div>
  );
};

CharacterList.propTypes = {};

export default CharacterListContainer(CharacterList);
