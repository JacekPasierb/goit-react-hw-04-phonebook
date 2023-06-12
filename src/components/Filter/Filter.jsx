import css from "./FilterStyle.module.css";
import PropTypes from "prop-types";

export const Filter = ({ changeFilter }) => {
  return (
    <div className={css.filter}>
      <label className={css.label}>
        <span>Find contacts by name</span>
        <input type="text" name="filter" onChange={changeFilter} />
      </label>
    </div>
  );
};
Filter.propTypes = {
  changeFilter: PropTypes.func,
};
