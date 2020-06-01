import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";

import * as EmployeesContext from "../../context";
import { Employee } from "../Employee";

configure({ adapter: new Adapter() });

describe("Employee Component Test", () => {
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
        form: "save",
        employee: {},
        formMessage: "",
      },
    ];
    setValue(data);
    render(<Employee />, container);
  });

  it("Check Employee Save Button", () => {
    const data = [
      {
        form: "save",
        employee: {},
        formMessage: "",
      },
    ];
    setValue(data);
    const wrapper = mount(<Employee />);
    const save = wrapper.find("button").text();
    expect(save).toEqual("Save");
  });

  it("Check Employee Update Button", () => {
    const data = [
      {
        form: "update",
        employee: {},
        formMessage: "",
      },
    ];
    setValue(data);
    const wrapper = mount(<Employee />);
    const update = wrapper.find("button").text();
    expect(update).toEqual("Update");
  });

  it("Check Error Message Displayed", () => {
    const data = [
      {
        form: "save",
        employee: {},
        formMessage: {
          status: 0,
          message: "First Name is a required field",
        },
      },
    ];
    setValue(data);
    const wrapper = mount(<Employee />);
    const h2 = wrapper.find("h2").text();
    expect(h2).toEqual("First Name is a required field");
  });

  it("Check Input Display Employee", () => {
    const data = [
      {
        form: "update",
        employee: {
          employee_id: 1,
          firstName: "Yama",
          lastName: "Cruz",
        },
        formMessage: {},
      },
    ];
    setValue(data);
    const wrapper = mount(<Employee />);
    const firstNameValue = wrapper.find("input").at(0).instance().value;
    const lastNameValue = wrapper.find("input").at(1).instance().value;
    expect(firstNameValue).toEqual("Yama");
    expect(lastNameValue).toEqual("Cruz");
  });

  it("Check Employee Component Test to Match Snapshot Display", () => {
    const data = [
      {
        form: "update",
        employee: {
          employee_id: 1,
          firstName: "Yama",
          lastName: "Cruz",
        },
        formMessage: {},
      },
    ];
    setValue(data);
    const Snapshot = renderer.create(<Employee />).toJSON();
    expect(Snapshot).toMatchSnapshot();
  });
});
