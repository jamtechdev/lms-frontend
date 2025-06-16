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
import McqQuestions from "../../../components/students/mcq-questions";
import TrueFalseQuestions from "../../../components/students/true-false";
import OpenClozeWithOptions from "../../../components/students/open-close-with-options";
import LinkingQuestions from "../../../components/students/linking-questions";
import OpenClozeWithDropdown from "../../../components/students/open-close-with-dropdown";
import EditingQuesions from "../../../components/students/editing-questions";
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
  // relaod 
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = "Are you sure you want to reload the page?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
        {(questions && type == "mcq") && (
          <McqQuestions questions={questions} page={page} setPage={setPage} type={type} />
        )}
        {(questions && type == "true_false") && (
          <TrueFalseQuestions questions={questions} page={page} setPage={setPage} type={type} />
        )}
        {(questions && type === "linking") && (
          <LinkingQuestions
            questions={questions} page={page}
            setPage={setPage} type={type}
            shuffledRight={shuffledRight}
            setShuffledRight={setShuffledRight}
            userMatches={userMatches}
            setUserMatches={setUserMatches}
          />
        )}

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

        {(questions && type == "open_cloze_with_options") && (
          <OpenClozeWithOptions questions={questions} page={page} setPage={setPage} type={type} />
        )}
        {(questions && type == "open_cloze_with_dropdown_options") && (
          <OpenClozeWithDropdown questions={questions} page={page} setPage={setPage} type={type} />
        )}

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
        {(questions && type == "editing") && (
          <EditingQuesions questions={questions} page={page} setPage={setPage} type={type}/>
        )}  
        
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
