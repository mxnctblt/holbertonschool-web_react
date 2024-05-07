import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';

describe('test for CourseListRow component', () => {
  it('should render one cell with colspan = 2 attribute when isHeader is true and textSecondCell is null', () => {
    const wrapper = shallow(<CourseListRow isHeader textFirstCell="test" />);
    expect(wrapper.find('th').length).toBe(1);
    expect(wrapper.find('th').prop('colSpan')).toBe(2);
  });

  it('should render two cells when isHeader is true and textSecondCell is not null', () => {
    const wrapper = shallow(
      <CourseListRow isHeader textFirstCell="test" textSecondCell="test" />
    );
    expect(wrapper.find('th').length).toBe(2);
  });

  it('should render one td when isHeader is false', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="test" />);
    expect(wrapper.find('tr').children('td').length).toBe(2);
  });
});
