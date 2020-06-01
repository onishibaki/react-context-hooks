import React, { useState } from "react";
import { useEmployeeState } from "../context";
import styled from "styled-components";

import { ActionTypes, addEmployee, updateEmployee } from "../action";

const EmployeeContainer = styled.div`
  border: 1px solid black;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const EmployeeWrapper = styled.div`
  border: 1px solid rgb(17, 17, 17);
  background-color: white;
  margin-top: 158px;
  display: inline-block;
  padding: 35px 10px 10px 10px;
  position: relative;
`;
const Button = styled.button`
  text-decoration: none;
  border: 1px solid #000000;
  padding: 10px 20px;
  font-weight: 700;
  color: black;
  font-size: 12px;
  margin: 10px 0;
  display: block;
  &:hover {
    background: #00000059;
    color: white;
  }
`;
const SpanButton = styled.span`
  font-weight: 700;
  color: black;
  font-size: 15px;
  margin: 10px 0;
  display: inline-block;
  position: absolute;
  top: -8px;
  right: 9px;
  cursor: pointer;
}
`;

const Input = styled.input`
  margin: 0 10px;
}
`;

export const Employee = () => {
  //Use Context
  const [
    {
      form,
      employee: { firstName, lastName, employee_id: employeeId },
      formMessage,
    },
    dispatch,
  ] = useEmployeeState();

  //Set state for First Name and Last Name Changes
  const [stateFirstName, setStateFirstName] = useState("");
  const [stateLastName, setStateLastName] = useState("");

  //Set state for setting blank value
  const [stateUpdateFirstName, setStateUpdateFirstName] = useState(null);
  const [stateUpdateLastNamet, setStateUpdateLastName] = useState(null);

  //Set the First Value
  let firstNameParameter = firstName;
  let lastNameParameter = lastName;

  //Parameter for Save
  const employeeParamSave = {
    stateFirstName,
    stateLastName,
  };

  //Checking for State if First name and Last name is blank to throw error
  if (stateUpdateFirstName === "") {
    firstNameParameter = stateUpdateFirstName;
  }
  if (stateUpdateLastNamet === "") {
    lastNameParameter = stateUpdateLastNamet;
  }

  //Parameter for Update
  const employeeParamUpdate = {
    employeeId,
    stateFirstName: stateFirstName || firstNameParameter,
    stateLastName: stateLastName || lastNameParameter,
  };

  //Getting the value of Input changes
  const inputChangedHandlerFirstName = (event) => {
    setStateFirstName(event.target.value);
    setStateUpdateFirstName("");
  };

  const inputChangedHandlerLastName = (event) => {
    setStateLastName(event.target.value);
    setStateUpdateLastName("");
  };

  return (
    //Condition to display Save and Update Screen
    form !== "" &&
    form !== "view" && (
      <EmployeeContainer className="employee-container">
        <EmployeeWrapper>
          <SpanButton
            onClick={() => {
              dispatch({
                type: ActionTypes.SET_FORM_STATE,
                form: "",
                data: {},
              });
              dispatch({
                type: ActionTypes.FORM_MESSAGE,
                data: "",
              });
              setStateLastName("");
              setStateFirstName("");
              setStateUpdateFirstName(null);
              setStateUpdateLastName(null);
            }}
          >
            X
          </SpanButton>
          <label>First Name: </label>
          <Input
            name="fname"
            defaultValue={firstName}
            onChange={inputChangedHandlerFirstName}
          ></Input>
          <label>Last Name: </label>
          <Input
            name="lname"
            defaultValue={lastName}
            onChange={inputChangedHandlerLastName}
          ></Input>
          {Object.keys(formMessage).length !== 0 && (
            <h2>{formMessage.message}</h2>
          )}
          {form !== "update" ? (
            <Button
              onClick={() => {
                addEmployee(employeeParamSave).then(function (response) {
                  dispatch(response);
                });
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={() => {
                updateEmployee(employeeParamUpdate).then(function (response) {
                  dispatch(response);
                });
              }}
            >
              Update
            </Button>
          )}
        </EmployeeWrapper>
      </EmployeeContainer>
    )
  );
};
