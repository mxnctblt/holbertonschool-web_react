import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import AppContext from './AppContext';

class App extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    logOut: PropTypes.func
  };

  static defaultProps = {
    isLoggedIn: false,
    logOut: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      }
    };
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault();
      alert('Logging you out');
      this.props.logOut();
    }
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  }

  logIn(email, password) {
    this.setState({
      user: {
        email: email,
        password: password,
        isLoggedIn: true
      }
    });
  }

  logOut() {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      }
    });
  }

  render() {
    const { displayDrawer } = this.state; 

    return (
      <AppContext.Provider
        value={{ user: this.state.user, logOut: this.logOut }}
      >
        <>
            <Notifications
            displayDrawer={displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
            listNotifications={this.listNotifications}
          />
            <div className={css(styles.app)}>
            <Header />
            {this.state.user.isLoggedIn ? (
              <BodySectionWithMarginBottom title='Course list'>
                <CourseList listCourses={this.listCourses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title='Log in to continue'>
                <Login logIn={this.logIn} />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title='News from the School'>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et neque ex. Praesent eleifend, augue at tincidunt viverra, est metus congue neque, ut bibendum massa ex vel elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et neque ex. Praesent eleifend, augue at tincidunt viverra, est metus congue neque, ut bibendum massa ex vel elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et neque ex. Praesent eleifend, augue at tincidunt viverra, est metus congue neque, ut bibendum massa ex vel elit.</p>
            </BodySection>
            <Footer />
          </div>
        </>
      </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '98vh'
  },
});

export default App;
