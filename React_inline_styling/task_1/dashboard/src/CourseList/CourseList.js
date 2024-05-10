import React from 'react';
import CourseListRow from './CourseListRow';
import { CourseShape } from './CourseShape';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  courseList: {
    border: 'solid 1px rgb(227, 220, 220)',
    width: '100%',
    textAlign: 'left',
  },
});

const CourseList = ({ listCourses = [] }) => {
  return (
    <table className={css(styles.courseList)}>
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
