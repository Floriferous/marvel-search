import React from 'react';
import PropTypes from 'prop-types';

import PaginationContainer from './PaginationContainer';

const Pagination = ({
  pagination,
  decrementPagination,
  incrementPagination,
}) => (
  <div className="pagination">
    {pagination > 0 && (
      <button className="decrement" onClick={decrementPagination}>
        Previous
      </button>
    )}
    <p className="value">{pagination + 1}</p>
    <button className="increment" onClick={incrementPagination}>
      Next
    </button>
  </div>
);

Pagination.propTypes = {
  pagination: PropTypes.number.isRequired,
  incrementPagination: PropTypes.func.isRequired,
  decrementPagination: PropTypes.func.isRequired,
};

export default PaginationContainer(Pagination);
