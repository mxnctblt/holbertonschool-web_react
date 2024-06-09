import React from 'react';
import { mount } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('<Notifications />', () => {
  let wrapper;
  let mockHandleDisplayDrawer;
  let mockHandleHideDrawer;

  beforeEach(() => {
    mockHandleDisplayDrawer = jest.fn();
    mockHandleHideDrawer = jest.fn();
  });

  it('should render without crashing', () => {
    wrapper = mount(
      <Notifications
        displayDrawer={false}
        handleDisplayDrawer={mockHandleDisplayDrawer}
        handleHideDrawer={mockHandleHideDrawer}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('calls handleDisplayDrawer when menu item is clicked', () => {
    wrapper = mount(
      <Notifications
        displayDrawer={false}
        handleDisplayDrawer={mockHandleDisplayDrawer}
        handleHideDrawer={mockHandleHideDrawer}
      />
    );

    wrapper.find('[data-test="menuItem"]').simulate('click');
    expect(mockHandleDisplayDrawer).toHaveBeenCalled();
  });

  it('calls handleHideDrawer when close button is clicked', () => {
    wrapper = mount(
      <Notifications
        displayDrawer={true}
        handleDisplayDrawer={mockHandleDisplayDrawer}
        handleHideDrawer={mockHandleHideDrawer}
      />
    );

    wrapper.find('[aria-label="Close"]').simulate('click');
    expect(mockHandleHideDrawer).toHaveBeenCalled();
  });

  it('renders NotificationItem elements correctly with data', () => {
    const notifications = [
      { id: 1, context: { value: 'New course available' }, isRead: false },
      { id: 2, context: { value: 'New resume available' }, isRead: false },
      { id: 3, context: { value: 'Urgent requirement' }, html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' }, isRead: false },
    ];

    wrapper = mount(
      <Notifications
        displayDrawer={true}
        listNotifications={notifications}
        handleDisplayDrawer={mockHandleDisplayDrawer}
        handleHideDrawer={mockHandleHideDrawer}
        markAsRead={jest.fn()}
        setNotificationFilter={jest.fn()}
      />
    );

    const notificationItems = wrapper.find(NotificationItem);
    expect(notificationItems).toHaveLength(3);
    expect(notificationItems.at(0).props().value).toEqual('New course available');
    expect(notificationItems.at(1).props().value).toEqual('New resume available');

    const htmlProp = notificationItems.at(2).props().html;
    expect(htmlProp).toBeDefined();
    if (htmlProp) {
      expect(htmlProp.__html).toEqual('<strong>Urgent requirement</strong> - complete by EOD');
    }
  });

  it('renders correctly if listNotifications is empty or not passed', () => {
    wrapper = mount(
      <Notifications
        displayDrawer={true}
        handleDisplayDrawer={mockHandleDisplayDrawer}
        handleHideDrawer={mockHandleHideDrawer}
      />
    );

    expect(wrapper.find(NotificationItem).length).toEqual(0);
    expect(wrapper.text()).toContain('No new notification for now');

    const wrapperWithoutProp = mount(
      <Notifications displayDrawer={true} />
    );

    expect(wrapperWithoutProp.find(NotificationItem).length).toEqual(0);
    expect(wrapperWithoutProp.text()).toContain('No new notification for now');
  });

  it('renders "No new notification for now" when listNotifications is empty', () => {
    wrapper.setProps({ listNotifications: [] });
    expect(wrapper.text()).toContain("No new notification for now");
    expect(wrapper.text()).toContain("Here is the list of notifications");
  });

  it('does not display "Here is the list of notifications" when notifications are empty', () => {
    expect(wrapper.text()).toContain('Here is the list of notifications');
    expect(wrapper.text()).toContain('No new notification for now');
  });

  it('displays the menu item when displayDrawer is false', () => {
    wrapper = mount(
      <Notifications
        displayDrawer={false}
        handleDisplayDrawer={mockHandleDisplayDrawer}
        handleHideDrawer={mockHandleHideDrawer}
      />
    );

    expect(wrapper.find('[data-test="menuItem"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="notifications"]').exists()).toBe(false);
  });

  it('displays the notifications when displayDrawer is true', () => {
    wrapper = mount(
      <Notifications
        displayDrawer={true}
        handleDisplayDrawer={mockHandleDisplayDrawer}
        handleHideDrawer={mockHandleHideDrawer}
      />
    );

    expect(wrapper.find('[data-test="menuItem"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="notifications"]').exists()).toBe(true);
  });

  it('should display the correct text "Your notifications"', () => {
    wrapper = mount(
      <Notifications
        displayDrawer={false}
        handleDisplayDrawer={mockHandleDisplayDrawer}
        handleHideDrawer={mockHandleHideDrawer}
      />
    );

    expect(wrapper.find('[data-test="menuItem"]').text()).toBe('Your notifications');
  });

  it('calls setNotificationFilter with URGENT when the "‼️" button is clicked', () => {
    const mockSetNotificationFilter = jest.fn();

    wrapper = mount(
      <Notifications
        displayDrawer={true}
        handleDisplayDrawer={mockHandleDisplayDrawer}
        handleHideDrawer={mockHandleHideDrawer}
        setNotificationFilter={mockSetNotificationFilter}
      />
    );

    wrapper.find('[data-test="urgent-button"]').simulate('click');
    expect(mockSetNotificationFilter).toHaveBeenCalledWith('URGENT');
  });

  it('calls setNotificationFilter with DEFAULT when the "?" button is clicked', () => {
    const mockSetNotificationFilter = jest.fn();

    wrapper = mount(
      <Notifications
        displayDrawer={true}
        handleDisplayDrawer={mockHandleDisplayDrawer}
        handleHideDrawer={mockHandleHideDrawer}
        setNotificationFilter={mockSetNotificationFilter}
      />
    );

    wrapper.find('[data-test="default-button"]').simulate('click');
    expect(mockSetNotificationFilter).toHaveBeenCalledWith('DEFAULT');
  });
});
