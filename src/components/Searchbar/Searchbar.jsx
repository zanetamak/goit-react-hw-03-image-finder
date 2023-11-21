import { Component } from 'react';
import PropTypes from "prop-types";

import css from './Searchbar.module.css';

export class Searchbar extends Component {
  render() {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={this.props.onSubmit}>
        <button type="submit" className={css.SearchFormBtn}>
          <span className={css.SearchFormBtnLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
  }
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};