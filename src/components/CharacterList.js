import React from 'react';
import PropTypes from 'prop-types';

import Empty from './Empty';

const CharacterList = ({ characters }) => {
  if (!characters || characters.length === 0) {
    return <Empty />;
  }

  return <div className="character-list">List!</div>;
};

CharacterList.propTypes = {};

export default CharacterList;
