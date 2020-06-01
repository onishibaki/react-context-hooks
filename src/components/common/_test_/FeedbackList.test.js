import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";

import * as EmployeesContext from "../../context";
import { FeedBackList } from "../FeedbackList";

configure({ adapter: new Adapter() });

describe("FeedbackList Component Test", () => {
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

  it("Feedback List Component Renders Correctly", () => {
    const data = [
      {
        form: "view",
        formValue: "",
        feedbackValue: {},
        employee: {
          employee_id: 1,
          firstName: "Yama",
          lastName: "Cruz",
          feedbacklist: [
            {
              feedback_id: 1,
              feedback: "Good Job",
              assign_id: 0,
            },
          ],
        },
      },
    ];
    setValue(data);
    render(<FeedBackList />, container);
  });

  it("Check No Feedback Displayed", () => {
    const data = [
      {
        form: "view",
        formValue: "",
        feedbackValue: {},
        employee: {
          employee_id: 1,
          firstName: "Yama",
          lastName: "Cruz",
          feedbacklist: [
            {
              feedback_id: null,
              feedback: null,
              assign_id: null,
            },
          ],
        },
      },
    ];
    setValue(data);
    const wrapper = mount(<FeedBackList />);
    const h5 = wrapper.find("h5").text();
    expect(h5).toEqual("No Feedback");
  });

  it("Check FeedBack Displayed with Update Button", () => {
    const data = [
      {
        form: "view",
        formValue: "",
        feedbackValue: {},
        employee: {
          employee_id: 1,
          firstName: "Yama",
          lastName: "Cruz",
          feedbacklist: [
            {
              feedback_id: 1,
              feedback: "Good Job",
              assign_id: 0,
            },
          ],
        },
      },
    ];
    setValue(data);
    const wrapper = mount(<FeedBackList />);
    const updateButton = wrapper.find("li button").text();
    const feedback = wrapper.find("li p").text();
    expect(updateButton).toEqual("Update");
    expect(feedback).toEqual("Good Job");
  });

  it("Check Feedbacklist Component Test to Match Snapshot Display", () => {
    const data = [
      {
        form: "view",
        formValue: "",
        feedbackValue: {},
        employee: {
          employee_id: 1,
          firstName: "Yama",
          lastName: "Cruz",
          feedbacklist: [
            {
              feedback_id: 1,
              feedback: "Good Job",
              assign_id: 0,
            },
          ],
        },
      },
    ];
    setValue(data);
    const Snapshot = renderer.create(<FeedBackList />).toJSON();
    expect(Snapshot).toMatchSnapshot();
  });
});
