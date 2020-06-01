import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { useEmployeeState } from "../context";
import { GetAllEmployees } from "../action";

import { AssignEmployeeList } from "../common/AssignEmployees";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  display: inline-block;
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const SpinnerWrapper = styled.div`
  text-align: center;
  margin-top: 120px;
`;

const Employeepage = () => {
  const [{ employees }, dispatch] = useEmployeeState();
  useEffect(() => {
    GetAllEmployees().then(function (response) {
      dispatch(response);
    });
  }, [dispatch]);

  return Object.keys(employees).length === 0 ? (
    <SpinnerWrapper className="wrapper-Spinner">
      <Spinner />
    </SpinnerWrapper>
  ) : (
    <AssignEmployeeList props={employees} />
  );
};

export default Employeepage;
