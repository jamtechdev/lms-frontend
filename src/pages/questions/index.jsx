import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import maths from "../../assets/images/maths.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getLevel,
  getQuestion,
  getStudentType,
  getSubject,
  setQuestion,
  setSubject,
} from "../../_store/_reducers/auth";
import userService from "../../_services/user.service";
import parse from "html-react-parser";

const Questions = () => {
  const dispatch = useDispatch();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const education = useSelector(getStudentType);
  const level = useSelector(getLevel);
  const subject = useSelector(getSubject);
  const question = useSelector(getQuestion);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [userMatches, setUserMatches] = useState({});
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
    { key: "fill_blank", label: "Fill in the blanks" },
    { key: "true_false", label: "True/False" },
    { key: "linking", label: "Linking" },
    { key: "rearranging", label: "Rearranging" },
    { key: "comprehension", label: "Comprehension" },
  ];

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await userService.getSubject(level);
        setSubjects(response.data.data);
      } catch (err) {
        console.log(err?.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (level) {
      fetchSubjects();
    }
  }, [level]);

  const handleQuestion = async (selectedType) => {
    try {
      const data = {
        education_type: education,
        level_id: level,
        subject_id: subject,
        type: selectedType || question,
      };
      const response = await userService.getAllQuestion(data);
      setFetchedQuestions(response.data.data.questions_array);
      console.log(response.data.data.questions_array);
    } catch (err) {
      console.log(err?.response?.data?.message || "Failed, please try again");
    }
  };
  const handleSelectAnswer = (questionId, blankOrLeftIdx, selectedValue) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]:
        blankOrLeftIdx !== null && blankOrLeftIdx !== undefined
          ? { ...(prev[questionId] || {}), [blankOrLeftIdx]: selectedValue }
          : selectedValue,
    }));
  };

  const shuffleArray = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="dashboard-main-wrapper">
          <Navbar />
          <div className="dashboard-body">
            <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
              <div className="breadcrumb mb-24">
                <ul className="flex-align gap-4">
                  <li>
                    <a
                      href="#"
                      onClick={() => {
                        setSelectedSubject(null);
                        setSelectedQuestionType(null);
                        setFetchedQuestions([]);
                        setSubmitted(false);
                        setUserAnswers({});
                      }}
                      className="text-gray-200 fw-normal text-15 hover-text-main-600"
                    >
                      Back to Subjects
                    </a>
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
            {!selectedSubject && (
              <div className="row gy-4 shadowBox">
                {loading ? (
                  <div className="col-12 text-center">
                    <p>Loading subjects...</p>
                  </div>
                ) : subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <div className="col-sm-3" key={subject.id}>
                      <div
                        className="card"
                        onClick={() => {
                          setSelectedSubject(subject.id);
                          dispatch(setSubject(subject.id));
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body">
                          <div className="flex-between gap-8 mb-10">
                            <div className="mt-10">
                              <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl">
                                <i className="ph ph-graduation-cap"></i>
                              </span>
                              <h4 className="mb-2 mt-20">
                                {subject.subject_name}
                              </h4>
                            </div>
                            <img
                              src={maths}
                              className="subject_img"
                              alt={subject.subject_name}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p>No subjects available.</p>
                  </div>
                )}
              </div>
            )}

            {selectedSubject && !selectedQuestionType && (
              <div className="row gy-4 questionTypes">
                <div className="col-sm-12">
                  <div className="card mt-24">
                    <div className="card-body">
                      <div className="mb-20 flex-between flex-wrap gap-8">
                        <h4 className="mb-0">Questions</h4>
                      </div>
                      <div className="Questions">
                        {questionTypes.map((type) => (
                          <div
                            className="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1 mb-16 questionList"
                            key={type.key}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSelectedQuestionType(type.key);
                              dispatch(setQuestion(type.key));
                              handleQuestion(type.key);
                            }}
                          >
                            <div className="flex-align flex-wrap gap-8">
                              <div>
                                <h4 className="mb-0">{type.label}</h4>
                                <span className="text-13 text-gray-400">
                                  Select Questions
                                </span>
                              </div>
                            </div>
                            <i className="ph ph-caret-right"></i>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selectedQuestionType && (
              <div className="shadowBox">
                <h2 className="mb-3">
                  {
                    questionTypes.find((t) => t.key === selectedQuestionType)
                      ?.label
                  }{" "}
                  Questions
                </h2>
                <div className="questionGrid">
                  {fetchedQuestions.length === 0 ? (
                    <p>No questions found.</p>
                  ) : (
                    fetchedQuestions.map((item, index) => (
                      <div key={item.id} className="question-card">
                        {item.question.type !== "linking" && (
                          <p className="question-text">
                            {index + 1}. {parse(item.question.content)}
                          </p>
                        )}
                        {item.question.type === "mcq" && (
                          <div className="mcq-options">
                            {item.question.options?.map((opt) => {
                              const isSelected =
                                userAnswers[item.id] === opt.value;
                              const isCorrect =
                                submitted &&
                                item.question.answer.answer === opt.value;
                              const isIncorrect =
                                submitted && isSelected && !isCorrect;

                              return (
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
                              );
                            })}
                            {submitted && (
                              <div className="correct-answer">
                                Correct Answer: {item.question.answer.answer}
                              </div>
                            )}
                          </div>
                        )}

                        {item.question.type === "fill_blank" && (
                          <div className="fill-blank-options">
                            {item.question.blanks?.map((blank, idx) => (
                              <div key={idx} className="form-group">
                                <label>Blank {idx + 1}:</label>
                                {blank.options?.map((val, optionIdx) => (
                                  <button
                                    key={optionIdx}
                                    className={`kbc-option-button ${
                                      userAnswers[item.id]?.[idx] === val
                                        ? "selected"
                                        : ""
                                    } ${
                                      submitted && blank.answer === val
                                        ? "correct"
                                        : ""
                                    } ${
                                      submitted &&
                                      userAnswers[item.id]?.[idx] === val &&
                                      blank.answer !== val
                                        ? "incorrect"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      if (!submitted) {
                                        handleSelectAnswer(item.id, idx, val);
                                      }
                                    }}
                                    disabled={submitted}
                                  >
                                    {val}
                                  </button>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}

                        {item.question.type === "true_false" && (
                          <div className="true-false-options">
                            {["True", "False"].map((val, idx) => (
                              <button
                                key={idx}
                                className={`kbc-option-button 
                    ${userAnswers[item.id] === val ? "selected" : ""} 
                    ${
                      submitted && item.question.answer.choice === val
                        ? "correct"
                        : ""
                    } 
                    ${
                      submitted &&
                      userAnswers[item.id] === val &&
                      item.question.answer.choice !== val
                        ? "incorrect"
                        : ""
                    }
                `}
                                onClick={() => {
                                  if (!submitted) {
                                    handleSelectAnswer(item.id, null, val);
                                  }
                                }}
                                disabled={submitted}
                              >
                                {val}
                              </button>
                            ))}
                            {submitted && (
                              <div
                                style={{
                                  marginTop: "10px",
                                  fontWeight: "bold",
                                  color: "green",
                                }}
                              >
                                Correct Answer: {item.question.answer.choice}
                              </div>
                            )}
                          </div>
                        )}

                        {item.question.type === "linking" && (
                          <div className="row gy-4 justify-content-center">
                            <div className="col-sm-9">
                              <div className="card shadow-lg w-100">
                                <div className="card-body">
                                  <h1 className="card-title text-center mb-4 fs-2 fw-bold text-dark">
                                    Match the Column
                                  </h1>
                                  <p className="card-text text-center mb-5 text-secondary">
                                    Review the terms on the left and their
                                    corresponding definitions on the right.
                                  </p>

                                  <div
                                    id="game-container"
                                    className="row g-4 justify-content-center"
                                  >
                                    <div className="col-lg-6">
                                      <div className="column-container">
                                        <h2 className="text-center mb-4 fs-5 text-secondary">
                                          Terms
                                        </h2>
                                        <div
                                          id="questions-column"
                                          className="d-grid gap-3"
                                        >
                                          {item.question.answer.map(
                                            (pair, idx) => (
                                              <div
                                                key={idx}
                                                className={`column-item question-item match_${
                                                  idx + 1
                                                }`}
                                                draggable
                                                onDragStart={(e) =>
                                                  e.dataTransfer.setData(
                                                    "text/plain",
                                                    `match_${idx + 1}`
                                                  )
                                                }
                                              >
                                                {pair.left.match_type ===
                                                "text" ? (
                                                  pair.left.word
                                                ) : (
                                                  <img
                                                    src={pair.left.image_uri}
                                                    alt={`left-${idx}`}
                                                    style={{
                                                      width: "50px",
                                                      height: "50px",
                                                    }}
                                                  />
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-6">
                                      <div className="column-container">
                                        <h2 className="text-center mb-4 fs-5 text-secondary">
                                          Definitions
                                        </h2>
                                        <div
                                          id="answers-column"
                                          className="d-grid gap-3"
                                        >
                                          {item.question.answer.map(
                                            (pair, idx) => (
                                              <div
                                                key={idx}
                                                className={`column-item answer-item match_${
                                                  idx + 1
                                                } ${
                                                  submitted
                                                    ? userMatches[item.id]?.[
                                                        idx
                                                      ] === `match_${idx + 1}`
                                                      ? "correct-match"
                                                      : "incorrect-match"
                                                    : ""
                                                }`}
                                                onDragOver={(e) =>
                                                  e.preventDefault()
                                                }
                                                onDrop={(e) => {
                                                  e.preventDefault();
                                                  const draggedMatch =
                                                    e.dataTransfer.getData(
                                                      "text/plain"
                                                    );
                                                  handleLinkingDrop(
                                                    item.id,
                                                    idx,
                                                    draggedMatch
                                                  );
                                                }}
                                              >
                                                {pair.right.match_type ===
                                                "text" ? (
                                                  pair.right.word
                                                ) : (
                                                  <img
                                                    src={pair.right.image_uri}
                                                    alt={`right-${idx}`}
                                                    style={{
                                                      width: "50px",
                                                      height: "50px",
                                                    }}
                                                  />
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                {!submitted && fetchedQuestions.length > 0 && (
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleSubmit}
                  >
                    Submit Answers
                  </button>
                )}
                <br />
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Questions;
