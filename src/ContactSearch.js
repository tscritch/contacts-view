import React, { Component } from 'react';
import { Input } from 'antd';
import './ContactSearch.css';
const Search = Input.Search;

class ContactSearch extends Component {

  handleSearch = (e) => {
    this.props.handleSearch(e.target.value);
  }

  render() {

    return (
      <div className="ContactSearch">
        <Search placeholder="search for contact" style={{ width: '400px' }} onChange={ this.handleSearch } disabled={ this.props.isDisabled }></Search>
      </div>

    );
  }
}

export default ContactSearch;
