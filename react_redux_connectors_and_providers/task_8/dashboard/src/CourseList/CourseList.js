import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CourseListRow from './CourseListRow';
import { getCourses } from '../selectors/courseSelector';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  courseList: {
    width: '90%',
    margin: 'auto',
    border: '1px solid rgb(194, 188, 188)',
  },
});

class CourseList extends React.Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  onChangeRow = (id, checked) => {
    if (checked) {
      this.props.selectCourse(id);
    } else {
      this.props.unSelectCourse(id);
    }
  };

  render() {
    const { listCourses } = this.props;

    return (
      <table id="CourseList" className={css(styles.courseList)}>
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
        </thead>
        <tbody>
          {listCourses.length > 0 ? (
            listCourses.map((course) => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={String(course.credit)}
                isChecked={course.isSelected}
                onChangeRow={(checked) => this.onChangeRow(course.id, checked)}
              />
            ))
          ) : (
            <tr>
              <td colSpan="2">No course available yet</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      credit: PropTypes.number.isRequired,
      isSelected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  fetchCourses: PropTypes.func.isRequired,
  selectCourse: PropTypes.func.isRequired,
  unSelectCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    listCourses: getCourses(state).toJS(),
  };
};

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

export { CourseList };
export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
