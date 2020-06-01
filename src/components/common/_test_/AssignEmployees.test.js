import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";

import { AssignEmployeeList } from "../AssignEmployees";
import { AppEmployeesProvider } from "../../reducer";
import { Feedback } from "../Feedback";

configure({ adapter: new Adapter() });

const employees = {
  status: 1,
  message: "Success",
  employees: [
    {
      employee_id: 1,
      firstName: "Mau",
      lastName: "Maya",
      flag: "1",
      feedbacklist: [],
    },
  ],
};

const NoAssignedEmployees = {
  status: 1,
  message: "Success",
  employees: [
    {
      employee_id: 1,
      firstName: "Felix",
      lastName: "San",
      flag: "0",
      feedbacklist: [],
    },
  ],
};

const databaseError = {
  status: 0,
  message: "Database Error",
  employees: [],
};

describe("Assigned Employees Component Test", () => {
  let wrapperEmployees;
  beforeEach(() => {
    wrapperEmployees = mount(
      <AppEmployeesProvider>
        <AssignEmployeeList props={employees} />
      </AppEmployeesProvider>
    );
  });

  afterEach(cleanup);
  it("Assigned Employees Component Renders Correctlyy", () => {
    const div = document.createElement("div");
    render(
      <AppEmployeesProvider>
        <AssignEmployeeList props={employees} />
      </AppEmployeesProvider>,
      div
    );
  });

  it("Check if No assigned Employees", () => {
    const wrapper = mount(
      <AppEmployeesProvider>
        <AssignEmployeeList props={NoAssignedEmployees} />
      </AppEmployeesProvider>
    );
    const noAssigned = wrapper.find("h5").at(0).text();
    expect(noAssigned).toEqual("No Assigned Employees");
  });

  it("Check if Assigned Employees", () => {
    const firstName = wrapperEmployees.find("span").at(1).text();
    const LastName = wrapperEmployees.find("span").at(2).text();
    expect(firstName).toEqual("Mau");
    expect(LastName).toEqual("Maya");
  });

  it("Check Database Error Display", () => {
    const wrapper = mount(
      <AppEmployeesProvider>
        <AssignEmployeeList props={databaseError} />
      </AppEmployeesProvider>
    );

    const errorDisplay = wrapper.find("div").text();
    expect(errorDisplay).toEqual("Database Error");
  });

  it("Check if FeedBack Component is Declare", () => {
    expect(wrapperEmployees.find(Feedback).length).toBe(1);
  });

  it("Check if FeedBack Component is Diplayed When Button Click", () => {
    wrapperEmployees.find("button").simulate("click");
    expect(wrapperEmployees.find(".feedback-container").exists()).toBeTruthy();
  });

  it("Assigned Employees Component Test Check Matches Snapshot Display Employee", () => {
    const Snapshot = renderer
      .create(
        <AppEmployeesProvider>
          <AssignEmployeeList props={employees} />
        </AppEmployeesProvider>
      )
      .toJSON();
    expect(Snapshot).toMatchSnapshot();
  });

  it("Assigned Employees Component Test Check Matches Snapshot Display Error", () => {
    const Snapshot = renderer
      .create(
        <AppEmployeesProvider>
          <AssignEmployeeList props={databaseError} />
        </AppEmployeesProvider>
      )
      .toJSON();
    expect(Snapshot).toMatchSnapshot();
  });
});
