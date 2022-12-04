import styles from './Filter.module.css';
import PropTypes from 'prop-types';
import React from 'react';

export const Filter = ({ value, handleChange }) => {
  return (
    <label className={styles.label}>
      Find contacts by Name
      <input
        className={styles.input}
        type="text"
        name="filter"
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
