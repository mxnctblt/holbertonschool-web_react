import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import Notifications from "../Notifications/Notifications";
import Login from "../Login/Login";
import Header from "../Header/Header";
import CourseList from "../CourseList/CourseList";
import Footer from "../Footer/Footer";
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import { AppContext, defaultUser, defaultLogOut } from './AppContext';
import { connect } from 'react-redux';
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout } from '../actions/uiActionCreators';

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 }
];

const initialNotifications = [
  { id: 1, value: 'New course available', type: 'default' },
  { id: 2, value: 'New resume available', type: 'urgent' },
  { id: 3, html: { __html: getLatestNotification() }, type: 'urgent' },
];

const style = StyleSheet.create({
  app: {
    fontFamily: 'Times New Roman, Times, serif',
  },
  body: {
    height: '500px',
  },
  footer: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    textAlign: 'center',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listNotifications: initialNotifications,
    };

    this.handleKey = this.handleKey.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKey);
  }

  handleKey(e) {
    if (e.ctrlKey && e.key === "h") {
      alert("Logging you out");
      this.props.logout();
    }
  }

  markNotificationAsRead(id) {
    this.setState({
      listNotifications: this.state.listNotifications.filter(notification => notification.id !== id)
    });
  }

  render() {
    const { listNotifications } = this.state;
    const { user, isLoggedIn, displayDrawer, displayNotificationDrawer, hideNotificationDrawer, login } = this.props;

    return (
      <AppContext.Provider value={{ user, logout: this.props.logout }}>
        <>
          <Notifications
            listNotifications={listNotifications}
            displayDrawer={displayDrawer}
            handleDisplayDrawer={displayNotificationDrawer}
            handleHideDrawer={hideNotificationDrawer}
            markNotificationAsRead={this.markNotificationAsRead}
          />
          <div className={css(style.app)}>
            <Header />
            <div className={css(style.body)}>
              {isLoggedIn ? (
                <BodySectionWithMarginBottom title={"Course list"}>
                  <CourseList listCourses={listCourses} />
                </BodySectionWithMarginBottom>
              ) : (
                <BodySectionWithMarginBottom title={"Log in to continue"}>
                  <Login logIn={login} />
                </BodySectionWithMarginBottom>
              )}
              <BodySection title={"News from the School"}>
                <p>Latest updates and insights from our school community.</p>
              </BodySection>
            </div>
            <div className={css(style.footer)}>
              <Footer />
            </div>
          </div>
        </>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
};

App.defaultProps = {
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  user: defaultUser,
};

export const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.getIn(['ui', 'isUserLoggedIn']),
    displayDrawer: state.getIn(['ui', 'isNotificationDrawerVisible']),
    user: state.getIn(['ui', 'user']) || defaultUser,
  };
};


const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  login: loginRequest,
  logout,
};

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
