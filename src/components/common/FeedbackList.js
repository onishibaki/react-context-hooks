import React from "react";
import { useEmployeeState } from "../context";
import styled from "styled-components";

import { ActionTypes, updateEmployeeFlag } from "../action";
import { Feedback } from "./Feedback";

const FeedbackListContainer = styled.div`
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

const FeedbackListWrapper = styled.div`
  border: 1px solid rgb(17, 17, 17);
  background-color: white;
  display: inline-block;
  position: relative;
`;

const Button = styled.button`
  text-decoration: none;
  border: 1px solid #000000;
  padding: 10px 20px;
  font-weight: 700;
  color: black;
  font-size: 12px;
  margin: 25px 10px 10px 10px;
  display: inline-block;
  height: 100%;
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

const Paragraph = styled.p`
  border: 1px solid black;
  padding: 5px;
  margin-right: 20px;
  text-align: left;
  word-wrap: break-word;
  font-size: 12px;
  width: 500px;
  height: 54px;
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

export const FeedBackList = () => {
  const [
    {
      form,
      employee: { employee_id, feedbacklist },
    },
    dispatch,
  ] = useEmployeeState();

  const feedBackParam = {
    employeeId: employee_id,
    flag: 1,
  };

  return (
    form === "view" && (
      <FeedbackListContainer className="feedback-list-container">
        <FeedbackListWrapper>
          <SpanButton
            onClick={() =>
              dispatch({
                type: ActionTypes.SET_FORM_STATE,
                form: "",
                data: {},
              })
            }
          >
            X
          </SpanButton>
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
          <Button
            onClick={() => {
              updateEmployeeFlag(feedBackParam);
              dispatch({
                type: ActionTypes.SET_FORM_STATE,
                form: "",
                data: {},
              });
            }}
          >
            Assign Feedback
          </Button>
          <Unordered>
            {feedbacklist.map((feedbacklists) => {
              const { feedback_id, feedback } = feedbacklists;
              return feedback_id !== null ? (
                <li key={feedback_id}>
                  <Paragraph>{feedback}</Paragraph>
                  <Button
                    onClick={() => {
                      dispatch({
                        type: ActionTypes.SET_FORM_STATE_FEEDBACK,
                        form: "update",
                        data: feedbacklists,
                        id: employee_id,
                      });
                    }}
                  >
                    Update
                  </Button>
                </li>
              ) : (
                <h5 key="0">No Feedback</h5>
              );
            })}
          </Unordered>
          <Feedback />
        </FeedbackListWrapper>
      </FeedbackListContainer>
    )
  );
};
