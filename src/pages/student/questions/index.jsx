import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLevel, getStudentType } from "../../../_store/_reducers/auth";
import userService from "../../../_services/user.service";
import { useLocation } from "react-router-dom";
import { removeAttemptQuestions } from "../../../_store/_reducers/question";
import ReArrangeList from "../../../components/students/re-arrange";
import McqQuestions from "../../../components/students/mcq-questions";
import TrueFalseQuestions from "../../../components/students/true-false";
import OpenClozeWithOptions from "../../../components/students/open-close-with-options";
import LinkingQuestions from "../../../components/students/linking-questions";
import OpenClozeWithDropdown from "../../../components/students/open-close-with-dropdown";
import EditingQuesions from "../../../components/students/editing-questions";
import FillInTheBlank from "../../../components/students/fill-in-the-blank";
import Comprehension from "../../../components/students/comprehension";
import loader from "../../../assets/images/loader.gif";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const AllQuestions = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const subject = queryParams.get("sub");
  const topic = queryParams.get("topic");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const education = useSelector(getStudentType);
  const level = useSelector(getLevel);
  const [page, setPage] = useState(1);
  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const data = {
        education_type: education,
        level_id: level,
        subject_id: subject,
        type: type,
        topic_id: topic,
      };
      const response = await userService.getAllQuestion(page, data);
      const questionsData = response?.data;
      if (questionsData?.questions_array?.length) {
        const shuffledArray = [...questionsData.questions_array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
          ];
        }
        questionsData.questions_array = shuffledArray;
      }
      setQuestions(questionsData);
    } catch (err) {
      console.log(err?.response?.data?.message || "Failed, please try again");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuestion();
  }, [page, type, subject, topic]);
  useEffect(() => {
    return () => {
      dispatch(removeAttemptQuestions());
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
      <div>
        {questions && questions?.questions_array?.length == 0 && (
          <p>No Questions found</p>
        )}
        {questions &&
          questions?.questions_array?.map((question, index) => {
            const adjustedIndex = index + (page - 1);
            return (
              <div key={index} className="question-list">
                {question &&
                  (question?.question?.type ||
                    question?.question?.question_type) == "true_false" && (
                    <TrueFalseQuestions
                      question={question}
                      index={adjustedIndex}
                    />
                  )}
                {question &&
                  (question?.question?.type ||
                    question?.question?.question_type) == "mcq" && (
                    <McqQuestions question={question} index={adjustedIndex} />
                  )}
                {question &&
                  (question?.question?.type ||
                    question?.question?.question_type) == "rearranging" && (
                    <ReArrangeList question={question} index={adjustedIndex} />
                  )}
                {question &&
                  (question?.question?.type ||
                    question?.question?.question_type) == "linking" && (
                    <LinkingQuestions
                      question={question}
                      index={adjustedIndex}
                    />
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
                    <EditingQuesions
                      question={question}
                      index={adjustedIndex}
                    />
                  )}
                {question &&
                  (question?.question?.type ||
                    question?.question?.question_type) ==
                    "fill_in_the_blank" && (
                    <FillInTheBlank question={question} index={adjustedIndex} />
                  )}
              </div>
            );
          })}
      </div>
      <div className="mt-4 flex justify-center">
        <ResponsivePagination
          current={page}
          total={questions?.pagination?.total_pages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

export default AllQuestions;
