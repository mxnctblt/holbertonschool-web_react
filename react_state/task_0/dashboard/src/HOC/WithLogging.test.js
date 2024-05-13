import React from 'react';
import { shallow } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';

describe('tests for WithLogging component', () => {
  it('should console.log was called on mount and on unmount with Component when the wrapped element is pure html ', () => {
    const consoleLogMock = jest.spyOn(console, 'log');
    const wrapper = shallow(
      <WithLogging>
        <p />
      </WithLogging>
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      'Component Component is mounted'
    );
    wrapper.unmount();
    expect(consoleLogMock).toHaveBeenCalledWith(
      'Component Component is going to unmount'
    );
    consoleLogMock.mockRestore();
  });

  it('should console.log was called on mount and on unmount with the name of the component when the wrapped element is a React node', () => {
    const consoleLogMock = jest.spyOn(console, 'log');
    const wrapper = shallow(
      <WithLogging>
        <Login />
      </WithLogging>
    );
    expect(consoleLogMock).toHaveBeenCalledWith('Component Login is mounted');
    wrapper.unmount();
    expect(consoleLogMock).toHaveBeenCalledWith(
      'Component Login is going to unmount'
    );
    consoleLogMock.mockRestore();
  });
});
