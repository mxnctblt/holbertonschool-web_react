import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

describe('tests for NotificationItem component', () => {
  it('should render without crashing', () => {
    shallow(<NotificationItem />);
  });

  it('should render the correct html when passing dummy props for type and value', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.html()).toBe(
      '<li data-notification-type="default">test</li>'
    );
  });

  it('should render the correct html when passing dummy props for html', () => {
    const wrapper = shallow(
      <NotificationItem html={{ __html: '<u>test</u>' }} />
    );
    expect(wrapper.html()).toBe(
      '<li data-notification-type="default"><u>test</u></li>'
    );
  });
});
