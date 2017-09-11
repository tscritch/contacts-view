import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Spin, Button } from 'antd';
import './ContactView.css';

class ContactView extends Component {

  state = {
    contact: {},
    isLoading: true
  };

  componentDidMount() {
    return fetch(`https://sibi-db-tadscritch.herokuapp.com/contacts/${this.props.match.params.id}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({
          contact: { ...data },
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="ContactView">

        <Link to={'/'}>
          <Button type="primary" ghost shape="circle" icon="left" />
        </Link>

        { this.state.isLoading ? <Spin></Spin> : null }

        <div>
          { this.state.contact.firstname }
        </div>

      </div>
    );
  }
}

export default ContactView;
