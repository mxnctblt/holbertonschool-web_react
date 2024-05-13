import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  margin: {
    marginRight: '1rem',
    marginLeft: '1rem',
  },
  inline: {
    display: 'inline-block'
  },
  small: {
    '@media (max-width: 900px)': {
      display: 'block',
      marginBottom: '1rem',
    },
  },
});

const Login = () => {
  return (
    <>
      <div className="App-body" >
        <p>Login to access the full dashboard</p>
        <form>
          <div className={css(styles.small, styles.inline)} >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className={css(styles.margin)}
            ></input>
          </div>
          <div className={css(styles.small, styles.inline)} >
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className={css(styles.margin)}
            ></input>
          </div>
          <button className={css(styles.small, styles.inline)} type="button">OK</button>
        </form>
      </div>
    </>
  );
};

export default Login;
