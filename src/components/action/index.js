import axios from "axios";
const HTTP_ENDPOINT = "http://localhost:8080/";
export const ActionTypes = {
  GET_ALL_EMPLOYEE: "GET_ALL_EMPLOYEE",
  ASSIGN_EMPLOYEE: "ASSIGN_EMPLOYEE",
  SET_FORM_STATE: "SET_FORM_STATE",
  SET_FORM_STATE_FEEDBACK: "SET_FORM_STATE_FEEDBACK",
  FORM_MESSAGE: "FORM_MESSAGE",
};

export const GetAllEmployees = () => {
  return new Promise(function (resolve, reject) {
    axios
      .get(`${HTTP_ENDPOINT}employees`)
      .then(({ data }) => data)
      .then((employees) =>
        resolve({
          type: ActionTypes.GET_ALL_EMPLOYEE,
          data: employees,
        })
      )
      .catch((err) => {
        reject(err);
      });
  });
};

export const DeleteEmployee = (id) => {
  axios
    .delete(`${HTTP_ENDPOINT}employees/delete?employee_id=${id}`)
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);
    });
};

export const addEmployee = ({ stateFirstName, stateLastName }) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(
        `${HTTP_ENDPOINT}employees/add?firstName=${stateFirstName}&lastName=${stateLastName}`
      )
      .then(({ data }) => data)
      .then((message) =>
        resolve({
          type: ActionTypes.FORM_MESSAGE,
          data: message,
        })
      )
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateEmployee = ({
  employeeId,
  stateFirstName,
  stateLastName,
}) => {
  return new Promise(function (resolve, reject) {
    axios
      .put(
        `${HTTP_ENDPOINT}employees/update?employee_id=${employeeId}&firstName=${stateFirstName}&lastName=${stateLastName}`
      )
      .then(({ data }) => data)
      .then((message) =>
        resolve({
          type: ActionTypes.FORM_MESSAGE,
          data: message,
        })
      )
      .catch((err) => {
        reject(err);
      });
  });
};

export const addFeedback = ({ employeeId, stateFeedback, assignId = 0 }) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(
        `${HTTP_ENDPOINT}feedback/add?feedback=${stateFeedback}&assign_id=${assignId}&employee_id=${employeeId}`
      )
      .then(({ data }) => data)
      .then((message) =>
        resolve({
          type: ActionTypes.FORM_MESSAGE,
          data: message,
        })
      )
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateFeedback = ({ feedBackId, stateFeedback }) => {
  return new Promise(function (resolve, reject) {
    axios
      .put(
        `${HTTP_ENDPOINT}feedback/update?feedback_id=${feedBackId}&feedback=${stateFeedback}`
      )
      .then(({ data }) => data)
      .then((message) =>
        resolve({
          type: ActionTypes.FORM_MESSAGE,
          data: message,
        })
      )
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateEmployeeFlag = ({ employeeId, flag }) => {
  axios
    .put(
      `${HTTP_ENDPOINT}employees/update/flag?employee_id=${employeeId}&flag=${flag}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);
    });
};
