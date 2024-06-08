import { Map } from 'immutable';
import courseReducer from './courseReducer';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';

describe('courseReducer', () => {
  it('should return the initial state when no action is passed', () => {
    const state = courseReducer(undefined, {});
    expect(state).toEqual(Map());
  });

  it('should handle FETCH_COURSE_SUCCESS action', () => {
    const data = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ];
    const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    expect(state.toJS()).toEqual({
      '1': { id: 1, name: 'ES6', credit: 60, isSelected: false },
      '2': { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      '3': { id: 3, name: 'React', credit: 40, isSelected: false }
    });
  });

  it('should handle SELECT_COURSE action', () => {
    const initialState = Map({
      '1': { id: 1, name: 'ES6', credit: 60, isSelected: false },
      '2': { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      '3': { id: 3, name: 'React', credit: 40, isSelected: false }
    });
    const state = courseReducer(initialState, { type: SELECT_COURSE, index: '2' });
    expect(state.toJS()['2'].isSelected).toBe(true);
  });

  it('should handle UNSELECT_COURSE action', () => {
    const initialState = Map({
      '1': { id: 1, name: 'ES6', credit: 60, isSelected: false },
      '2': { id: 2, name: 'Webpack', credit: 20, isSelected: true },
      '3': { id: 3, name: 'React', credit: 40, isSelected: false }
    });
    const state = courseReducer(initialState, { type: UNSELECT_COURSE, index: '2' });
    expect(state.toJS()['2'].isSelected).toBe(false);
  });
});
