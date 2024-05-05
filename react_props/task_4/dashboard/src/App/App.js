import React from 'react';
import PropTypes from 'prop-types';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import './App.css';

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
