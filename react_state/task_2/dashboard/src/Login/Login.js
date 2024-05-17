import React, { useState } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (emailValue.trim() !== '' && password.trim() !== '') {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  };

  const handleChangePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (passwordValue.trim() !== '' && email.trim() !== '') {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <p>You are logged in!</p>
      ) : (
        <div className="App-body">
          <p>Login to access the full dashboard</p>
          <form onSubmit={handleLoginSubmit}>
            <div className={css(styles.small, styles.inline)}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className={css(styles.margin)}
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            <div className={css(styles.small, styles.inline)}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className={css(styles.margin)}
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <input
              className={css(styles.small, styles.inline)}
              type="submit"
              value="OK"
              disabled={!enableSubmit}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
