import React from 'react';
import PropTypes from 'prop-types';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import './App.css';
import { getLatestNotifications } from '../utils/utils';

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

function App({ isLoggedIn = false }) {
  return (
    <>
      <Notifications />
      <div className="App">
        <Header />
        {!isLoggedIn ? <Login /> : <CourseList />}
        <Footer />
      </div>
      ;
    </>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default App;
