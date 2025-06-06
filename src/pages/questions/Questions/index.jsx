import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion, getQuestionsArray } from "../../../_store/_reducers/auth";
import userService from "../../../_services/user.service";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

const AllQuestions = () => {
  const navigate = useNavigate();

  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const question = useSelector(getQuestion);
  const questionArray = useSelector(getQuestionsArray);
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

  const handleSelectAnswer = (questionId, blankOrLeftIdx, selectedValue) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]:
        blankOrLeftIdx !== null && blankOrLeftIdx !== undefined
          ? { ...(prev[questionId] || {}), [blankOrLeftIdx]: selectedValue }
          : selectedValue,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <>
      <div className="dashboard-body">
        <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
          <div className="breadcrumb mb-24">
            <ul className="flex-align gap-4">
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setSelectedQuestionType(null);
                    setSubmitted(false);
                    setUserAnswers({});
                    navigate("/student/subjects");
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
                {selectedQuestionType ? (
                  <a
                    href="#"
                    onClick={() => {
                      setSelectedQuestionType(null);
                      setSubmitted(false);
                      setUserAnswers({});
                    }}
                    className="text-gray-200 fw-normal text-15 hover-text-main-600"
                  >
                    {questionTypes.find((t) => t.key === selectedQuestionType)
                      ?.label || "Question Type"}
                  </a>
                ) : (
                  <span className="text-gray-500 fw-normal text-15">
                    Question Type
                  </span>
                )}
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                {selectedQuestionType ? (
                  <span className="text-main-600 fw-normal text-15">
                    Questions
                  </span>
                ) : (
                  <span className="text-gray-500 fw-normal text-15">
                    Questions
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {questionArray && (
          <div className="shadowBox">
            <h2 className="mb-3">
              {questionTypes.find((t) => t.key === question)?.label} Questions
            </h2>
            <div className="questionGrid">
              {questionArray.length === 0 ? (
                <p>No questions found</p>
              ) : (
                questionArray.map((item, index) => (
                  <div key={item.id} className="question-card">
                    {item.question.type !== "linking" && (
                      <p className="question-text">
                        {index + 1}. {parse(item.question.content)}
                      </p>
                    )}
                    {item.question.type === "mcq" && (
                      <div className="mcq-options">
                        {item.question.options?.map((opt) => {
                          const isSelected = userAnswers[item.id] === opt.value;
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
                                      {item.question.answer.map((pair, idx) => (
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
                                          {pair.left.match_type === "text" ? (
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
                                      ))}
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
                                      {item.question.answer.map((pair, idx) => (
                                        <div
                                          key={idx}
                                          className={`column-item answer-item match_${
                                            idx + 1
                                          } ${
                                            submitted
                                              ? userMatches[item.id]?.[idx] ===
                                                `match_${idx + 1}`
                                                ? "correct-match"
                                                : "incorrect-match"
                                              : ""
                                          }`}
                                          onDragOver={(e) => e.preventDefault()}
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
                                          {pair.right.match_type === "text" ? (
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
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {item.question.type === "rearranging" && (
                      <div className="rearrange-question">
                        <div className="word-bank">
                          {item.question.options.map((wordObj, idx) => {
                            const word = wordObj.value;
                            const isUsed = userAnswers[item.id]?.includes(word);
                            return (
                              <button
                                key={idx}
                                className={`kbc-option-button ${
                                  isUsed ? "used" : ""
                                }`}
                                onClick={() => {
                                  if (!submitted && !isUsed) {
                                    setUserAnswers((prev) => ({
                                      ...prev,
                                      [item.id]: [
                                        ...(prev[item.id] || []),
                                        word,
                                      ],
                                    }));
                                  }
                                }}
                                disabled={submitted || isUsed}
                              >
                                {word}
                              </button>
                            );
                          })}
                        </div>

                        <div className="constructed-sentence">
                          {(userAnswers[item.id] || []).map((word, idx) => {
                            const correctAnswer = item.question.answer.answer;
                            const isCorrect =
                              submitted && word === correctAnswer[idx];
                            const isIncorrect =
                              submitted && word !== correctAnswer[idx];

                            return (
                              <button
                                key={idx}
                                className={`kbc-option-button selected ${
                                  isCorrect ? "correct" : ""
                                } ${isIncorrect ? "incorrect" : ""}`}
                                onClick={() => {
                                  if (!submitted) {
                                    setUserAnswers((prev) => {
                                      const updated = [...prev[item.id]];
                                      updated.splice(idx, 1);
                                      return {
                                        ...prev,
                                        [item.id]: updated,
                                      };
                                    });
                                  }
                                }}
                              >
                                {word}
                              </button>
                            );
                          })}
                        </div>

                        {submitted && (
                          <>
                            <div className="correct-answer mt-2">
                              <strong>Correct Answer:</strong>{" "}
                              {item.question.answer.answer.join(" ")}
                            </div>
                            <div className="mt-1">
                              {JSON.stringify(userAnswers[item.id]) ===
                              JSON.stringify(item.question.answer.answer) ? (
                                <span
                                  style={{
                                    color: "green",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Correct!
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Wrong!
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            {!submitted && questionArray.length > 0 && (
              <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Submit Answers
              </button>
            )}
            <br />
          </div>
        )}
      </div>
    </>
  );
};

export default AllQuestions;
