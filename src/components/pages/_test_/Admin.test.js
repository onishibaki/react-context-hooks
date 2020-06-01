import React from "react";
import { render, cleanup } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";

import * as EmployeesContext from "../../context";
import Adminpage from "../Adminpage";

configure({ adapter: new Adapter() });

describe("Feedback Component Test", () => {
  const employees = [
    {
      status: 1,
      message: "Success",
      employees: [],
    },
  ];
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

  it("Admin Page Component Renders Correctly", () => {
    setValue(employees);
    render(<Adminpage />, container);
  });

  it("Check Spinner Displayed", () => {
    setValue(employees);
    const wrapper = mount(<Adminpage />);
    expect(wrapper.find(".wrapper-Spinner").exists()).toBeTruthy();
  });
});
