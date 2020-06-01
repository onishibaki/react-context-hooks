import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";

import { Employee } from "../Employee";
import { FeedBackList } from "../FeedbackList";
import { Employeelist } from "../Employeelist";
import { AppEmployeesProvider } from "../../reducer";

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
    {
      employee_id: 2,
      firstName: "Jack",
      lastName: "Shin",
      flag: "0",
      feedbacklist: [],
    },
  ],
};

const NoEmployees = {
  status: 1,
  message: "Success",
  employees: [],
};

const databaseError = {
  status: 0,
  message: "Database Error",
  employees: [],
};

describe("Employee List Component Test", () => {
  let wrapperEmployees;
  beforeEach(() => {
    wrapperEmployees = mount(
      <AppEmployeesProvider>
        <Employeelist props={employees} />
      </AppEmployeesProvider>
    );
  });

  afterEach(cleanup);
  it("Employee List Component Renders Correctly", () => {
    const div = document.createElement("div");
    render(
      <AppEmployeesProvider>
        <Employeelist props={employees} />
      </AppEmployeesProvider>,
      div
    );
  });

  it("Check if No assigned Employees", () => {
    const wrapper = mount(
      <AppEmployeesProvider>
        <Employeelist props={NoEmployees} />
      </AppEmployeesProvider>
    );
    const noEmployees = wrapper.find("li").exists();
    expect(noEmployees).toBeFalsy();
  });

  it("Check List of Employees", () => {
    const RowOnefirstName = wrapperEmployees.find("li span").at(0).text();
    const RowOneLastName = wrapperEmployees.find("li span").at(1).text();
    const RowtwofirstName = wrapperEmployees.find("li span").at(2).text();
    const RowtwoLastNames = wrapperEmployees.find("li span").at(3).text();
    expect(RowOnefirstName).toEqual("Mau");
    expect(RowOneLastName).toEqual("Maya");
    expect(RowtwofirstName).toEqual("Jack");
    expect(RowtwoLastNames).toEqual("Shin");
  });

  it("Check Database Error Display", () => {
    const wrapper = mount(
      <AppEmployeesProvider>
        <Employeelist props={databaseError} />
      </AppEmployeesProvider>
    );

    const errorDisplay = wrapper.find("div").text();
    expect(errorDisplay).toEqual("Database Error");
  });

  it("Check if Employee Component is Declare", () => {
    expect(wrapperEmployees.find(Employee).length).toBe(1);
  });

  it("Check if Employee Component is Declare", () => {
    expect(wrapperEmployees.find(FeedBackList).length).toBe(1);
  });

  it("Check if FeedBack Component is Diplayed When Button Click", () => {
    wrapperEmployees.find("button").at(0).simulate("click");
    expect(wrapperEmployees.find(".employee-container").exists()).toBeTruthy();
  });

  it("Check if FeedBack Component is Diplayed When Button Click", () => {
    wrapperEmployees.find("button").at(2).simulate("click");
    expect(wrapperEmployees.find(".employee-container").exists()).toBeTruthy();
  });

  it("Check if FeedBack Component is Diplayed When Button Click", () => {
    wrapperEmployees.find("button").at(3).simulate("click");
    expect(
      wrapperEmployees.find(".feedback-list-container").exists()
    ).toBeTruthy();
  });

  it("Assigned Employee List Component Test Check Matches Snapshot Display Employee", () => {
    const Snapshot = renderer
      .create(
        <AppEmployeesProvider>
          <Employeelist props={employees} />
        </AppEmployeesProvider>
      )
      .toJSON();
    expect(Snapshot).toMatchSnapshot();
  });

  it("Assigned Employee List Component Test Check Matches Snapshot Display Error", () => {
    const Snapshot = renderer
      .create(
        <AppEmployeesProvider>
          <Employeelist props={databaseError} />
        </AppEmployeesProvider>
      )
      .toJSON();
    expect(Snapshot).toMatchSnapshot();
  });
});
