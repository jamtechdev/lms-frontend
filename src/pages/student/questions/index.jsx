import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLevel, getQuestion, getQuestionsArray, getStudentType, getSubject, getTopic, } from "../../../_store/_reducers/auth";
import userService from "../../../_services/user.service";
import parse from "html-react-parser";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setAttemptQuestions } from "../../../_store/_reducers/question";

const AllQuestions = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);
  const [questions, setQuestions] = useState(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const question = useSelector(getQuestion);
  const questionArray = useSelector(getQuestionsArray);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [userMatches, setUserMatches] = useState({});
  const education = useSelector(getStudentType);
  const level = useSelector(getLevel);
  const subject = useSelector(getSubject);
  // 
  const topic = useSelector(getTopic);
  const [page, setPage] = useState(1);
  const fetchQuestion = async () => {
    try {
      const data = {
        education_type: education,
        level_id: level,
        subject_id: subject,
        type: type || question,
        topic_id: topic,
      };
      const response = await userService.getAllQuestion(page, data);
      setQuestions(response?.data);
    } catch (err) {
      console.log(err?.response?.data?.message || "Failed, please try again");
    }
  }
  useEffect(() => {
    fetchQuestion();
  }, [page]);

  const handleOptionChange = (e, question) => {
    let payload = {
      question_id: question?.id,
      user_answer: e?.target?.value,
      type: type
    }
    dispatch(setAttemptQuestions(payload));
  };

  return (
    <>
      <div className="dashboard-body">
        <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
          <div className="breadcrumb mb-24">
            <ul className="flex-align gap-4">
              <li>
                <Link to="/student/subjects"
                  className="text-gray-200 fw-normal text-15 hover-text-main-600"
                >
                  Back to Subjects
                </Link>
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                <Link to="/student/topics"
                  className="text-gray-200 fw-normal text-15 hover-text-main-600"
                >
                  Topics
                </Link>
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                <Link to="/student/question-type"
                  className="text-gray-200 fw-normal text-15 hover-text-main-600"
                >
                  Question Type
                </Link>
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                <span className="text-main-600 fw-normal text-15">
                  Questions
                </span>
              </li>
            </ul>
          </div>
        </div>
        {(questions && type == "mcq") && questions?.questions_array?.map((question, index) => (
          <div key={index}>
            <form >
              <h2 className="mb-3">Questions</h2>
              <div className="question-card">
                <div className="question-text"> {page}. {parse(question?.question?.content)}</div>

                <div className="mcq-options">
                  {question?.question.options?.map((opt, index) => {
                    const selectedAnswer = answersStore?.find(ans => ans.question_id === question.id);
                    console.log(selectedAnswer, "============")
                    return (
                      <div key={index} className="">
                        <label
                          className={`kbc-option-label ${true ? "selected" : ""}`}
                        >
                          <input
                            type="radio"
                            name={`question-${opt.value}`}
                            value={opt.value}
                            checked={selectedAnswer?.user_answer == opt?.value}
                            onChange={(e) => handleOptionChange(e, question)}
                          />
                          {opt.value}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>
            <div className="flex justify-between">
              <button
                className="btn btn-primary mt-3 mr-2"
                onClick={(e) => setPage((prev) => prev - 1)}
                disabled={(questions?.pagination?.current_page == 1)}
              >
                Previous
              </button>
              {(questions?.pagination?.total == page) ?
                <button className="btn btn-primary mt-3 ml-2">
                  Submit
                </button>
                : <button onClick={(e) => setPage((prev) => prev + 1)} className="btn btn-primary mt-3">
                  Next
                </button>
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllQuestions;
