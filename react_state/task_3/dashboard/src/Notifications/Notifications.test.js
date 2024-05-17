import React from 'react';
import { shallow, mount } from 'enzyme';
import Notifications from './Notifications';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Notifications Component', () => {
  it('renders without crashing', () => {
    shallow(<Notifications />);
  });

  it('renders 3 NotificationItem items', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
      { id: 3, type: 'default', value: 'Notification 3' }
    ];
    const wrapper = mount(<Notifications displayDrawer={true} listNotifications={notifications} />);
    expect(wrapper.find('NotificationItem').length).toBe(3);
  });

  it('renders the first NotificationItem item with the right type and value', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
      { id: 3, type: 'default', value: 'Notification 3' }
    ];
    const wrapper = mount(<Notifications displayDrawer={true} listNotifications={notifications} />);
    const firstItem = wrapper.find('NotificationItem').first();
    expect(firstItem.props().type).toBe('default');
    expect(firstItem.props().value).toBe('Notification 1');
  });

  it('renders "No new notification for now" when listNotifications is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.contains(<p>No new notification for now</p>)).toBe(true);
    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(false);
  });

  it('renders the correct number of NotificationItem when listNotifications is not empty', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' }
    ];
    const wrapper = mount(<Notifications displayDrawer={true} listNotifications={notifications} />);
    expect(wrapper.find('NotificationItem').length).toBe(notifications.length);
  });

  it('does not render "Here is the list of notifications" when listNotifications is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(false);
  });

  it('calls handleDisplayDrawer when clicking on the menu item', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(<Notifications handleDisplayDrawer={handleDisplayDrawer} />);
    const menuItem = wrapper.find('div.MenuItem_1o4b8go');
    menuItem.simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
    handleDisplayDrawer.mockClear();
  });

  it('calls handleHideDrawer when clicking on the close button', () => {
    let listNotifications;
        listNotifications = [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' },
            { id: 3, type: 'urgent', html: {__html: '<u>test</u>'} }
        ];
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} handleHideDrawer={handleHideDrawer} />);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
    handleHideDrawer.mockClear();
    jest.restoreAllMocks();
  });
});
