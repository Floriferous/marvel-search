import React from 'react';
import PropTypes from 'prop-types';

import CharacterListContainer from './CharacterListContainer';
import Character from './Character';
import Empty from './Empty';

const CharacterList = ({ characters, isBookmark }) => {
  if (!characters || characters.length === 0) {
    return <Empty noSearch={isBookmark} />;
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
