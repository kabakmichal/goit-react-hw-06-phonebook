import styles from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ onDelete, filterArray }) => {
  return (
    <ul className={styles.list}>
      {filterArray().map(contact => (
        <li key={contact.id} className={styles.item}>
          <span className={styles.paragraph}>
            {contact.name}: {contact.number}
          </span>
          <button
            type="button"
            className={styles.btn}
            onClick={() => onDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  filterArray: PropTypes.func.isRequired,
};
