import React from "react";
import styled from "styled-components";

import { ActionTypes, DeleteEmployee, GetAllEmployees } from "../action";

import { useEmployeeState } from "../context";
import { Employee } from "./Employee";
import { FeedBackList } from "./FeedbackList";

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

const SaveButton = styled(Button)`
  float: right;
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

export const Employeelist = ({ props }) => {
  const { employees, status, message } = props;
  // eslint-disable-next-line
  const [stateDispatch, dispatch] = useEmployeeState();
  GetAllEmployees().then(function (response) {
    dispatch(response);
  });

  return status === 0 ? (
    <div className="main-container">{message}</div>
  ) : (
    <div className="main-container">
      <EmployeesWrapper>
        <TopMenu>
          <SaveButton
            onClick={() => {
              dispatch({
                type: ActionTypes.SET_FORM_STATE,
                form: "save",
                data: {},
              });
            }}
          >
            Add
          </SaveButton>
          <span>
            <a href="/">Home</a>
          </span>
        </TopMenu>
        <Unordered>
          {employees.map((employee) => {
            const { employee_id, firstName, lastName } = employee;
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
                    DeleteEmployee(employee_id);
                  }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    dispatch({
                      type: ActionTypes.SET_FORM_STATE,
                      form: "update",
                      data: employee,
                    });
                  }}
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    dispatch({
                      type: ActionTypes.SET_FORM_STATE,
                      form: "view",
                      data: employee,
                    });
                  }}
                >
                  View
                </Button>
              </li>
            );
          })}
        </Unordered>
      </EmployeesWrapper>
      <Employee />
      <FeedBackList />
    </div>
  );
};
