import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils } from 'aphrodite';
import { AppContext, defaultUser } from './AppContext';
import uiReducer from '../reducers/uiReducer';
import { fromJS } from 'immutable';
import { mapStateToProps } from './App';

describe('App component', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    store = createStore(uiReducer);
    wrapper = mount(
      <Provider store={store}>
        <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
          <App />
        </AppContext.Provider>
      </Provider>
    );
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    wrapper.unmount();
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
      const appInstance = wrapper.find(App).childAt(0).instance();
      appInstance.setState({
        user: {
          email: 'test@example.com',
          password: 'password',
          isLoggedIn: true,
        }
      });
      wrapper.update();
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
      const appInstance = wrapper.find(App).childAt(0).instance();
      expect(appInstance.state.user).toEqual(defaultUser);
      expect(alertMock).toHaveBeenCalledWith('Logging you out');
      alertMock.mockRestore();
    });
  });

  it('logIn function updates the state correctly', () => {
    const appInstance = wrapper.find(App).childAt(0).instance();
    appInstance.logIn('test@example.com', 'password');
    expect(appInstance.state.user).toEqual({
      email: 'test@example.com',
      password: 'password',
      isLoggedIn: true,
    });
  });

  it('logOut function updates the state correctly', () => {
    const appInstance = wrapper.find(App).childAt(0).instance();
    appInstance.setState({
      user: {
        email: 'test@example.com',
        password: 'password',
        isLoggedIn: true,
      }
    });
    appInstance.logOut();
    expect(appInstance.state.user).toEqual(defaultUser);
  });

  it('markNotificationAsRead function updates the state correctly', () => {
    const appInstance = wrapper.find(App).childAt(0).instance();
    const notifications = [
      { id: 1, value: 'New course available', type: 'default' },
      { id: 2, value: 'New resume available', type: 'urgent' },
      { id: 3, html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' }, type: 'urgent' },
    ];
    appInstance.setState({ listNotifications: notifications });
    appInstance.markNotificationAsRead(2);
    expect(appInstance.state.listNotifications).toEqual([
      { id: 1, value: 'New course available', type: 'default' },
      { id: 3, html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' }, type: 'urgent' },
    ]);
  });
  
  it('displays the drawer when displayNotificationDrawer is called', () => {
    store.dispatch({ type: 'DISPLAY_NOTIFICATION_DRAWER' });
    wrapper.update();
    const appInstance = wrapper.find(App).childAt(0).instance();
    expect(appInstance.props.displayDrawer).toEqual(true);
  });

  it('hides the drawer when hideNotificationDrawer is called', () => {
    store.dispatch({ type: 'DISPLAY_NOTIFICATION_DRAWER' });
    store.dispatch({ type: 'HIDE_NOTIFICATION_DRAWER' });
    wrapper.update();
    const appInstance = wrapper.find(App).childAt(0).instance();
    expect(appInstance.props.displayDrawer).toEqual(false);
  });
});

describe('mapStateToProps', () => {
  it('should return the correct object', () => {
    let state = fromJS({
      isUserLoggedIn: true,
      isNotificationDrawerVisible: false
    });
    const expectedProps = {
      isLoggedIn: true,
      displayDrawer: false
    };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
