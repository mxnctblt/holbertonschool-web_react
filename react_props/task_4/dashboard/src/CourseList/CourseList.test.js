import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('tests for CourseList component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CourseList />);
  });

  it('should render the 5 different rows', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.find(CourseListRow).length).toBe(5);
  });
});
