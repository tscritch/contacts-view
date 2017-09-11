import React, { Component } from 'react';
import { Layout } from 'antd';
import ContactList from './ContactList';
import logo from './sibi.png';
import './App.css';

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header>
            <img src={logo} style={{ height: "100%" }} alt="logo"></img>
          </Header>
          <Content>
            <ContactList></ContactList>
          </Content>
        </Layout>
      </div>

    );
  }
}

export default App;
