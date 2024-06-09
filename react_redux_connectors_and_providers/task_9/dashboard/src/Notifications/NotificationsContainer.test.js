import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import NotificationsContainer from './NotificationsContainer';
import { fetchNotifications } from '../actions/notificationActionCreators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = fromJS({
  notifications: {
    notifications: []
  }
});

const store = mockStore(initialState);

jest.mock('../actions/notificationActionCreators', () => ({
  fetchNotifications: jest.fn(() => ({ type: 'FETCH_NOTIFICATIONS' })),
  markAsRead: jest.fn((id) => ({ type: 'MARK_AS_READ', id })),
  setNotificationFilter: jest.fn((filter) => ({ type: 'SET_TYPE_FILTER', filter })),
}));

describe('<NotificationsContainer />', () => {
  let wrapper;

  beforeEach(() => {
    store.clearActions();
    wrapper = mount(
      <Provider store={store}>
        <NotificationsContainer />
      </Provider>
    );
  });

  it('should fetch notifications on mount', () => {
    expect(fetchNotifications).toHaveBeenCalled();
  });
});
