import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('CourseList Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('renders 3 different rows if no list prop passed', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.find('CourseListRow')).toHaveLength(3);
  });

  it('renders correctly with an empty array or no listCourses property', () => {
    const wrapperWithEmptyArray = shallow(<CourseList listCourses={[]} />);
    expect(wrapperWithEmptyArray.find('CourseListRow').exists()).toBe(true);

    const wrapperWithNoProperty = shallow(<CourseList />);
    expect(wrapperWithNoProperty.find('CourseListRow').exists()).toBe(true);
  });

  it('renders the list of courses correctly', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ];
    const wrapper = shallow(<CourseList listCourses={courses} />);
    expect(wrapper.find('CourseListRow')).toHaveLength(courses.length + 2);
  });
});
