// CourseList.test.js
import React from 'react';
import { shallow } from 'enzyme';
import { CourseList } from './CourseList';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';

jest.mock('../actions/courseActionCreators');

describe('CourseList Component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.clearAllMocks();
  });

  it('calls fetchCourses action when the component is mounted', () => {
    const mockFetchCourses = jest.fn();
    
    shallow(
      <CourseList 
        fetchCourses={mockFetchCourses}
        listCourses={[]} 
        selectCourse={jest.fn()} 
        unSelectCourse={jest.fn()} 
      />
    );

    expect(mockFetchCourses).toHaveBeenCalled();
  });

  it('calls selectCourse and unSelectCourse actions when onChangeRow is called', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: 60, isSelected: false },
      { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      { id: 3, name: 'React', credit: 40, isSelected: false }
    ];

    const wrapper = shallow(
      <CourseList
        fetchCourses={jest.fn()}
        listCourses={courses}
        selectCourse={selectCourse}
        unSelectCourse={unSelectCourse}
      />
    );

    const instance = wrapper.instance();

    if (instance) {
      instance.onChangeRow(2, true);
      expect(selectCourse).toHaveBeenCalledWith(2);

      instance.onChangeRow(2, false);
      expect(unSelectCourse).toHaveBeenCalledWith(2);
    } else {
      console.error("Instance of CourseList est null.");
    }
  });

  it('passes the correct props to CourseListRow', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: 60, isSelected: true },
      { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      { id: 3, name: 'React', credit: 40, isSelected: true }
    ];

    const wrapper = shallow(
      <CourseList
        fetchCourses={jest.fn()}
        listCourses={courses}
        selectCourse={selectCourse}
        unSelectCourse={unSelectCourse}
      />
    );

    const rows = wrapper.find(CourseListRow).filterWhere(row => !row.prop('isHeader'));
    expect(rows).toHaveLength(3);

    rows.forEach((row, index) => {
      const course = courses[index];
      expect(row.prop('isChecked')).toBe(course.isSelected);
      expect(typeof row.prop('onChangeRow')).toBe('function');
    });
  });
});
