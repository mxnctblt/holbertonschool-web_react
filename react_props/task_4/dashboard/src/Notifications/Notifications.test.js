import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('Notifications Component', () => {
  it('should render without crashing', () => {
    shallow(<Notifications />);
  });

  it('should render a list of three NotificationItem', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    const NotificationItemElements = wrapper.find(NotificationItem);
    expect(NotificationItemElements.length).toBe(3);
  });

  it('should render the test Here is the list of notifications', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    const pElement = wrapper.find('p');
    expect(pElement.text()).toBe('Here is the list of notifications');
  });

  it('should render the right html for the first NotificationItem', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    const firstElement = wrapper.find(NotificationItem).first();
    expect(firstElement.html()).toBe(
      '<li data-notification-type="default">New course available</li>'
    );
  });

  it('should render the menu item is being displayed when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('.menuItem').length).toBe(1);
  });

  it('should render the menu item is being displayed when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    expect(wrapper.find('.menuItem').length).toBe(1);
  });

  it('should render the div.Notifications is not being displayed when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('.Notifications').length).toBe(0);
  });

  it('should render the div.Notifications is being displayed when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    expect(wrapper.find('.Notifications').length).toBe(1);
  });
});
