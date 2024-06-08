import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";

const styles = StyleSheet.create({
  AppBody: {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '1.2rem',
  },
  p: {
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
    '@media (min-width: 900px)': {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  label: {
    '@media (max-width: 899px)': {
      marginRight: 'auto',
    },
  },
  input: {
    '@media (max-width: 899px)': {
      width: '20%',
    },
  },
  button: {
    cursor: 'pointer',
    '@media (max-width: 899px)': {
      width: '10%',
    },
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleChangeEmail(e) {
    const email = e.target.value;
    this.setState((prevState) => ({
      email: email,
      enableSubmit: email !== '' && prevState.password !== ''
    }));
  }

  handleChangePassword(e) {
    const password = e.target.value;
    this.setState((prevState) => ({
      password: password,
      enableSubmit: prevState.email !== '' && password !== ''
    }));
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.logIn(email, password);
  }

  render() {
    return (
      <div className={css(styles.AppBody)}>
        <p className={css(styles.p)}>Login to access the full dashboard</p>
        <form className={css(styles.form)} onSubmit={this.handleLoginSubmit}>
          <label className={css(styles.label)} htmlFor="email">Email:</label>
          <input
            className={css(styles.input)}
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
          <label className={css(styles.label)} htmlFor="password">Password:</label>
          <input
            className={css(styles.input)}
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
          <input
            className={css(styles.button)}
            type="submit"
            value="OK"
            disabled={!this.state.enableSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Login;
