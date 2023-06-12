import React, { Component } from 'react';
import css from './ContactListStyle.module.css';
import PropTypes from 'prop-types';

export default class ContactList extends Component {
  formatPhoneNumber(phoneNumber) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6)}`;
  }
  render() {
    const { contacts, filter, deleteContact } = this.props;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return (
      <>
        <ul >
          {filteredContacts.map(contact => (
            <li className={css.contactItem} key={contact.id}>
              {contact.name}: {this.formatPhoneNumber(contact.number)}
              <button type="submit" onClick={() => deleteContact(contact.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  deleteContact: PropTypes.func,
};