import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  maringRight: {
    marginRight: '1rem',
  },
});

const Login = () => {
  return (
    <>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={css(styles.maringRight)}
          ></input>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className={css(styles.maringRight)}
          ></input>
          <button type="button">OK</button>
        </form>
      </div>
    </>
  );
};

export default Login;
