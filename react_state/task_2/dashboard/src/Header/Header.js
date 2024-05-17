import React, { Component } from 'react';
import logo from '../assets/holberton_logo.jpeg';
import { StyleSheet, css } from 'aphrodite';
import AppContext from '../App/AppContext';

class Header extends Component {
  render() {
      return (
          <>
    <header className={css(styles.AppHeader)}>
      <img src={logo} alt="holberton logo" className={css(styles.logo)}/>
      <h1>School dashboard</h1>
    </header>
    {this.context.user.isLoggedIn ? (
      <section id='logoutSection'>
        Welcome <strong>{this.context.user.email}</strong> <a onClick={() => {this.context.logOut()}}>(logout)</a>
      </section>
  ) : null}
   </>
        );
    }
}
Header.contextType = AppContext;

const styles = StyleSheet.create({
  AppHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fonSize: '1rem',
      color: '#e11d3f',
      bordeBottom: 'solid #e11d3f'
  },
    
  logo: {
      width: 250
  }
});

export default Header;
