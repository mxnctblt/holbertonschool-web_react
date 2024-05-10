import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('tests for Login Component', () => {
  it('should render without crashing', () => {
    shallow(<Login />);
  });

  it('should render 2 input and 2 label', () => {
    const wrapper = shallow(<Login />);
    const inputElements = wrapper.find('input');
    const labelElements = wrapper.find('label');
    expect(inputElements.length).toBe(2);
    expect(labelElements.length).toBe(2);
  });
});
