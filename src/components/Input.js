import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} autoFocus />
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
