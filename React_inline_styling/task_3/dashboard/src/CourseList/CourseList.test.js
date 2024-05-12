import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';


StyleSheetTestUtils.suppressStyleInjection();

describe('tests for CourseList component when passing no props', () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<CourseList />)));

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the 5 different rows', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.find(CourseListRow).length).toBe(3);
  });
});

describe('tests for CourseList component when passing an empty array to listCourses prop', () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<CourseList listCourses={[]} />)));

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the 5 different rows', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.find(CourseListRow).length).toBe(3);
  });
});

describe('tests for CourseList component when passing an array of data to listCourses prop', () => {
  const coursesData = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  let wrapper;

  beforeEach(
    () => (wrapper = shallow(<CourseList listCourses={coursesData} />))
  );

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the 5 different rows', () => {
    expect(wrapper.find(CourseListRow).length).toBe(5);
  });
});
