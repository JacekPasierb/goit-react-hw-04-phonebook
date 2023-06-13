import { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import css from "./AppStyle.module.css";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import PropTypes from "prop-types";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("contacts"));

    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (id, name, number) => {
    const isName = contacts.some((contact) => contact.name === name);
    if (isName) {
      alert("Kontakt o tej nazwie już istnieje!");
      return;
    }

    const newContact = { id, name, number };
    setContacts((prev) => [...prev, newContact]);
  };

  const deleteContact = (id) => {
    const actualContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(actualContacts);
  };

  const changeFilter = (e) => setFilter(e.target.value);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter changeFilter={changeFilter} />
      <ContactList
        contacts={contacts}
        filter={filter.toLowerCase()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  addContact: PropTypes.func,
  deleteContact: PropTypes.func,
};
