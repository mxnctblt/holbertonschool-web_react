import { Map, List } from 'immutable';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const initialState = rootReducer(undefined, {});
    const expectedState = Map({
      courses: Map(),
      notifications: Map({
        notifications: List(),
        filter: 'DEFAULT',
        loading: false,
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
