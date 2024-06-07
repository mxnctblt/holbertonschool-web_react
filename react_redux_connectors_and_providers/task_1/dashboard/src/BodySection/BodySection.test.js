import React from 'react';
import { shallow } from 'enzyme';
import BodySection from './BodySection';
import { StyleSheetTestUtils } from 'aphrodite';

describe('BodySection', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders an h2 element and the children correctly', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );

    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual('test title');

    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toEqual('test children node');
  });
});
