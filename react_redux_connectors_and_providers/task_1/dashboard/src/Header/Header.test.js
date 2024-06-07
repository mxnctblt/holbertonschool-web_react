import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import { StyleSheetTestUtils } from 'aphrodite';
import { AppContext, defaultUser } from '../App/AppContext';

describe('header component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders img and h1 tags', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('does not create logoutSection with default context value', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').exists()).toBe(false);
  });

  it('creates logoutSection with user defined context', () => {
    const user = { email: 'test@example.com', password: 'password', isLoggedIn: true };
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut: jest.fn() }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').exists()).toBe(true);
    expect(wrapper.find('#logoutSection p').text()).toBe('Welcome test@example.com ( logout )');
  });

  it('calls logOut on click when user is logged in', () => {
    const user = { email: 'test@example.com', password: 'password', isLoggedIn: true };
    const logOut = jest.fn();
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <Header />
      </AppContext.Provider>
    );
    wrapper.find('#logoutSection a').simulate('click');
    expect(logOut).toHaveBeenCalled();
  });
});
