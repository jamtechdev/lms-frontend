import React, { useEffect, useState } from "react";
import userService from "../../_services/user.service";
import { getChildId } from "../../_store/_reducers/auth";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSelected } from "../../_store/_reducers/question";
import TrueFalseAssignment from "../../components/students/assignments/true-false-assignment";
import McqAssignment from "../../components/students/assignments/mcq-assignment";
import ReArrangeListAssignment from "../../components/students/assignments/re-arrange-assignment";

const WeeklyAssignment = () => {
  const { id } = useParams();
  const childId = useSelector(getChildId);
  const answersStore = useSelector(getSelected);
  console.log(answersStore, "================");
  const [questions, setQuestions] = useState();

  const getAssignments = async () => {
    try {
      const data = await userService.getStudentAssignment({
        student_id: childId,
      });
      setQuestions(data?.data?.find((item) => item?.id == id));
    } catch (error) {
      console.error("Error", error);
    }
  };
  const fetchAttempt = async () => {
    try {
      const updatedAnswers = answersStore.map((item) => {
        const { answer, ...rest } = item;
        return { ...rest, user_answer: answer };
      });
      const data = await userService.assignmentAttempt({
        assignment_id: id,
        answers: updatedAnswers,
      });
      console.log(data, "===============");
    } catch (error) {
      console.error("Error", error);
    }
  };
  const fetchresults = async () => {
    try {
      const data = await userService.getresult({});
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    getAssignments();
  }, []);

  return (
    <>
      <div>Week Assignments</div>
      {questions &&
        questions?.questions?.map((question, index) => {
          return (
            <div key={index}>
              {/* {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "true_false" && (
                  <TrueFalseAssignment question={question} index={index} />
                )} */}
              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "mcq" && (
                  <McqAssignment question={question} index={index} />
                )}

              {/* {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "rearranging" && (
                  <ReArrangeListAssignment question={question} index={index} />
                )} */}
              {/*
              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "linking" && (
                  <LinkingQuestions question={question} index={adjustedIndex} />
                )}
              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) ==
                  "open_cloze_with_options" && (
                  <OpenClozeWithOptions
                    question={question}
                    index={adjustedIndex}
                  />
                )}
              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) ==
                  "open_cloze_with_dropdown_options" && (
                  <OpenClozeWithDropdown
                    question={question}
                    index={adjustedIndex}
                  />
                )}
              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "comprehension" && (
                  <Comprehension question={question} index={adjustedIndex} />
                )}
              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "editing" && (
                  <EditingQuesions question={question} index={adjustedIndex} />
                )}
              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "fill_in_the_blank" && (
                  <FillInTheBlank question={question} index={adjustedIndex} />
                )} */}
            </div>
          );
        })}
      <button onClick={fetchAttempt} className="dashboard-button">
        Final Submit
      </button>
    </>
  );
};

export default WeeklyAssignment;
