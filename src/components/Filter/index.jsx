import styles from './Filter.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/contacts/selectors';
import { handleFilter } from 'redux/contacts/contactSlice';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(handleFilter(e.target.value));
  };

  return (
    <label className={styles.label}>
      Find contacts by Name
      <input
        className={styles.input}
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
      />
    </label>
  );
};
