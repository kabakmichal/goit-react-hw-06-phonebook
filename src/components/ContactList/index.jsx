import styles from './ContactList.module.css';
import { Contact } from 'components/Contact';
import { useSelector } from 'react-redux';
import { getFilter, getItems } from 'redux/contacts/selectors';

const filteredItems = (items, filter) => {
  if (filter === '') return items;
  const filterArray = items.filter(item => {
    const filtered = filter.toLowerCase();
    return item.name.toLowerCase().includes(filtered);
  });
  return filterArray;
};

export const ContactList = () => {
  const items = useSelector(getItems);
  const filter = useSelector(getFilter);
  const visibleItems = filteredItems(items, filter);

  return (
    <ul className={styles.list}>
      {visibleItems.map(contact => (
        <li key={contact.id} className={styles.item}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};
