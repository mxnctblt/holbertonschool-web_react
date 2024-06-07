import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';


describe('WithLogging HOC', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log on mount and unmount with "Component" when the wrapped element is pure HTML', () => {
    const Component = WithLogging(() => <p>test</p>);
    const wrapper = mount(<Component />);
    expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted');
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Component Component is going to unmount');
  });

  it('should log on mount and unmount with the component name when the wrapped element is the Login component', () => {
    const Login = () => <div>Login</div>;
    Login.displayName = 'Login';

    const ComponentWithLogging = WithLogging(Login);
    const wrapper = mount(<ComponentWithLogging />);
    expect(consoleSpy).toHaveBeenCalledWith('Component Login is mounted');
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Component Login is going to unmount');
  });
});
