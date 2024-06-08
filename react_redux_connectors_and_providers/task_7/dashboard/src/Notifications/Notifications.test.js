import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { markAsRead } from '../actions/notificationActionCreators';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = fromJS({
  notifications: {
    notifications: []
  }
});

const store = mockStore(initialState);

const createWrapper = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <Notifications {...props} />
    </Provider>
  );
};

jest.mock('../actions/notificationActionCreators', () => ({
  markAsRead: jest.fn((id) => ({
    type: 'MARK_AS_READ',
    id,
  })),
}));

describe('<Notifications />', () => {
  let wrapper;
  let mockHandleDisplayDrawer;
  let mockHandleHideDrawer;

  beforeEach(() => {
    mockHandleDisplayDrawer = jest.fn();
    mockHandleHideDrawer = jest.fn();
    store.clearActions();
  });

  it('should render without crashing', () => {
    wrapper = createWrapper(store, {
      displayDrawer: false,
      handleDisplayDrawer: mockHandleDisplayDrawer,
      handleHideDrawer: mockHandleHideDrawer
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('calls handleDisplayDrawer when menu item is clicked', () => {
    wrapper = createWrapper(store, {
      displayDrawer: false,
      handleDisplayDrawer: mockHandleDisplayDrawer,
      handleHideDrawer: mockHandleHideDrawer
    });

    wrapper.find('[data-test="menuItem"]').simulate('click');
    expect(mockHandleDisplayDrawer).toHaveBeenCalled();
  });

  it('calls handleHideDrawer when close button is clicked', () => {
    wrapper = createWrapper(store, {
      displayDrawer: true,
      handleDisplayDrawer: mockHandleDisplayDrawer,
      handleHideDrawer: mockHandleHideDrawer
    });

    wrapper.find('[aria-label="Close"]').simulate('click');
    expect(mockHandleHideDrawer).toHaveBeenCalled();
  });

  it('calls markAsRead with the right message when markNotificationAsRead is triggered', () => {
    const dataStore = mockStore(fromJS({
      notifications: {
        notifications: [
          { id: 1, type: 'default', context: { value: 'New course available' } },
          { id: 2, type: 'urgent', context: { value: 'New resume available' } },
          { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
        ]
      }
    }));

    wrapper = createWrapper(dataStore, {
      displayDrawer: true,
      handleDisplayDrawer: mockHandleDisplayDrawer,
      handleHideDrawer: mockHandleHideDrawer
    });

    wrapper.find(NotificationItem).at(0).props().markAsRead(1);
    expect(markAsRead).toHaveBeenCalledWith(1);
    const actions = dataStore.getActions();
    expect(actions).toEqual([{ type: 'MARK_AS_READ', id: 1 }]);
  });

  it('renders NotificationItem elements correctly with data', () => {
    const dataStore = mockStore(fromJS({
      notifications: {
        notifications: [
          { id: 1, type: 'default', context: { value: 'New course available' } },
          { id: 2, type: 'urgent', context: { value: 'New resume available' } },
          { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
        ]
      }
    }));

    wrapper = createWrapper(dataStore, {
      displayDrawer: true,
      handleDisplayDrawer: mockHandleDisplayDrawer,
      handleHideDrawer: mockHandleHideDrawer
    });

    const notificationItems = wrapper.find('NotificationItem');
    expect(notificationItems).toHaveLength(3);
    expect(notificationItems.at(0).props().value).toEqual('New course available');
    expect(notificationItems.at(1).props().value).toEqual('New resume available');
    expect(notificationItems.at(2).props().html.__html).toEqual('<strong>Urgent requirement</strong> - complete by EOD');
  });

  it('renders correctly if listNotifications is empty or not passed', () => {
    wrapper = createWrapper(store, {
      displayDrawer: true,
      handleDisplayDrawer: mockHandleDisplayDrawer,
      handleHideDrawer: mockHandleHideDrawer
    });

    expect(wrapper.find(NotificationItem).length).toEqual(0);
    expect(wrapper.text()).toContain('No new notification for now');

    const wrapperWithoutProp = mount(
      <Provider store={store}>
        <Notifications displayDrawer={true} />
      </Provider>
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
    wrapper = createWrapper(store, {
      displayDrawer: false,
      handleDisplayDrawer: mockHandleDisplayDrawer,
      handleHideDrawer: mockHandleHideDrawer
    });

    expect(wrapper.find('[data-test="menuItem"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="notifications"]').exists()).toBe(false);
  });

  it('displays the notifications when displayDrawer is true', () => {
    wrapper = createWrapper(store, {
      displayDrawer: true,
      handleDisplayDrawer: mockHandleDisplayDrawer,
      handleHideDrawer: mockHandleHideDrawer
    });

    expect(wrapper.find('[data-test="menuItem"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="notifications"]').exists()).toBe(true);
  });

  it('should display the correct text "Your notifications"', () => {
    wrapper = createWrapper(store, {
      displayDrawer: false,
      handleDisplayDrawer: mockHandleDisplayDrawer,
      handleHideDrawer: mockHandleHideDrawer
    });

    expect(wrapper.find('[data-test="menuItem"]').text()).toBe('Your notifications');
  });

  it('does not re-render when updating props with the same list', () => {
    const initialProps = {
      displayDrawer: true,
      listNotifications: [
        { id: 1, type: 'default', context: { value: 'New course available' } },
        { id: 2, type: 'urgent', context: { value: 'New resume available' } },
      ],
      handleDisplayDrawer: mockHandleDisplayDrawer,
      handleHideDrawer: mockHandleHideDrawer
    };
    wrapper = createWrapper(store, initialProps);

    const spy = jest.spyOn(wrapper.find('Notifications').instance(), 'render');
    wrapper.setProps({ listNotifications: initialProps.listNotifications });
    expect(spy).not.toHaveBeenCalled();
  });
});
