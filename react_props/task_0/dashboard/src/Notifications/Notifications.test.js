import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('Notifications Componenet', () => {
  it('should render without crashing', () => {
    shallow(<Notifications />);
  });

  it('should render a list list of three items', () => {
    const wrapper = shallow(<Notifications />);
    const liElements = wrapper.find('li');
    expect(liElements.length).toBe(3);
  });

  it('should render the test Here is the list of notifications', () => {
    const wrapper = shallow(<Notifications />);
    const pElement = wrapper.find('p');
    expect(pElement.text()).toBe('Here is the list of notifications');
  });
});
