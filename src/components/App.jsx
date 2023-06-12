import React, { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import css from "./AppStyle.module.css";
import ContactList from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import PropTypes from "prop-types";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (contacts) {
      return this.setState({ contacts });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  addContact = (id, name, number) => {
    const { contacts } = this.state;

    const isName = contacts.some((contact) => contact.name === name);
    if (isName) {
      alert("Kontakt o tej nazwie już istnieje!");
      return;
    }

    const newContact = { id, name, number };
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
      filter: "",
    }));
  };
  deleteContact = (id) => {
    const { contacts } = this.state;

    const actualContacts = contacts.filter((contact) => contact.id !== id);

    this.setState({
      contacts: actualContacts,
      filter: "",
    });
  };

  changeFilter = (e) => this.setState({ filter: e.target.value });

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>

        <Filter changeFilter={this.changeFilter} />
        <ContactList
          contacts={contacts}
          filter={filter.toLowerCase()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

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
