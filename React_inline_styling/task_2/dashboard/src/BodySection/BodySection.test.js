import React from 'react';
import { shallow } from 'enzyme';
import BodySection from './BodySection';

describe('tests for BodySection Component', () => {
  it('should render correctly the children and one h2 element', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );
    expect(wrapper.find('h2').text()).toBe('test title');
    expect(wrapper.find('p').text()).toBe('test children node');
  });
});
