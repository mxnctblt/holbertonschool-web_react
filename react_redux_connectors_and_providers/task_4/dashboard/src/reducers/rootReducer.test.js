import { Map } from 'immutable';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const initialState = rootReducer(undefined, {});
    const expectedState = Map({
      courses: Map(),
      notifications: Map({
        notifications: Map(),
        filter: 'DEFAULT',
      }),
      ui: Map({
        isNotificationDrawerVisible: false,
        isUserLoggedIn: false,
        user: null,
      }),
    });
    expect(initialState).toEqual(expectedState);
  });
});
