import React from "react";
import { shallow } from "enzyme";
import { Footer } from "./Footer";
import { StyleSheetTestUtils } from "aphrodite";
import { defaultUser } from "../App/AppContext";

describe("Footer component", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    const wrapper = shallow(<Footer user={defaultUser} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a p tag with 'Copyright'", () => {
    const wrapper = shallow(<Footer user={defaultUser} />);
    expect(wrapper.text()).toContain("Copyright");
  });

  it("does not display the Contact us link when user is logged out", () => {
    const wrapper = shallow(<Footer user={defaultUser} />);
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it("displays the Contact us link when user is logged in", () => {
    const loggedInUser = { email: 'test@example.com', password: 'password', isLoggedIn: true };
    const wrapper = shallow(<Footer user={loggedInUser} />);
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('a').text()).toBe('Contact us');
  });
});
