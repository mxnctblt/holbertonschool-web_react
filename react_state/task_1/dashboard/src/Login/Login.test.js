import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import { StyleSheetTestUtils } from 'aphrodite';


StyleSheetTestUtils.suppressStyleInjection();

describe('tests for Login Component', () => {
  it('should render without crashing', () => {
    shallow(<Login />);
  });

  it('should render 3 input and 2 label', () => {
    const wrapper = shallow(<Login />);
    const inputElements = wrapper.find('input');
    const labelElements = wrapper.find('label');
    expect(inputElements.length).toBe(3);
    expect(labelElements.length).toBe(2);
  });

  it('should have submit button disabled by default', () => {
    const wrapper = shallow(<Login />);
    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('should enable submit button after changing input values', () => {
    const wrapper = shallow(<Login />);
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');

    emailInput.simulate('change', { target: { value: 'test@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });

    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.prop('disabled')).toBe(true);
  });
});
