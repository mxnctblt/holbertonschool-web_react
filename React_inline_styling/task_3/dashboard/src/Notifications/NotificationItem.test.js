import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('NotificationItem Component', () => {
  it('renders without crashing', () => {
    shallow(<NotificationItem />);
  });

  it('renders correct html with type and value props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    const renderedHtml = wrapper.html();
    expect(renderedHtml).toEqual('<li class="default_1tsdo2i" data-notification-type="default">test</li>');
  });

  it('renders correct html with html prop', () => {
    const htmlProp = { __html: '<p>test</p>' };
    const wrapper = shallow(<NotificationItem html={htmlProp} />);
    expect(wrapper.props().dangerouslySetInnerHTML).toEqual(htmlProp);
  });

  it('verifies that when the li is clicked the function markAsRead is called with the right id', () => {
    const mockMarkAsRead = jest.fn();
    const wrapper = shallow(<NotificationItem id={1} markAsRead={mockMarkAsRead} />);
    wrapper.find('li').simulate('click');
    expect(mockMarkAsRead).toHaveBeenCalledWith(1);
  });
})
