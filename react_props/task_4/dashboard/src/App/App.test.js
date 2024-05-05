import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import CourseList from '../CourseList/CourseList';

describe('tests for App component', () => {
  it('should render without crashing', () => {
    shallow(<App />);
  });

  it('should render the Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Notifications />)).toBe(true);
  });

  it('should render the Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Footer />)).toBe(true);
  });

  it('should render the Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Header />)).toBe(true);
  });

  it('should render the Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Login />)).toBe(true);
  });

  it('should not render the CourseList componenet', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CourseList).length).toBe(0);
  });
});

describe('tests for App component when logged in', () => {
  it('should not render the Login component', () => {
    const wrapper = shallow(<App isLoggedIn />);
    expect(wrapper.find(Login).length).toBe(0);
  });

  it('should render the CourseList component', () => {
    const wrapper = shallow(<App isLoggedIn />);
    expect(wrapper.find(CourseList).length).toBe(1);
  });
});
