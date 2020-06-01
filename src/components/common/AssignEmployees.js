import React from "react";
import { useEmployeeState } from "../context";
import styled from "styled-components";

import { ActionTypes, GetAllEmployees } from "../action";
import { Feedback } from "./Feedback";

const EmployeesWrapper = styled.div`
  border: 1px solid #000000;
  margin-top: 30px;
`;
const EmployeesDetailWrapper = styled.div`
  width: 60%;
`;

const TopMenu = styled.div`
  margin: 22px 10px;
  a {
    text-decoration: none;
    border: 1px solid #000000;
    padding: 10px 20px;
    font-weight: 700;
    color: black;
    font-size: 12px;
    margin: 0 20px;
    &:hover {
      background: #00000059;
      color: white;
    }
  }
`;

const Button = styled.button`
  text-decoration: none;
  border: 1px solid #000000;
  padding: 10px 20px;
  font-weight: 700;
  color: black;
  font-size: 12px;
  margin: 0 20px;
  &:hover {
    background: #00000059;
    color: white;
  }
`;

const Unordered = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 0 20px;
  li {
    display: flex;
    margin: 5px 0;
  }
`;
const Span = styled.span`
  font-size: 15px;
  padding: 0 20px;
  font-weight: 700;
`;

export const AssignEmployeeList = ({ props }) => {
  const { employees, status, message } = props;
  // eslint-disable-next-line
  const [stateDispatch, dispatch] = useEmployeeState();
  GetAllEmployees().then(function (response) {
    dispatch(response);
  });

  const empFlagFilter = employees.filter(
    (employeeList) => employeeList.flag === "1"
  );

  return status === 0 ? (
    <div className="main-container">{message}</div>
  ) : (
    <div className="main-container">
      <EmployeesWrapper>
        <TopMenu>
          <span>
            <a href="/">Home</a>
          </span>
        </TopMenu>
        <Unordered>
          {Object.keys(empFlagFilter).length === 0 && (
            <h5>No Assigned Employees</h5>
          )}
          {empFlagFilter.map((empFlagFilters) => {
            const { employee_id, firstName, lastName } = empFlagFilters;
            return (
              <li key={employee_id}>
                <EmployeesDetailWrapper>
                  <label>First name: </label>
                  <Span>{firstName}</Span>
                  <label>Last name: </label>
                  <Span>{lastName}</Span>
                </EmployeesDetailWrapper>
                <Button
                  onClick={() => {
                    dispatch({
                      type: ActionTypes.SET_FORM_STATE_FEEDBACK,
                      form: "save",
                      data: {},
                      id: employee_id,
                    });
                  }}
                >
                  Add Feedback
                </Button>
              </li>
            );
          })}
        </Unordered>
        <Feedback />
      </EmployeesWrapper>
    </div>
  );
};
