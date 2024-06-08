import { createSelector } from 'reselect';
import { Map } from 'immutable';

const getCourseEntities = (state) => state.get('courses', Map());

export const getCourses = createSelector(
  [getCourseEntities],
  (courses) => courses.valueSeq().toList()
);
