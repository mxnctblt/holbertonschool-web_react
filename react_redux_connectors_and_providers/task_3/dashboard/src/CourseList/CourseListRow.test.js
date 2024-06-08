import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';

describe('<CourseListRow/>', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('test when isHeader is true and textSecondCell does not exist', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Available courses" />);
    expect(wrapper.find('th').parent().prop('className')).toContain('headerCentered_9r3akn');
    expect(wrapper.html()).toContain("<th colSpan=\"2\">Available courses</th>");
  });

  it('test when isHeader is true and textSecondCell is present', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />);
    expect(wrapper.html()).toContain("<th>Course name</th><th>Credit</th>");
  });

  it('test when isHeader is false', () => {
    const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="Course name" textSecondCell="Credit" />);
    expect(wrapper.html()).toContain("<td><input type=\"checkbox\"/>Course name</td><td>Credit</td>");
  });

  it('should check the checkbox and verify the class change', () => {
    const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="Course name" textSecondCell="Credit" />);
    const checkbox = wrapper.find('input[type="checkbox"]');
    checkbox.simulate('change', { target: { checked: true } });
    expect(wrapper.find('tr').prop('className')).toContain('rowChecked');
  });
});
