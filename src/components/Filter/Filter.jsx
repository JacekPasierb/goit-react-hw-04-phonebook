import React, { Component } from 'react';
import css from './FilterStyle.module.css';
import PropTypes from 'prop-types';

export class Filter extends Component {
  
  render() {
    return (
      <div className={css.filter}>
        <label className={css.label}>
          <span>Find contacts by name</span>
          <input type="text" name="filter" onChange={this.props.changeFilter} />
        </label>
      </div>
    );
  }
}
Filter.propTypes = {
  onchange: PropTypes.func,
};
