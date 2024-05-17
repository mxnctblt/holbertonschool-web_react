import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('App Component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders Notifications', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Notifications')).toHaveLength(1);
  });

  it('renders Header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('renders Login', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('renders Footer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Footer')).toHaveLength(1);
  });

  it('CourseList is not rendered', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('CourseList')).toHaveLength(0);
  });
});

describe('App Component with isLoggedIn', () => {
  let user;
    let listNotifications
    beforeAll(() => {
        user = {
            email: 'hello@world.com',
            password: 'test123!',
            isLoggedIn: true
        };
        listNotifications = [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' },
            { id: 3, type: 'urgent', html: {__html: <strong>hello</strong>} }
        ];
    });
  it('renders CourseList', () => {
    const wrapper = shallow(<App isLoggedIn />);
    wrapper.setState({user});
    expect(wrapper.find('CourseList')).toHaveLength(1);
  });

  it('calls logOut function and displays alert when Ctrl+H is pressed', () => {
    const mockLogOut = jest.fn();
    const logger = jest.spyOn(window, 'alert');
    expect(logger);
    expect(mockLogOut);
    jest.restoreAllMocks();
  });

  it('verifies that the default state for displayDrawer is false', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    expect(instance.state.displayDrawer).toBe(false);
  });

  it('verifies that after calling handleDisplayDrawer, the state should now be true', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.handleDisplayDrawer();
    expect(instance.state.displayDrawer).toBe(true);
  });

  it('verifies that after calling handleHideDrawer, the state is updated to be false', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.handleDisplayDrawer();
    instance.handleHideDrawer();
    expect(instance.state.displayDrawer).toBe(false);
  });
  it('should update the state when logIn is been called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn();
    const user = wrapper.state('user');
    expect(user.isLoggedIn).toBe(true);
  });
  it('should update the state when logOut is been called', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ user: { isLoggedIn: true } });
    wrapper.instance().logOut();
    const user = wrapper.state('user');
    expect(user.isLoggedIn).toBe(false);
  });

  it('checks that markNotificationAsRead works as intended', () => {
    const wrapper = shallow(<App/>);
    wrapper.setState({user});
    expect(wrapper.state().listNotifications.length).toEqual(3);
    wrapper.instance().markNotificationAsRead(1);
    expect(wrapper.state().listNotifications.length).toEqual(2);
  });
});
