import React from "react";
import { mount } from "enzyme";
import Footer from "./Footer";
import { StyleSheetTestUtils } from "aphrodite";
import { AppContext, defaultUser } from "../App/AppContext";

describe("Footer component", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a p tag with 'Copyright'", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toContain("Copyright");
  });

  it("does not display the Contact us link when user is logged out", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it("displays the Contact us link when user is logged in", () => {
    const loggedInUser = { email: 'test@example.com', password: 'password', isLoggedIn: true };
    const wrapper = mount(
      <AppContext.Provider value={{ user: loggedInUser, logOut: jest.fn() }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('a').text()).toBe('Contact us');
  });
});
