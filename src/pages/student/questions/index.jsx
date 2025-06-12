import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLevel, getQuestion, getQuestionsArray, getStudentType, getSubject, getTopic, } from "../../../_store/_reducers/auth";
import userService from "../../../_services/user.service";
import parse from "html-react-parser";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { removeAttemptQuestions, setAttemptQuestions } from "../../../_store/_reducers/question";
import Result from "../../../components/students/result";
import ReArrangeList from "../../../components/students/re-arrange";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Xarrow from "react-xarrows";
const ItemTypes = {
  LEFT_ITEM: "LEFT_ITEM",
};

const DraggableLeft = ({ item, index }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.LEFT_ITEM,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      id={`left-${index}`}
      className="link-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="selector-circle"></div>
      {item.match_type === "text" ? (
        <div>{item.word}</div>
      ) : (
        <img src={item.image_uri} alt="left" style={{ width: "100px" }} />
      )}
    </div>
  );
};

const DroppableRight = ({ item, index, onDrop }) => {
  const [, dropRef] = useDrop(() => ({
    accept: ItemTypes.LEFT_ITEM,
    drop: (draggedItem) => {
      onDrop(draggedItem.index, index);
    },
  }));

  return (
    <div ref={dropRef} id={`right-${index}`} className="link-item">
      {item.match_type === "text" ? (
        <div>{item.word}</div>
      ) : (
        <img src={item.image_uri} alt="right" style={{ width: "100px" }} />
      )}
      <div className="selector-circle"></div>
    </div>
  );
};

const AllQuestions = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);
  const [questions, setQuestions] = useState(null);
  const [reorderState, setReorderState] = useState([]);
  const [result, setResult] = useState(false);
  const education = useSelector(getStudentType);
  const level = useSelector(getLevel);
  const subject = useSelector(getSubject);
  const topic = useSelector(getTopic);
  const [page, setPage] = useState(1);
  // For linking
  const [shuffledRight, setShuffledRight] = useState([]);
  const [userMatches, setUserMatches] = useState({});
  const question = useSelector(getQuestion);
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  // for grammer cloze with options 
  const [inputs, setInputs] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const fetchQuestion = async () => {
    try {
      const data = {
        education_type: education,
        level_id: level,
        subject_id: subject,
        type: type,
        topic_id: topic,
      };
      const response = await userService.getAllQuestion(page, data);
      setQuestions(response?.data);
      if (type == "rearranging") {
        const reordered = response?.data?.questions_array?.map((q) => {
          // Initialize from Redux or API
          const existingAnswer = getExistingAnswerFromRedux(q?.id);
          return {
            id: q?.id,
            words: existingAnswer || q?.question?.options?.map((opt) => opt?.value)
          };
        });
        setReorderState(reordered);
      }
      if ((type || question) === "linking") {
        const answers =
          response?.data?.questions_array?.[0]?.question?.answer || [];
        const rightItems = answers.map((item) => item.right);
        setShuffledRight(shuffleArray(rightItems));
      }
    } catch (err) {
      console.log(err?.response?.data?.message || "Failed, please try again");
    }
  }
  useEffect(() => {
    fetchQuestion();
  }, [page]);
  useEffect(() => {
    return () => {
      dispatch(removeAttemptQuestions());
    }
  }, []);

  const handleOptionChange = (e, question) => {
    let payload = {
      question_id: question?.id,
      answer: type == "mcq" ? question?.question?.answer?.answer : question?.question?.answer?.choice,
      user_answer: e?.target?.value,
      type: type
    }
    dispatch(setAttemptQuestions(payload));
  };
  const handleReorder = (questionId, newOrder) => {
    setReorderState((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, words: newOrder } : q
      )
    );
  };
  const getExistingAnswerFromRedux = (questionId) => {
    const savedAnswer = answersStore.find((answer) => answer.question_id === questionId);
    return savedAnswer ? savedAnswer.user_answer.split(" ") : null;
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
        {(questions && type == "mcq" && !result) && questions?.questions_array?.map((question, index) => (
          <div key={index}>
            <form >
              <h2 className="mb-3">Questions</h2>
              <div className="question-card">
                <div className="question-text"> {page}. {parse(question?.question?.content)}</div>
                <div className="mcq-options">
                  {question?.question.options?.map((opt, index) => {
                    const selectedAnswer = answersStore?.find(ans => ans.question_id === question.id);
                    return (
                      <div key={index} className="">
                        <label
                          className={`kbc-option-label`}
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
                <button onClick={() => setResult(true)} className="btn btn-primary mt-3 ml-2">
                  Submit
                </button>
                : <button onClick={(e) => setPage((prev) => prev + 1)} className="btn btn-primary mt-3">
                  Next
                </button>
              }
            </div>
          </div>
        ))}
        {(questions && type == "true_false" && !result) && questions?.questions_array?.map((question, index) => (
          <div key={index}>
            <h2 className="mb-3">Questions</h2>
            <div className="question-card">
              <div className="question-text flex"> {page}. {parse(question?.question?.content)}</div>
              <div className="mcq-options">
                {question?.question?.options?.map((opt, index) => {
                  const selectedAnswer = answersStore?.find(ans => ans.question_id === question.id);
                  return (
                    <div key={index}>
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
                  )
                }
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="btn btn-primary mt-3 mr-2"
                onClick={(e) => setPage((prev) => prev - 1)}
                disabled={(questions?.pagination?.current_page == 1)}
              >
                Previous
              </button>
              {(questions?.pagination?.total == page) ?
                <button onClick={() => setResult(true)} className="btn btn-primary mt-3 ml-2">
                  Submit
                </button>
                : <button onClick={(e) => setPage((prev) => prev + 1)} className="btn btn-primary mt-3">
                  Next
                </button>
              }
            </div>
          </div>
        ))}
        {/* Linking Questions */}
        {(questions && type === "linking") &&
          questions.questions_array.map((question, index) => (
            <div key={index}>
              <DndProvider backend={HTML5Backend}>
                <div className="question-card">
                  <h2 className="question-text">
                    {page}. {parse(question?.question?.content)}
                  </h2>

                  <div className="linking-container">
                    {/* Left Side */}
                    <div className="left-side">
                      {question?.question?.answer?.map((pair, i) => (
                        <div className="link-item" key={i} id={`left-${i}`}>
                          <DraggableLeft item={pair.left} index={i} />
                        </div>
                      ))}
                    </div>

                    {/* Right Side */}
                    <div className="right-side">
                      {shuffledRight.map((item, i) => (
                        <div className="link-item" key={i} id={`right-${i}`}>
                          <DroppableRight
                            item={item}
                            index={i}
                            onDrop={(leftIndex, rightIndex) =>
                              setUserMatches((prev) => ({
                                ...prev,
                                [leftIndex]: rightIndex,
                              }))
                            }
                          />
                        </div>
                      ))}
                    </div>

                    {/* Arrows */}
                    {Object.entries(userMatches).map(
                      ([leftIndex, rightIndex], i) => (
                        <Xarrow
                          key={i}
                          start={`left-${leftIndex}`}
                          end={`right-${rightIndex}`}
                          strokeWidth={2}
                          path="smooth"
                          headSize={0}
                          color="#2563eb"
                        />
                      )
                    )}
                  </div>
                </div>
              </DndProvider>
              <div className="flex justify-between">
                <button
                  className="btn btn-primary mt-3 mr-2"
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={questions?.pagination?.current_page === 1}
                >
                  Previous
                </button>
                {questions?.pagination?.total === page ? (
                  <button className="btn btn-primary mt-3 ml-2">Submit</button>
                ) : (
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="btn btn-primary mt-3"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ))}

        {(questions && type == "rearranging" && !result) && questions?.questions_array?.map((q) => {
          const currentWords = reorderState.find((r) => r.id === q.id)?.words || [];
          return (
            <ReArrangeList
              key={q.id}
              question={q}
              words={currentWords}
              onReorder={(newOrder) => handleReorder(q.id, newOrder)}
              setPage={setPage}
              isFirst={(questions?.pagination?.current_page == 1)}
              isLast={page == questions?.pagination?.total}
              setResult={setResult}
            />
          )
        })}
        {(questions && type === "open_cloze_with_options") &&
          questions.questions_array.map((qObj, index) => {
            const questionData = qObj.question;
            const paragraph = questionData.paragraph;
            const blanks = questionData.questions;
            const options = questionData.question_group.shared_options.map(
              (opt) => opt.toLowerCase()
            );

            const handleChange = (e, id) => {
              const value = e.target.value.trim();

              setInputs((prev) => ({ ...prev, [id]: value }));

              if (value === "" || options.includes(value.toLowerCase())) {
                // valid input → clear error and dispatch
                setInputErrors((prev) => ({ ...prev, [id]: false }));

                dispatch(
                  setAttemptQuestions({
                    question_id: id,
                    user_answer: value,
                    type: type,
                  })
                );
              } else {
                // invalid → show error but don't dispatch
                setInputErrors((prev) => ({ ...prev, [id]: true }));
              }
            };

            const renderedParagraph = paragraph
              .split(/(\(\d+\)_____)/g)
              .map((part, i) => {
                const match = part.match(/\((\d+)\)_____/);
                if (match) {
                  const blankNumber = parseInt(match[1]);
                  const question = blanks.find(
                    (q) => q.blank_number === blankNumber
                  );
                  const inputValue = inputs[question.id] || "";
                  const hasError = inputErrors[question.id];

                  return (
                    <input
                      key={i}
                      type="text"
                      placeholder="_____"
                      value={inputs[question.id] || ""}
                      onChange={(e) => handleChange(e, question.id)}
                      style={{
                        width: "60px",
                        margin: "0 5px",
                        border: inputErrors[question.id]
                          ? "2px solid red"
                          : "1px solid #999",
                        textAlign: "center",
                      }}
                    />
                  );
                } else {
                  return <span key={i}>{part}</span>;
                }
              });

            return (
              <div key={index} style={{ marginBottom: "30px" }}>
                <div
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    background: "#f9f9f9",
                  }}
                >
                  <strong>Options:</strong> {options.join(", ")}
                </div>

                <div>
                  <strong>{page}.</strong> {renderedParagraph}
                </div>
                <div className="flex justify-between">
                  <button
                    className="btn btn-primary mt-3 mr-2"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={questions?.pagination?.current_page === 1}
                  >
                    Previous
                  </button>
                  {questions?.pagination?.total === page ? (
                    <button className="btn btn-primary mt-3 ml-2">Submit</button>
                  ) : (
                    <button
                      onClick={() => setPage((prev) => prev + 1)}
                      className="btn btn-primary mt-3"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        {(questions && type === "open_cloze_with_dropdown_options") &&
          questions.questions_array.map((qObj, index) => {
            const questionData = qObj.question;
            const paragraph = questionData.paragraph.replace(/<[^>]+>/g, "");
            const blanks = questionData.questions;

            const handleOptionClick = (questionId, selectedOption) => {
              setInputs((prev) => ({ ...prev, [questionId]: selectedOption }));

              dispatch(
                setAttemptQuestions({
                  question_id: questionId,
                  user_answer: selectedOption,
                  type: type,
                })
              );
            };

            const renderedParagraph = paragraph
              .split(/(\(\d+\)\[[^\]]+\])/g)
              .map((part, i) => {
                const match = part.match(/\((\d+)\)\[([^\]]+)\]/);
                if (match) {
                  const blankNumber = parseInt(match[1]);
                  const optionsText = match[2];
                  const question = blanks.find(
                    (q) => q.blank_number === blankNumber
                  );
                  const selectedAnswer = inputs[question.id];
                  const options = optionsText.split("/").map((opt) => opt.trim());

                  return (
                    <span key={i} style={{ margin: "0 5px" }}>
                      [
                      {options.map((opt, idx) => {
                        const isSelected = selectedAnswer === opt;
                        return (
                          <span
                            key={idx}
                            onClick={() => handleOptionClick(question.id, opt)}
                            style={{
                              cursor: "pointer",
                              margin: "0 5px",
                              textDecoration: isSelected ? "underline" : "none",
                            }}
                          >
                            {opt}
                          </span>
                        );
                      })}
                      ]
                    </span>
                  );
                } else {
                  return <span key={i}>{part}</span>;
                }
              });

            return (
              <div key={index} style={{ marginBottom: "30px" }}>
                <div
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    background: "#f9f9f9",
                  }}
                >
                  <strong>Instruction:</strong> {questionData.instruction}
                </div>

                <div style={{ marginTop: "10px", lineHeight: "1.8" }}>
                  <strong>{index + 1}.</strong> {renderedParagraph}
                </div>
                <div className="flex justify-between">
                  <button
                    className="btn btn-primary mt-3 mr-2"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={questions?.pagination?.current_page === 1}
                  >
                    Previous
                  </button>
                  {questions?.pagination?.total === page ? (
                    <button className="btn btn-primary mt-3 ml-2">Submit</button>
                  ) : (
                    <button
                      onClick={() => setPage((prev) => prev + 1)}
                      className="btn btn-primary mt-3"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        {(questions && type === "comprehension") &&
          questions.questions_array.map((qObj, index) => {
            const questionData = qObj.question;
            const passage = questionData.passage;
            const subquestions = questionData.subquestions;

            return (
              <div key={index} className="question-card">
                <div
                  style={{
                    padding: "15px",
                    marginBottom: "20px",
                    background: "#f1f5f9",
                    borderLeft: "5px solid #2563eb",
                  }}
                >
                  <h3>Passage:</h3>
                  <div>{parse(passage)}</div>
                </div>

                {subquestions.map((subq, subIndex) => {
                  const questionId = `${qObj.id}-${subIndex}`;
                  const selectedAnswer = answersStore?.find(
                    (ans) => ans.question_id === questionId
                  );

                  return (
                    <div key={subIndex} className="comprehension-subq">
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Q{subIndex + 1}.</strong> {subq.question}
                      </div>
                      <textarea
                        rows={3}
                        style={{
                          width: "100%",
                          borderColor: "#ccc",
                          padding: "8px",
                          borderRadius: "4px",
                        }}
                        value={selectedAnswer?.user_answer || ""}
                        onChange={(e) =>
                          dispatch(
                            setAttemptQuestions({
                              question_id: questionId,
                              user_answer: e.target.value,
                              type: "comprehension",
                            })
                          )
                        }
                        placeholder="Type your answer here..."
                      />
                    </div>
                  );
                })}
                <div className="flex justify-between">
                  <button
                    className="btn btn-primary mt-3 mr-2"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={questions?.pagination?.current_page === 1}
                  >
                    Previous
                  </button>
                  {questions?.pagination?.total === page ? (
                    <button className="btn btn-primary mt-3 ml-2">Submit</button>
                  ) : (
                    <button
                      onClick={() => setPage((prev) => prev + 1)}
                      className="btn btn-primary mt-3"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        {questions &&
          type === "editing" &&
          questions.questions_array.map((qObj, index) => {
            const questionData = qObj.question;
            const paragraph = questionData.paragraph;
            const boxes = questionData.questions;

            const handleInputChange = (e, boxNumber) => {
              const value = e.target.value;
              setInputs((prev) => ({ ...prev, [boxNumber]: value }));

              dispatch(
                setAttemptQuestions({
                  question_id: `${qObj.id}-${boxNumber}`,
                  user_answer: value,
                  type: "editing",
                })
              );
            };

            const renderedParagraph = paragraph
              .split(/(\(\d+\))/g)
              .map((part, i) => {
                const match = part.match(/\((\d+)\)/);
                if (match) {
                  const boxNumber = parseInt(match[1]);
                  const inputVal = inputs[boxNumber] || "";

                  return (
                    <input
                      key={i}
                      type="text"
                      value={inputVal}
                      placeholder={`Word ${boxNumber}`}
                      onChange={(e) => handleInputChange(e, boxNumber)}
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        width: "110px",
                        margin: "0 4px",
                        padding: "5px 8px",
                        fontSize: "15px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                        outlineColor: "#2563eb",
                      }}
                    />
                  );
                } else {
                  return (
                    <span
                      key={i}
                      style={{
                        display: "inline", // critical to prevent wrapping
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {parse(part)}
                    </span>
                  );
                }
              });

            return (
              <div key={index} className="question-card">
                <div
                  style={{
                    padding: "15px 20px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                    marginBottom: "25px",
                  }}
                >
                  <h3 style={{ marginBottom: "12px", fontWeight: "600" }}>
                    {page}. {questionData.instruction}
                  </h3>

                  <div
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.8",
                      backgroundColor: "#fff",
                      padding: "16px",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      display: "block",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {renderedParagraph}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    className="btn btn-primary mt-3 mr-2"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={questions?.pagination?.current_page === 1}
                  >
                    Previous
                  </button>
                  {questions?.pagination?.total === page ? (
                    <button className="btn btn-primary mt-3 ml-2">Submit</button>
                  ) : (
                    <button
                      onClick={() => setPage((prev) => prev + 1)}
                      className="btn btn-primary mt-3"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      {result && <div>
        <button onClick={() => setResult(false)} className="btn ml-2">
          Back to Quizz
        </button>
        <Result />
      </div>
      }
    </>
  );
};

export default AllQuestions;
