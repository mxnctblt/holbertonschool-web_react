import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  'App-header': {
    borderBottom: `5px rgb(201, 45, 45) solid`,
    display: 'flex',
    alignItems: 'center',
    color: `rgb(201, 45, 45)`,
    fontSize: `1.8rem`,
    '@media (max-width: 900px)': {
      fontSize: '1rem',
    },
  },
  'App-logo': {
    width: 300,
    '@media (max-width: 900px)': {
      width: 150,
    },
  },
});

const Header = () => {
  return (
    <header className={css(styles['App-header'])}>
      <img src={logo} className={css(styles['App-logo'])} alt="logo" />
      <h1>School dashboard</h1>
    </header>
  );
};

export default Header;
