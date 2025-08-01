import React, { useEffect, useState } from "react";
import userService from "../../_services/user.service";
import { getChildId } from "../../_store/_reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAssignmentsQuestion,
  removeAssignmentsQuestion,
} from "../../_store/_reducers/question";
import TrueFalseAssignment from "../../components/students/assignments/true-false-assignment";
import McqAssignment from "../../components/students/assignments/mcq-assignment";
import ReArrangeListAssignment from "../../components/students/assignments/re-arrange-assignment";
import LinkingAssignment from "../../components/students/assignments/linking-assignment";
import OpenClozeWithOptionsAssignment from "../../components/students/assignments/open-close-with-options-assignment";
import OpenClozeWithDropdownAssignment from "../../components/students/assignments/open-close-with-dropdown-assignment";
import ComprehensionAssignment from "../../components/students/assignments/comprehension-assignment";
import EditingAssignment from "../../components/students/assignments/editing-assignment";
import FillInTheBlankAssignment from "../../components/students/assignments/fill-in-the-blank-assignment";
import toast from "react-hot-toast";
import loader from "../../assets/images/loader.gif";

const WeeklyAssignment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const childId = useSelector(getChildId);
  const assignmentAnswer = useSelector(getAssignmentsQuestion);
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(true);
  const getAssignments = async () => {
    try {
      const data = await userService.getStudentAssignment({
        student_id: childId,
      });
      setQuestions(data?.data?.find((item) => item?.id == id));
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchAttempt = async () => {
    if (assignmentAnswer && assignmentAnswer?.length <= 0) {
      return toast.error(
        "Please answer at least one question before submitting."
      );
    }
    await userService
      .assignmentAttempt({
        assignment_id: id,
        answers: assignmentAnswer,
      })
      .then((data) => {
        toast.success("Assignment submitted successfully.");
        toast.success(data.data.message);
        getAssignments();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  useEffect(() => {
    getAssignments();
  }, []);
  useEffect(() => {
    return () => {
      dispatch(removeAssignmentsQuestion());
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = "Are you sure you want to reload the page?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-3">
        <img src={loader} width={100} alt="Loading..." />
      </div>
    );
  }
  return (
    <>
      {questions?.questions?.length > 0 ? (
        questions.questions.map((question, index) => {
          return (
            <div className="question-list assignment-question" key={index}>
              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "true_false" && (
                  <TrueFalseAssignment question={question} index={index} />
                )}
              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "mcq" && (
                  <McqAssignment question={question} index={index} />
                )}

              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "rearranging" && (
                  <ReArrangeListAssignment question={question} index={index} />
                )}

              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "linking" && (
                  <LinkingAssignment question={question} index={index} />
                )}

              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) ==
                  "open_cloze_with_options" && (
                  <OpenClozeWithOptionsAssignment
                    question={question}
                    index={index}
                  />
                )}

              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) ==
                  "open_cloze_with_dropdown_options" && (
                  <OpenClozeWithDropdownAssignment
                    question={question}
                    index={index}
                  />
                )}

              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "comprehension" && (
                  <ComprehensionAssignment question={question} index={index} />
                )}

              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "editing" && (
                  <EditingAssignment question={question} index={index} />
                )}

              {question &&
                (question?.question?.type ||
                  question?.question?.question_type) == "fill_in_the_blank" && (
                  <FillInTheBlankAssignment question={question} index={index} />
                )}
            </div>
          );
        })
      ) : (
        <p>No Questions found</p>
      )}
      <button onClick={fetchAttempt} className="dashboard-button">
        Final Submit
      </button>
    </>
  );
};

export default WeeklyAssignment;
