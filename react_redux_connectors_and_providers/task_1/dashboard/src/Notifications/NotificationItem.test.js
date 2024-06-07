import React from "react";
import { shallow } from "enzyme";
import NotificationItem from "./NotificationItem";
import { StyleSheetTestUtils } from "aphrodite";

describe("<NotificationItem />", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    shallow(<NotificationItem type="default" value="test" />);
  });

  it("renders correct type and value", () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.find("li").prop("data-notification-type")).toEqual("default");
    expect(wrapper.text()).toEqual("test");
  });

  it("renders correct HTML for an li element with type and value", () => {
    const wrapper = shallow(<NotificationItem type="default" value="Here is a value" />);
    expect(wrapper.find("li[data-notification-type='default']").text()).toEqual("Here is a value");
  });

  it("triggers markAsRead when li is clicked", () => {
    const markAsReadSpy = jest.fn();
    const wrapper = shallow(<NotificationItem type="default" value="test" markAsRead={markAsReadSpy} id={1} />);
    wrapper.find("li").simulate("click");
    expect(markAsReadSpy).toHaveBeenCalledWith(1);
  });
});
