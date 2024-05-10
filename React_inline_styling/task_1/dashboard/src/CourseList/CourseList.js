import React from 'react';
import CourseListRow from './CourseListRow';
import { StyleSheet, css } from 'aphrodite';
import { CourseShape } from './CourseShape';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  th: {
    borderBottom: '1px solid rgb(178, 178, 178)',
    textAlign: 'left',
  },
  'th:nth-child(1)': {
    textAlign: 'center',
  },
  table: {
    border: '1px solid rgb(178, 178, 178)',
  },
});

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
