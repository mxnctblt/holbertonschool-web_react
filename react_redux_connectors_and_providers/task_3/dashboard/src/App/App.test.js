import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { App, mapStateToProps } from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils } from 'aphrodite';
import { defaultUser } from './AppContext';
import { fromJS } from 'immutable';

describe('App component', () => {
  let wrapper;
  let store;
  const mockStore = configureStore([]);
  const initialState = fromJS({
    isUserLoggedIn: false,
    isNotificationDrawerVisible: false,
    user: defaultUser,
  });

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    store = mockStore(initialState);
    wrapper = shallow(<App
      isLoggedIn={false}
      displayDrawer={false}
      user={defaultUser}
      logOut={jest.fn()}
      displayNotificationDrawer={jest.fn()}
      hideNotificationDrawer={jest.fn()}
    />);
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('contains the Notifications component', () => {
    expect(wrapper.find(Notifications).exists()).toBe(true);
  });

  it('contains the Header component', () => {
    expect(wrapper.find(Header).exists()).toBe(true);
  });

  it('contains the Login component when not logged in', () => {
    expect(wrapper.find(Login).exists()).toBe(true);
  });

  it('does not display CourseList when not logged in', () => {
    expect(wrapper.find(CourseList).exists()).toBe(false);
  });

  it('contains the Footer component', () => {
    expect(wrapper.find(Footer).exists()).toBe(true);
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      wrapper.setProps({
        isLoggedIn: true,
        user: {
          email: 'test@example.com',
          password: 'password',
          isLoggedIn: true,
        },
      });
    });

    it('does not include the Login component when logged in', () => {
      expect(wrapper.find(Login).exists()).toBe(false);
    });

    it('includes the CourseList component when logged in', () => {
      expect(wrapper.find(CourseList).exists()).toBe(true);
    });
  });

  describe('keydown event tests for logout', () => {
    const keyDownEvent = (ctrlKey, key) => {
      return new KeyboardEvent('keydown', { ctrlKey, key, bubbles: true });
    };

    it('calls logOut and shows alert when Ctrl+H is pressed', () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      document.dispatchEvent(keyDownEvent(true, 'h'));
      expect(wrapper.instance().props.user).toEqual(defaultUser);
      expect(alertMock).toHaveBeenCalledWith('Logging you out');
      alertMock.mockRestore();
    });
  });
});

describe('mapStateToProps', () => {
  it('should return the correct object', () => {
    let state = fromJS({
      isUserLoggedIn: true,
      isNotificationDrawerVisible: false,
      user: defaultUser,
    });
    const expectedProps = {
      isLoggedIn: true,
      displayDrawer: false,
      user: defaultUser,
    };
    expect(mapStateToProps(state).user.toJS()).toEqual(expectedProps.user); // Conversion de Immutable Map en objet JS
    expect(mapStateToProps(state).isLoggedIn).toEqual(expectedProps.isLoggedIn);
    expect(mapStateToProps(state).displayDrawer).toEqual(expectedProps.displayDrawer);
  });
});

