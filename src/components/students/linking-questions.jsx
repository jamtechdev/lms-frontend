import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import Xarrow from "react-xarrows";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import { userService } from "../../_services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      className="link-item ps-0"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="selector-circle"></div>
      {item.match_type === "text" ? (
        <strong>{item.word}</strong>
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

const LinkingQuestions = (props) => {
  const { questions, type, page, setPage, shuffledRight } = props;

  const [matchesByQuestion, setMatchesByQuestion] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answersStore = useSelector((state) => state.question.attempts);
  const currentQuestion = questions?.questions_array?.[0];

  if (!currentQuestion) return null;

  const currentQuestionId = currentQuestion.id;
  const currentMatches = matchesByQuestion[currentQuestionId] ?? {};

  const handleDrop = (leftIndex, rightIndex) => {
    setMatchesByQuestion((prev) => {
      const prevForQ = prev[currentQuestionId] ?? {};
      return {
        ...prev,
        [currentQuestionId]: {
          ...prevForQ,
          [leftIndex]: rightIndex,
        },
      };
    });
  };

  const handleStoreQuestion = async () => {
    if (!currentQuestion) return;

    const currentMatchMap = matchesByQuestion[currentQuestionId] ?? {};
    const leftItems = currentQuestion?.question?.answer ?? [];
    const rightItems = shuffledRight;

    const userAnswerTextMap = {};
    for (const [leftIndex, rightIndex] of Object.entries(currentMatchMap)) {
      const leftItem = leftItems[leftIndex]?.left?.word;
      const rightItem = rightItems[rightIndex]?.word;
      if (leftItem && rightItem) {
        userAnswerTextMap[leftItem] = rightItem;
      }
    }

    const payload = {
      question_id: currentQuestion.id,
      type,
      user_answer: JSON.stringify(userAnswerTextMap),
    };

    const updatedAnswers = [...answersStore, payload];
    dispatch(setAttemptQuestions(payload));

    if (questions?.pagination?.total === page) {
      const finalPayload = {
        answers: updatedAnswers.map((a) => ({
          question_id: a.question_id,
          answer: a.user_answer,
          type: a.type,
        })),
      };

      try {
        await userService.answer(finalPayload);
        toast.success("Answer submitted successfully.");
        navigate("/student");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while submitting.");
      }
    }
  };

  return (
    <>
      <div key={currentQuestion.id}>
        <DndProvider backend={HTML5Backend}>
          <div className="question-card mb-0">
            <h2 className="question-text">
              {page}.{" "}
              {typeof currentQuestion?.question?.content === "string"
                ? parse(currentQuestion.question.content)
                : ""}
            </h2>

            <div className="linking-container">
              <div className="left-side">
                {Array.isArray(currentQuestion?.question?.answer) &&
                  currentQuestion.question.answer.map((pair, i) => (
                    <div className="link-item" key={i} id={`left-${i}`}>
                      <DraggableLeft item={pair.left} index={i} />
                    </div>
                  ))}
              </div>

              <div className="right-side">
                {shuffledRight.map((item, i) => (
                  <div className="link-item" key={i} id={`right-${i}`}>
                    <DroppableRight item={item} index={i} onDrop={handleDrop} />
                  </div>
                ))}
              </div>

              {Object.entries(currentMatches).map(
                ([leftIndex, rightIndex], i) => (
                  <Xarrow
                    key={i}
                    start={`left-${leftIndex}`}
                    end={`right-${rightIndex}`}
                    startAnchor="right"
                    endAnchor="left"
                    strokeWidth={2}
                    curveness={0.4 + i * 0.1}
                    headSize={0}
                    color="#2563eb"
                  />
                )
              )}
            </div>
          </div>
        </DndProvider>

        <div className="flex justify-between mt-3">
          <button
            className="btn btn-primary mt-3 mr-2"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={questions?.pagination?.current_page === 1}
          >
            Previous
          </button>

          {questions?.pagination?.total === page ? (
            <button
              onClick={() => handleStoreQuestion()}
              className="btn btn-primary mt-3 ml-2"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => {
                handleStoreQuestion();
                setPage((prev) => prev + 1);
              }}
              className="btn btn-primary mt-3"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LinkingQuestions;
