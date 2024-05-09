import React from 'react';
import CourseListRow from './CourseListRow';
import './CourseList.css';
import { CourseShape } from './CourseShape';
import PropTypes from 'prop-types';

const CourseList = ({ listCourses = [] }) => {
  return (
    <table>
      <thead>
        <CourseListRow isHeader textFirstCell="Available courses" />
        <CourseListRow
          isHeader
          textFirstCell="Course name"
          textSecondCell="Credit"
        />
      </thead>
      <tbody>
        {listCourses.length === 0 ? (
          <CourseListRow textFirstCell="No course available" />
        ) : (
          listCourses.map((course) => {
            return (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
              />
            );
          })
        )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(PropTypes.shape(CourseShape)),
};

export default CourseList;
