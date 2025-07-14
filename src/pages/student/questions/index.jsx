import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLevel,
  getQuestion,
  getQuestionsArray,
  getStudentType,
  getSubject,
  getTopic,
} from "../../../_store/_reducers/auth";
import userService from "../../../_services/user.service";
import parse from "html-react-parser";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  removeAttemptQuestions,
  setAttemptQuestions,
} from "../../../_store/_reducers/question";
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
import FillInTheBlank from "../../../components/students/fill-in-the-blank";
import Comprehension from "../../../components/students/comprehension";
import loader from "../../../assets/images/loader.gif";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

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
  const type = queryParams.get("type");
  const subject = queryParams.get("sub");
  const topic = queryParams.get("topic");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const answersStore = useSelector((state) => state.question.attempts);
  const [questions, setQuestions] = useState(null);
  const [reorderState, setReorderState] = useState([]);
  const [result, setResult] = useState(false);
  const education = useSelector(getStudentType);
  const level = useSelector(getLevel);
  const [page, setPage] = useState(1);
  const [shuffledRight, setShuffledRight] = useState([]);
  const [userMatches, setUserMatches] = useState({});
  const question = useSelector(getQuestion);
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  const [inputs, setInputs] = useState({});
  const [inputErrors, setInputErrors] = useState({});
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
      setQuestions(response?.data);
      if (type == "rearranging") {
        const reordered = response?.data?.questions_array?.map((q) => {
          const existingAnswer = getExistingAnswerFromRedux(q?.id);
          return {
            id: q?.id,
            words:
              existingAnswer || q?.question?.options?.map((opt) => opt?.value),
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

  const handleReorder = (questionId, newOrder) => {
    setReorderState((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, words: newOrder } : q))
    );
  };
  const getExistingAnswerFromRedux = (questionId) => {
    const savedAnswer = answersStore.find(
      (answer) => answer.question_id === questionId
    );
    return savedAnswer ? savedAnswer.user_answer.split(" ") : null;
  };

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
      <div className="dashboard-body">
        {/* <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
          <div className="breadcrumb mb-24">
            <ul className="flex-align gap-4">
              <li>
                <Link
                  to="/student/subjects"
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
                <Link
                  to="/student/topics"
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
                <Link
                  to="/student/question-type"
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
        </div> */}
        {questions && questions?.questions_array?.length == 0 && (
          <p>No Questions found</p>
        )}
        {questions &&
          questions?.questions_array?.map((question, index) => {
            return (
              <div key={index}>
                {question && question?.question?.type == "true_false" && (
                  <TrueFalseQuestions question={question} index={index} />
                )}
                {question && question?.question?.type == "mcq" && (
                  <McqQuestions question={question} index={index} />
                )}
                {question && question?.question?.type == "rearranging" && (
                  <ReArrangeList question={question} index={index} />
                )}
                {/* {question && question?.question?.type == "linking" &&
                <LinkingQuestions
                  question={question}
                  page={page}
                  setPage={setPage}
                  type={type}
                  shuffledRight={shuffledRight}
                  setShuffledRight={setShuffledRight}
                  userMatches={userMatches}
                  setUserMatches={setUserMatches}
                />
              } */}
                {/* {question && (question?.question?.type || question?.question?.question_type) == "open_cloze_with_options" &&
                <OpenClozeWithOptions
                  question={question}
                  index={index}
                />
              }
              {question && (question?.question?.type || question?.question?.question_type) == "open_cloze_with_dropdown_options" &&
                <OpenClozeWithDropdown
                  question={question}
                  index={index}
                />
              }
              {question && (question?.question?.type || question?.question?.question_type) == "comprehension" &&
                <Comprehension
                  question={question}
                  index={index}
                />
              } */}
              </div>
            );
          })}
        {/* {questions && type == "mcq" && (
          <McqQuestions
            questions={questions}
            page={page}
            setPage={setPage}
            type={type}
          />
        )}
        {questions && type == "true_false" && (
          <TrueFalseQuestions
            questions={questions}
            page={page}
            setPage={setPage}
            type={type}
          />
        )}
        {questions && type === "linking" && (
          <LinkingQuestions
            questions={questions}
            page={page}
            setPage={setPage}
            type={type}
            shuffledRight={shuffledRight}
            setShuffledRight={setShuffledRight}
            userMatches={userMatches}
            setUserMatches={setUserMatches}
          />
        )}

        {questions && type == "rearranging" && !result && (
          <>
            {questions?.questions_array?.map((q) => {
              const currentWords =
                reorderState.find((r) => r.id === q.id)?.words || [];
              return (
                <ReArrangeList
                  key={q.id}
                  question={q}
                  page={page}
                  words={currentWords}
                  onReorder={(newOrder) => handleReorder(q.id, newOrder)}
                  setPage={setPage}
                  isFirst={questions?.pagination?.current_page === 1}
                  isLast={page === questions?.pagination?.total}
                  setResult={setResult}
                />
              );
            })}

            {questions?.pagination?.total_pages > 1 && (
              <div className="mt-4 flex justify-center">
                <ResponsivePagination
                  current={page}
                  total={questions.pagination.total_pages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}

        {questions && type == "open_cloze_with_options" && (
          <OpenClozeWithOptions
            questions={questions}
            page={page}
            setPage={setPage}
            type={type}
          />
        )}
        {questions && type == "open_cloze_with_dropdown_options" && (
          <OpenClozeWithDropdown
            questions={questions}
            page={page}
            setPage={setPage}
            type={type}
          />
        )}
        {questions && type == "comprehension" && (
          <Comprehension
            questions={questions}
            page={page}
            setPage={setPage}
            type={type}
          />
        )}

        {questions && type == "editing" && (
          <EditingQuesions
            questions={questions}
            page={page}
            setPage={setPage}
            type={type}
          />
        )}
        {questions && type == "fill_in_the_blank" && (
          <FillInTheBlank
            questions={questions}
            page={page}
            setPage={setPage}
            type={type}
          />
        )} */}
      </div>
      <div className="mt-4 flex justify-center">
        <ResponsivePagination
          current={page}
          total={questions.pagination.total_pages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

export default AllQuestions;
