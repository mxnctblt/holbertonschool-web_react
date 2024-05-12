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

  it('Tests that when calling the function markAsRead on an instance of the component, the spy is being called with the right message', () => {
    const mockConsole = jest.spyOn(console, 'log').mockImplementation(() => {});
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    wrapper.instance().markAsRead(1);
    expect(mockConsole).toHaveBeenCalledWith('Notification 1 has been marked as read');
    jest.restoreAllMocks();
  });


  it('does not rerender with same list', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
      { id: 3, type: 'default', value: 'Notification 3' }
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={notifications} />);
    const instance = wrapper.instance();
    const shouldUpdateSpy = jest.spyOn(instance, 'shouldComponentUpdate');
    wrapper.setProps({ listNotifications: notifications });
    expect(shouldUpdateSpy).toHaveBeenCalledTimes(1);
  });

  it('rerenders with longer list', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
      { id: 3, type: 'default', value: 'Notification 3' }
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={notifications} />);
    const instance = wrapper.instance();
    const shouldUpdateSpy = jest.spyOn(instance, 'shouldComponentUpdate');
    const longerList = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
      { id: 3, type: 'default', value: 'Notification 3' },
      { id: 4, type: 'urgent', value: 'Notification 4' }
    ];
    wrapper.setProps({ listNotifications: longerList });
    expect(shouldUpdateSpy).toHaveBeenCalledTimes(1);
  });
});
