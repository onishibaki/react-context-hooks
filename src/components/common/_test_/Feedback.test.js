import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";

import * as EmployeesContext from "../../context";
import { Feedback } from "../Feedback";

configure({ adapter: new Adapter() });

describe("Feedback Component Test", () => {
  let setValue;
  let container;
  beforeEach(() => {
    setValue = (dataParameter) => {
      jest
        .spyOn(EmployeesContext, "useEmployeeState")
        .mockImplementation(() => dataParameter);
    };
    container = document.createElement("div");
  });

  afterEach(cleanup);

  it("Feedback Component Renders Correctly", () => {
    const data = [
      {
        formValue: "save",
        feedbackValue: {},
        formMessage: "",
      },
    ];
    setValue(data);
    render(<Feedback />, container);
  });

  it("Check Feedback Save Button", () => {
    const data = [
      {
        formValue: "save",
        feedbackValue: {},
        formMessage: "",
      },
    ];
    setValue(data);
    const wrapper = mount(<Feedback />);
    const save = wrapper.find("button").text();
    expect(save).toEqual("Save");
  });

  it("Check Feedback Update Button", () => {
    const data = [
      {
        formValue: "update",
        feedbackValue: {},
        formMessage: "",
      },
    ];
    setValue(data);
    const wrapper = mount(<Feedback />);
    const update = wrapper.find("button").text();
    expect(update).toEqual("Update");
  });

  it("Check Error Message Displayed", () => {
    const data = [
      {
        formValue: "save",
        feedbackValue: {},
        formMessage: {
          status: 0,
          message: "Feedback is a required field",
        },
      },
    ];
    setValue(data);
    const wrapper = mount(<Feedback />);
    const h2 = wrapper.find("h2").text();
    expect(h2).toEqual("Feedback is a required field");
  });

  it("Check Textarea Display Feedback", () => {
    const data = [
      {
        formValue: "update",
        feedbackValue: {
          feedback_id: 1,
          feedback: "Nice Work",
          assign_id: 0,
        },
        formMessage: {},
      },
    ];
    setValue(data);
    const wrapper = mount(<Feedback />);
    const textarea = wrapper.find("textarea").text();
    expect(textarea).toEqual("Nice Work");
  });

  it("Check Feedback Component Test to Match Snapshot Display", () => {
    const data = [
      {
        formValue: "update",
        feedbackValue: {
          feedback_id: 1,
          feedback: "Nice Work",
          assign_id: 0,
        },
        formMessage: {},
      },
    ];
    setValue(data);
    const Snapshot = renderer.create(<Feedback />).toJSON();
    expect(Snapshot).toMatchSnapshot();
  });
});
