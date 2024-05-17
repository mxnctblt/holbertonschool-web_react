import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    this.props.logIn(this.state.email, this.state.password);
  }

  handleChangeEmail(event) {
    const newEmail = event.target.value;
    this.setState({ email: newEmail }, () => {
        if (this.state.email !== "" && this.state.password !== "") {
            this.handleEnableSubmit(true);
        } else {
            this.handleEnableSubmit(false);
        }
    });
  }

  handleChangePassword(event) {
    const newPassword = event.target.value;
    this.setState({ password: newPassword }, () => {
        if (this.state.email !== "" && this.state.password !== "") {
            this.handleEnableSubmit(true);
        } else {
            this.handleEnableSubmit(false);
        }
    });
  }

  handleEnableSubmit(isEnabled) {
      this.setState({enableSubmit: isEnabled});
  }

  render() {
    return (
      <form onSubmit={this.handleLoginSubmit}>
        <div className={css(styles.small, styles.inline)}>
          <p>Login to access the full dashboard</p>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            className={css(styles.marginRight)}
            value={this.state.email}
            onChange={this.handleChangeEmail}
          ></input>
        </div>
        <div className={css(styles.small, styles.inline)}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className={css(styles.marginRight)}
            value={this.state.password}
            onChange={this.handleChangePassword}
          ></input>
        </div>
        <input type="submit" value="OK" disabled={!this.state.enableSubmit} />
      </form>
    );
  }
}

const styles = StyleSheet.create({
  marginRight: {
      marginRight: '1rem'
  },
  inline: {
      display: 'inline-block'
  },
  small: {
      '@media (max-width: 900px)': {
          display: 'block',
      }
  }
});

export default Login;
