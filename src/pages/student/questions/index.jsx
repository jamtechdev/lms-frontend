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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedAnswers = useSelector((state) => state.question.attempts);
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

  const handleLinkingDrop = (questionId, leftIdx, draggedMatch) => {
    setUserMatches((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [leftIdx]: draggedMatch,
      },
    }));
  };

  const questionTypes = [
    { key: "mcq", label: "MCQ" },
    { key: "true_false", label: "True/False" },
    { key: "linking", label: "Linking" },
    { key: "rearranging", label: "Rearranging" },
    { key: "grammar_cloze_with_options", label: "Grammar Cloze (With Options)" },
    { key: "underlinecorrect", label: "Underline Correct" },
    { key: "comprehension", label: "Comprehension" },
    { key: "editing", label: "Editing" },
  ];


  const handleSelectAnswer = (questionId, blankOrLeftIdx, selectedValue) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]:
        blankOrLeftIdx !== null && blankOrLeftIdx !== undefined
          ? { ...(prev[questionId] || {}), [blankOrLeftIdx]: selectedValue }
          : selectedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(2)
  };
  const [selectedOption, setSelectedOption] = useState();
  const handleOptionChange = (e) => {
    const selectedOption = e?.target?.value;
    setSelectedOption(selectedOption);
    dispatch(setAttemptQuestions({
      question_id: question?.id,
      user_answer: selectedOption,
      type,
    }));
  };
  const handleNext = (e, question) => {
    e.preventDefault();
    // if (!selectedOption) return alert("Please select an option before proceeding.");

    dispatch(setAttemptQuestions({
      question_id: question?.id,
      user_answer: selectedOption,
      type,
    }));
    if ((questions?.pagination?.total != page)) {
      setPage((prev) => prev + 1);
    }
    setSelectedOption('');
  };
  const handlePrevious = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage((prev) => prev - 1);
      setSelectedOption('');
    }
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
                <Link to="/student/select-question-type"
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
        {(questions && type == "mcq") && questions?.questions_array?.map((item, index) => (
          <div key={index}>
            <form onSubmit={handleSubmit}>
              <h2 className="mb-3">Questions</h2>
              <div className="question-card">
                <div className="question-text"> {page}. {parse(item?.question?.content)}</div>

                <div className="mcq-options">
                  {item.question.options?.map((opt, index) => {
                    const selectedAnswer = selectedAnswers?.find(ans => ans.question_id === item.id);
                    const isSelected = selectedAnswer?.user_answer === opt?.value;
                    console.log(selectedAnswers?.find(ans => ans.question_id == item.id)?.user_answer == opt?.value, '====')
                    const isCorrect = submitted && item.question.answer.answer === opt.value;
                    const isIncorrect = submitted && isSelected && !isCorrect;
                    return (
                      <div key={index}>
                        <button
                          key={opt.value}
                          className={`kbc-option-button 
                        ${isSelected ? "selected" : ""}
                        ${isCorrect ? "correct" : ""}
                        ${isIncorrect ? "incorrect" : ""}
                    `}
                          onClick={() =>
                            !submitted &&
                            handleSelectAnswer(item.id, null, opt.value)
                          }
                          disabled={submitted}
                        >
                          {opt.value}
                        </button>
                      </div>
                    );
                  })}
                  {/* {submitted && (
                    <div className="correct-answer">
                      Correct Answer: {item.question.answer.answer}
                    </div>
                  )} */}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  className="btn btn-primary mt-3"
                  onClick={(e) => handlePrevious(e)}
                  disabled={(questions?.pagination?.current_page == 1)}
                >
                  Previous
                </button>
                <button
                  className="btn btn-primary mt-3"
                  onClick={(e) => handleNext(e, item)}
                // disabled={(questions?.pagination?.total == page)}
                >
                  {(questions?.pagination?.total == page) ? "Submit" : "Next"}
                </button>
              </div>

            </form>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllQuestions;
