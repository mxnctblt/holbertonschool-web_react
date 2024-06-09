// CourseListRow.test.js
import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils, css } from 'aphrodite';
import styles from './CourseListRow';

describe('<CourseListRow/>', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('test when isHeader is true and textSecondCell does not exist', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Available courses" />);
    expect(wrapper.find('th').prop('colSpan')).toBe(2);
    expect(wrapper.find('th').text()).toBe('Available courses');
  });

  it('test when isHeader is true and textSecondCell is present', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />);
    expect(wrapper.find('th').at(0).text()).toBe('Course name');
    expect(wrapper.find('th').at(1).text()).toBe('Credit');
  });

  it('test when isHeader is false', () => {
    const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="Course name" textSecondCell="Credit" />);
    expect(wrapper.find('td').at(0).text()).toContain('Course name');
    expect(wrapper.find('td').at(1).text()).toBe('Credit');
  });

  it('should check the checkbox and verify the class change', () => {
    const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="Course name" textSecondCell="Credit" />);
    const checkbox = wrapper.find('input[type="checkbox"]');
    checkbox.simulate('change', { target: { checked: true } });
    expect(wrapper.find('tr').prop('className')).toContain(css(styles.rowChecked));
  });
});
