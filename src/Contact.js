import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

class Contact extends Component {

  render() {
    return (
      <Link to={`/contacts/${this.props.contact.id}`}>
        <div className="Contact">
          <div>{ this.props.contact.firstname }</div>
          <div>{ this.props.contact.lastname }</div>
          <div>{ this.props.contact.email }</div>
        </div>
      </Link>
    );
  }
}

export default Contact;
