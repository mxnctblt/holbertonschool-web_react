// actions/courseActionCreators.js
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";
import fetch from 'isomorphic-fetch';

export const fetchCourses = (url = 'http://localhost:8564/courses.json') => {
  return async (dispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    const formattedData = data.map(course => ({ ...course, id: Number(course.id) }));
    dispatch({
      type: FETCH_COURSE_SUCCESS,
      data: formattedData,
    });
  };
};

export const selectCourse = (index) => {
  return {
    type: SELECT_COURSE,
    index,
  };
}

export const unSelectCourse = (index) => {
  return {
    type: UNSELECT_COURSE,
    index,
  };
}
