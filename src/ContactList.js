import React, { Component } from 'react';
import { Spin, Layout } from 'antd';
import Fuse from 'fuse.js';
import ContactSearch from './ContactSearch';
import Contact from './Contact';
import './ContactList.css';

const { Content } = Layout;

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "firstname",
    "lastname"
  ]
};

class ContactList extends Component {

  contacts = [];
  fuse = {};

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchedContacts: [],
      searching: false
    }
  }



  componentDidMount() {
    return fetch('https://sibi-db-tadscritch.herokuapp.com/contacts')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.contacts = [ ...data ];
        this.fuse = new Fuse(data, fuseOptions);
        this.setState({
          isLoading: false,
          searchedContacts: [ ...data ],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fuzzySearch = (value) => {
    if (value) {
      const search = this.fuse.search(value);
      this.setState({
        searchedContacts: search,
      });
    }
    else {
      this.setState({
        searchedContacts: [ ...this.contacts ],
      });
    }
  }

  render() {
    const contacts = this.state.searchedContacts.map((c, i) => {
      return (
        <Contact contact={c} key={i}></Contact>
      );
    });

    return (
      <Content>
        <div className="ContactList">

          <h1>Contacts</h1>

          <ContactSearch handleSearch={ this.fuzzySearch } isDisabled={ this.state.isLoading }></ContactSearch>

          <div className="list">
            <div className="list-header">
              <div>First Name</div>
              <div>Last Name</div>
              <div>Email</div>
            </div>

            <div className="list-contacts">
              { this.state.isLoading ? <Spin className="loading"></Spin> : contacts }
            </div>
          </div>


        </div>
      </Content>
    );
  }
}

export default ContactList;
