import { Map } from 'immutable';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

// État initial
const initialState = Map();

// Réducteur de cours
const courseReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_COURSE_SUCCESS:
      const normalizedData = coursesNormalizer(action.data);
      const courses = normalizedData.entities.courses;
      Object.keys(courses).forEach(id => {
        courses[id].isSelected = false;
      });
      return state.merge(courses);
    case SELECT_COURSE:
      return state.setIn([action.index, 'isSelected'], true);
    case UNSELECT_COURSE:
      return state.setIn([action.index, 'isSelected'], false);
    default:
      return state;
  }
};

export default courseReducer;
