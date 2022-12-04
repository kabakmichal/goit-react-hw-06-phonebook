import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const json = localStorage.getItem('contacts');
    if (json === null) {
      localStorage.setItem(
        'contacts',
        JSON.stringify([
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ])
      );

      const parseBegin = JSON.parse(localStorage.getItem('contacts'));
      return parseBegin;
    } else {
      const parseContacts = JSON.parse(json);
      return parseContacts;
    }
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const newContacts = contacts;
    const json = JSON.stringify(newContacts);
    localStorage.setItem('contacts', json);
  }, [contacts]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const newContact = { id: nanoid(6), name: name, number: number };
    const nameArray = contacts.map(({ name }) => name);
    if (nameArray.includes(name)) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts(oldContacts => [...oldContacts, newContact]);
      form.reset();
    }
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  const onFilter = () => {
    const newArray = contacts.filter(contact => {
      const valueToLow = filter.toLowerCase();
      return contact.name.toLowerCase().includes(valueToLow);
    });
    return newArray;
  };

  const onDelete = contactID => {
    const index = contacts.findIndex(contact => contact.id === contactID);
    for (const element of contacts) {
      if (contacts.indexOf(element) !== index) {
        setContacts(contacts.filter((contact, ind) => ind !== index));
      } else {
        setContacts([]);
      }
    }
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        fontSize: 20,
        color: 'black',
        padding: '20px 10px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} handleChange={handleChange} />
      <ContactList onDelete={onDelete} filterArray={onFilter} />
    </div>
  );
};
