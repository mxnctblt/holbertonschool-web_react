import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';
import { StyleSheetTestUtils } from 'aphrodite';


StyleSheetTestUtils.suppressStyleInjection();

describe('tests for BodySectionWithMarginBottom componenet', () => {
  it('should render a BodySection component and the props are passed to it', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );
    const PropsBodySectionComponent = wrapper.find(BodySection).props();
    expect(wrapper.find(BodySection).length).toBe(1);
    expect(PropsBodySectionComponent.title).toBe('test title');
    expect(PropsBodySectionComponent.children.type).toBe('p');
    expect(PropsBodySectionComponent.children.props.children).toBe(
      'test children node'
    );
  });
});
