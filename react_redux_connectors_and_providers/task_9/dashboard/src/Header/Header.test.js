import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';
import { StyleSheetTestUtils } from 'aphrodite';
import { defaultUser } from '../App/AppContext';

describe('header component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Header user={defaultUser} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders img and h1 tags', () => {
    const wrapper = shallow(<Header user={defaultUser} />);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('does not create logoutSection with default context value', () => {
    const wrapper = shallow(<Header user={defaultUser} />);
    expect(wrapper.find('#logoutSection').exists()).toBe(false);
  });

  it('creates logoutSection with user defined context', () => {
    const user = { email: 'test@example.com', password: 'password', isLoggedIn: true };
    const wrapper = shallow(<Header user={user} />);
    expect(wrapper.find('#logoutSection').exists()).toBe(true);
    expect(wrapper.find('#logoutSection p').text()).toBe('Welcome test@example.com ( logout )');
  });
});
