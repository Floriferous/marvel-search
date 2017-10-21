import React from 'react';
import PropTypes from 'prop-types';

import InputContainer from './InputContainer';

const Input = ({ search, changeSearch }) => (
  <input
    type="text"
    value={search}
    onChange={event => changeSearch(event.target.value)}
    autoFocus
    placeholder="Spider-man"
  />
);

Input.propTypes = {
  search: PropTypes.string.isRequired,
  changeSearch: PropTypes.func.isRequired,
};

export default InputContainer(Input);
