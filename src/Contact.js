import React, { Component } from 'react';
import './Contact.css';

class Contact extends Component {

  render() {
    return (
      <div className="Contact">
        <div>{ this.props.contact.firstname }</div>
        <div>{ this.props.contact.lastname }</div>
        <div>{ this.props.contact.email }</div>
      </div>
    );
  }
}

export default Contact;
