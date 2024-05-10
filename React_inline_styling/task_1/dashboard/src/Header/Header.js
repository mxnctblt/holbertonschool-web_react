import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  AppHeader: {
    borderBottom: '5px solid rgb(201, 45, 45)',
    display: 'flex',
    alignItems: 'center',
    color: 'rgb(201, 45, 45)',
    fontSize: '1.8rem',
  },
  AppLogo: {
    width: '300px',
  },
});

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>School dashboard</h1>
    </header>
  );
};

export default Header;
