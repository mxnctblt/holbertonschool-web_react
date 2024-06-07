import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import logo from "../assets/holberton-logo.jpg";
import { AppContext } from "../App/AppContext";

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    color: '#e11d3f',
    fontFamily: '"Times New Roman", Times, serif',
  },
  h1: {
    margin: '0px',
    padding: '30px',
    flexGrow: '1',
    fontSize: '3rem',
  },
  img: {
    maxHeight: '260px',
    marginRight: '1rem',
  },
  hr: {
    color: 'red',
    backgroundColor: 'red',
    height: '0.1rem',
    minWidth: '100%',
  },
  log: {
    position: 'absolute',
    right: '22px',
    top: '14rem',
    fontSize: '20px',
  },
});

class Header extends Component {
  static contextType = AppContext;

  render() {
    const { user, logOut } = this.context;
    return (
      <>
        <header className={css(styles.header)}>
          <img src={logo} className={css(styles.img)} alt="Holberton Logo" />
          <h1 className={css(styles.h1)}>School dashboard</h1>
        </header>
        {user.isLoggedIn && (
          <section id="logoutSection">
            <p className={css(styles.log)}>Welcome {user.email} (<a href="#logout" onClick={logOut}> logout </a>)</p>
          </section>
        )}
        <hr className={css(styles.hr)} />
      </>
    );
  }
}

export default Header;
