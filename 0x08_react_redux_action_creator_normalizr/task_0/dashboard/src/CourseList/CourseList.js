import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import CourseShape from './CourseShape';
import './CourseList.css';
import { StyleSheet, css } from 'aphrodite';

function CourseList({ listCourses }) {
  return (
    <table className={css(styles.courseList)} id="CourseList">
      <thead>
        <CourseListRow isHeader={true} textFirstCell="Available courses" />
        <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
      </thead>
      <tbody>
        {listCourses.length === 0 ? (
          <CourseListRow isHeader={false} textFirstCell="No course available yet" />
        ) : (
          listCourses.map(course => (
            <CourseListRow
              key={course.id}
              isHeader={false}
              textFirstCell={course.name}
              textSecondCell={course.credit}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape)
};

CourseList.defaultProps = {
  listCourses: []
};

const styles = StyleSheet.create({
  courseList: {
    border: 'solid 1px rgb(227, 220, 220)',
    width: '90%',
    textAlign: 'left',
    marginTop: '30px',
    marginLeft: '5%',
    fontFamily: '\'Times New Roman\', Times, serif'
  }
});

export default CourseList;
