import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import ContactList from './ContactList';
import ContactView from './ContactView';
import logo from './sibi.png';
import './App.css';

const { Header } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header>
            <img src={logo} style={{ height: "90%" }} alt="logo"></img>
          </Header>
          <Route exact path="/" component={ ContactList } />
          <Route path="/contacts/:id" component={ ContactView } />
        </Layout>
      </div>

    );
  }
}

export default App;
