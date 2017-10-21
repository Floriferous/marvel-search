import React from 'react';
import PropTypes from 'prop-types';

const Empty = ({ isSearching }) => (
  <h2 className="empty">
    {isSearching
      ? "Couln't find any results for this query"
      : 'Start searching or add bookmarks to find your heroes'}
  </h2>
);

Empty.propTypes = {
  isSearching: PropTypes.bool.isRequired,
};

export default Empty;
