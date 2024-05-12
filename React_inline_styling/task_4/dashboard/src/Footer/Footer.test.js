import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';
import { StyleSheetTestUtils } from 'aphrodite';


StyleSheetTestUtils.suppressStyleInjection();

describe('tests for Footer component', () => {
  it('should render without crashing', () => {
    shallow(<Footer />);
  });

  it('should render the text Copyright at the very least', () => {
    const wrapper = shallow(<Footer />);
    const pElementText = wrapper.find('p').text();
    expect(pElementText.includes('Copyright')).toBe(true);
  });
});
