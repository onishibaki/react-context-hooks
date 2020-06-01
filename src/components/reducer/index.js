import React, { useReducer } from "react";

import { ActionTypes } from "../action";
import { EmployeesContext } from "../context";

const appStateReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_EMPLOYEE:
      return {
        ...state,
        employees: action.data,
      };
    case ActionTypes.FORM_MESSAGE:
      return {
        ...state,
        formMessage: action.data,
      };
    case ActionTypes.SET_FORM_STATE:
      return {
        ...state,
        form: action.form,
        employee: action.data,
      };
    case ActionTypes.SET_FORM_STATE_FEEDBACK:
      return {
        ...state,
        formValue: action.form,
        feedbackValue: action.data,
        employeeId: action.id,
      };
    default:
      return state;
  }
};

const initialState = {
  employees: {},
  form: "",
  employee: {},
  formValue: "",
  feedbackValue: {},
  id: "",
  formMessage: "",
};

export const AppEmployeesProvider = ({ children }) => {
  const employeesList = useReducer(appStateReducer, initialState);
  return (
    <EmployeesContext.Provider value={employeesList}>
      {children}
    </EmployeesContext.Provider>
  );
};
