import React, { useState } from "react";
import { useEmployeeState } from "../context";
import styled from "styled-components";

import {
  ActionTypes,
  updateFeedback,
  addFeedback,
  updateEmployeeFlag,
} from "../action";

const FeedBackContainer = styled.div`
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

const FeedBackWrapper = styled.div`
  border: 1px solid rgb(17, 17, 17);
  background-color: white;
  margin-top: 158px;
  display: inline-block;
  padding: 35px 10px 10px 10px;
  position: relative;
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

const Textarea = styled.textarea`
  display: block;
  height: 100px;
  width: 350px;
`;

const Label = styled.label`
  display: block;
  text-align: left;
`;

export const Feedback = () => {
  //Use Context
  const [
    {
      formValue,
      employeeId,
      feedbackValue: { feedback_id: feedBackId, feedback },
      formMessage,
    },
    dispatch,
  ] = useEmployeeState();
  //Set state for FeedBack Changes
  const [stateFeedback, setFeedback] = useState("");

  //Checking for State if feedBack name is blank to throw error
  const [stateUpdateFeedback, setUpdateFeedback] = useState(null);

  //Set the First Value
  let feedBackParameter = feedback;

  //Parameter for Save
  const feedBackSaveParam = {
    employeeId,
    stateFeedback,
    flag: stateFeedback ? 0 : 1,
  };

  //Checking for State if feedBack is blank to throw error
  if (stateUpdateFeedback === "") {
    feedBackParameter = stateUpdateFeedback;
  }

  //Parameter for Update
  const feedBackUpdateParam = {
    employeeId,
    feedBackId,
    stateFeedback: stateFeedback || feedBackParameter,
  };

  //Getting the value of Input changes
  const inputChangedHandler = (event) => {
    setFeedback(event.target.value);
    setUpdateFeedback("");
  };

  return (
    //Condition to display Feedback Screen
    formValue !== "" && (
      <FeedBackContainer className="feedback-container">
        <FeedBackWrapper>
          <SpanButton
            onClick={() => {
              dispatch({
                type: ActionTypes.FORM_MESSAGE,
                data: "",
              });
              dispatch({
                type: ActionTypes.SET_FORM_STATE_FEEDBACK,
                form: "",
                data: {},
                id: "",
              });
              dispatch({
                type: ActionTypes.SET_FORM_STATE,
                form: "",
                data: {},
              });
              setFeedback("");
              setUpdateFeedback(null);
            }}
          >
            X
          </SpanButton>
          <Label>Feedback: </Label>
          <Textarea
            name="feedback"
            defaultValue={feedback}
            onChange={inputChangedHandler}
          ></Textarea>
          {Object.keys(formMessage).length !== 0 && (
            <h2>{formMessage.message}</h2>
          )}
          {formValue !== "update" ? (
            <Button
              onClick={() => {
                addFeedback(feedBackSaveParam).then(function (response) {
                  dispatch(response);
                });
                updateEmployeeFlag(feedBackSaveParam);
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={() => {
                updateFeedback(feedBackUpdateParam).then(function (response) {
                  dispatch(response);
                });
              }}
            >
              Update
            </Button>
          )}
        </FeedBackWrapper>
      </FeedBackContainer>
    )
  );
};
