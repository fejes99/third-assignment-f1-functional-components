import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends Component {
  render() {
    return (
      <input className='navbar-search' type='text' placeholder='Search...' />
    );
  }
}

export default SearchBar;
