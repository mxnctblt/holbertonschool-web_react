import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('Tests for Notifications componenet when no prop are passed', () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Notifications />)));

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render only the Div.menuItem with the text "Your notifications"', () => {
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.find('.menuItem').text()).toBe('Your notifications');
  });
});

describe('Tests for Notifications componenet when displayDrawer is set to true', () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Notifications displayDrawer />)));

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render Div.menuItem and Div.Notifications"', () => {
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('.menuItem').text()).toBe('Your notifications');
  });

  it('should render a list with one li with the text "No new notification for now"', () => {
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('li').text()).toBe('No new notification for now');
  });
});

describe('Tests for Notifications componenet when displayDrawer is set to true and an empty array is passed to listNotifications', () => {
  let wrapper;

  beforeEach(
    () =>
      (wrapper = shallow(
        <Notifications displayDrawer listNotifications={[]} />
      ))
  );

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render Div.menuItem and Div.Notifications"', () => {
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('.menuItem').text()).toBe('Your notifications');
  });

  it('should render a list with one li with the text "No new notification for now"', () => {
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('li').text()).toBe('No new notification for now');
  });
});

describe('Tests for Notifications componenet when displayDrawer is set to true and data array is passed to listNotifications', () => {
  const notificationData = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    {
      id: 3,
      type: 'urgent',
      html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' },
    },
  ];

  let wrapper;

  beforeEach(
    () =>
      (wrapper = shallow(
        <Notifications displayDrawer listNotifications={notificationData} />
      ))
  );

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render Div.menuItem and Div.Notifications"', () => {
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('.menuItem').text()).toBe('Your notifications');
  });

  it('should render a list with one li with three NotificationItem', () => {
    expect(wrapper.find(NotificationItem).length).toBe(3);
  });

  it('should render the text Here is the list of notifications', () => {
    expect(wrapper.find('p').text()).toBe('Here is the list of notifications');
  });

  it('should render the right html for the first NotificationItem', () => {
    expect(wrapper.find(NotificationItem).first().html()).toBe(
      '<li data-notification-type="default">New course available</li>'
    );
  });
});
