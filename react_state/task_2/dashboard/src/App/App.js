import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotifications } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import WithLogging from '../HOC/WithLogging';
import { StyleSheet, css } from 'aphrodite';

const coursesData = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const notificationData = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotifications() } },
];

const styles = StyleSheet.create({
  app: {
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTop: 'solid #e11d3f',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
    };
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  handleKey = (e) => {
    if (e.ctrlKey && e.key == 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  }

  render() {
    const { displayDrawer } = this.state;
    return (
      <>
        <WithLogging>
          <Notifications displayDrawer={displayDrawer} handleDisplayDrawer={this.handleDisplayDrawer} handleHideDrawer={this.handleHideDrawer} />
        </WithLogging>
        <div className={css(styles.App)}>
          <Header />
          <div className={css(styles.body)}>
            {!this.props.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                nec sem vel nulla tristique commodo. Nam consequat luctus elit,
                eget feugiat velit ultrices quis. Integer ullamcorper, sapien
                sit amet malesuada consequat, libero quam ultricies mi, eget
                lacinia felis mauris sed ipsum.
              </p>
            </BodySection>
          </div>
          <div className={css(styles.footer)}>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {},
};

export default App;
