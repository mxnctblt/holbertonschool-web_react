import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";
import { StyleSheetTestUtils } from "aphrodite";

describe("login component", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    shallow(<Login />);
  });

  it("renders 2 input tags and 2 label tags", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("input[type='email']")).toHaveLength(1);
    expect(wrapper.find("input[type='password']")).toHaveLength(1);
    expect(wrapper.find("label")).toHaveLength(2);
  });

  it("submit button is disabled by default", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("input[type='submit']").prop('disabled')).toBe(true);
  });

  it("submit button is enabled when email and password are not empty", () => {
    const wrapper = shallow(<Login />);
    wrapper.find("input[type='email']").simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find("input[type='password']").simulate('change', { target: { value: 'password' } });
    expect(wrapper.find("input[type='submit']").prop('disabled')).toBe(false);
  });
});
