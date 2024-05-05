import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('Notifications Componenet', () => {
  it('should render without crashing', () => {
    shallow(<Notifications />);
  });

  it('should render a list of three NotificationItem', () => {
    const wrapper = shallow(<Notifications />);
    const NotificationItemElements = wrapper.find(NotificationItem);
    expect(NotificationItemElements.length).toBe(3);
  });

  it('should render the test Here is the list of notifications', () => {
    const wrapper = shallow(<Notifications />);
    const pElement = wrapper.find('p');
    expect(pElement.text()).toBe('Here is the list of notifications');
  });

  it('should render the right html for the first NotificationItem', () => {
    const wrapper = shallow(<Notifications />);
    const firstElement = wrapper.find(NotificationItem).first();
    expect(firstElement.html()).toBe(
      '<li data-notification-type="default">New course available</li>'
    );
  });
});
