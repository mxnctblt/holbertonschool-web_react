// actions/courseActionCreators.test.js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';
import { fetchCourses } from './courseActionCreators';
import { FETCH_COURSE_SUCCESS } from './courseActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('courseActionCreators', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('creates FETCH_COURSE_SUCCESS when fetching courses has been done', () => {
    const courses = [
      { id: '1', name: 'ES6', credit: 60 },
      { id: '2', name: 'Webpack', credit: 20 },
      { id: '3', name: 'React', credit: 40 }
    ];

    const formattedCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(courses));

    const expectedActions = [
      { type: FETCH_COURSE_SUCCESS, data: formattedCourses }
    ];

    const store = mockStore({ courses: [] });

    // Use an absolute URL for the test
    const testUrl = 'http://localhost:8564/courses.json';

    return store.dispatch(fetchCourses(testUrl)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
