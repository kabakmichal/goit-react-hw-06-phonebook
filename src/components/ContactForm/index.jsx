import styles from './ContactForm.module.css';
import React from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contactSlice';
import { getItems } from 'redux/contacts/selectors';
import { findAllInRenderedTree } from 'react-dom/test-utils';

export const ContactForm = () => {
  let elementId = nanoid();
  const dispatch = useDispatch();
  const items = useSelector(getItems);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const nameArray = items.map(item => item.name);
    if (nameArray.includes(name)) {
      return findAllInRenderedTree(`${name} is already in contacts`);
    }
    dispatch(addContact(name, number));
    form.reset();
  };

  return (
    <form className={styles.form} htmlFor={elementId} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          id={elementId}
          className={styles.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          id={elementId}
          className={styles.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={styles.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};
