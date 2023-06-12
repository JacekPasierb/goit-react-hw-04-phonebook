import { useState } from "react";
import css from "./ContactFormStyle.module.css";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const changeName = (e) => setName(e.target.value);
  const changeNumber = (e) => setNumber(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = nanoid();
    addContact(id, name, number);
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.contactForm}>
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={changeName}
          value={name}
        />
      </label>
      <label>
        <span>Number</span>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={changeNumber}
          value={number}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
