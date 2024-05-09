import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';

describe('test for Header component', () => {
  it('should render without crashing', () => {
    shallow(<Header />);
  });

  it('should render an img and a h1', () => {
    const wrapper = shallow(<Header />);
    const imgElement = wrapper.find('img');
    const h1Element = wrapper.find('h1');
    expect(imgElement.length).toBe(1);
    expect(h1Element.length).toBe(1);
  });
});
