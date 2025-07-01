import parse from "html-react-parser";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Xarrow from "react-xarrows";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import { userService } from "../../_services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LinkingQuestions = ({
  questions,
  type,
  page,
  setPage,
  shuffledRight,
}) => {
  const [matchesByQuestion, setMatchesByQuestion] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answersStore = useSelector((state) => state.question.attempts);
  const currentQuestion = questions?.questions_array?.[0];

  if (!currentQuestion) return null;

  const currentQuestionId = currentQuestion.id;
  const currentMatches = matchesByQuestion[currentQuestionId] ?? {};
  const leftItems = currentQuestion?.question?.answer?.map((a) => a.left) ?? [];
  const maxLength = Math.max(leftItems.length, shuffledRight.length);

  const handleLeftClick = (index) => {
    setSelectedLeft(index);
    setSelectedRight(null);
  };

  const handleRightClick = (index) => {
    if (selectedLeft !== null) {
      setMatchesByQuestion((prev) => {
        const prevForQ = prev[currentQuestionId] ?? {};
        return {
          ...prev,
          [currentQuestionId]: {
            ...prevForQ,
            [selectedLeft]: index,
          },
        };
      });
      setSelectedLeft(null);
    } else {
      setSelectedRight(index); // allow selection indicator (optional)
    }
  };

  const handleStoreQuestion = async () => {
    if (!currentQuestion) return;

    const currentMatchMap = matchesByQuestion[currentQuestionId] ?? {};
    const userAnswerTextMap = {};

    for (const [leftIndex, rightIndex] of Object.entries(currentMatchMap)) {
      const leftItem = leftItems[leftIndex]?.word;
      const rightItem = shuffledRight[rightIndex]?.word;
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
    <div key={currentQuestion.id}>
      <div>
        {" "}
        <strong>Instruction:</strong> {currentQuestion.question.instruction}
      </div>
      <div className="question-card mb-0">
        <h2 className="question-text mb-4">
          {page}.{" "}
          {typeof currentQuestion?.question?.content === "string"
            ? parse(currentQuestion.question.content)
            : ""}
        </h2>
        <div className="flex justify-center">
          <div
            className="flex linking-container"
            style={{
              gap: "8rem",
              maxWidth: "1000px",
              width: "100%",
              overflow: "visible",
              position: "relative",
            }}
          >
            {/* Left Side */}
            <div className="flex flex-col gap-6 left-side">
              {Array.from({ length: maxLength }).map((_, i) => {
                const item = leftItems[i];
                const isConnected = currentMatches[i] !== undefined;
                const isSelected = selectedLeft === i;
                return item ? (
                  <div
                    key={i}
                    id={`left-${i}`}
                    className={`link-item ${isConnected ? "connected" : ""} ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => handleLeftClick(i)}
                  >
                    <div className="selector-circle" />
                    {item.match_type === "text" ? (
                      item.word
                    ) : (
                      <img src={item.image_uri} alt="left" />
                    )}
                  </div>
                ) : (
                  <div className="link-item invisible" key={i} />
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-6 right-side">
              {Array.from({ length: maxLength }).map((_, i) => {
                const item = shuffledRight[i];
                const isConnected = Object.values(currentMatches).includes(i);
                const isSelected = selectedRight === i;
                return item ? (
                  <div
                    key={i}
                    id={`right-${i}`}
                    className={`link-item ${isConnected ? "connected" : ""} ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => handleRightClick(i)}
                  >
                    <div className="selector-circle" />
                    {item.match_type === "text" ? (
                      item.word
                    ) : (
                      <img src={item.image_uri} alt="right" />
                    )}
                  </div>
                ) : (
                  <div className="link-item invisible" key={i} />
                );
              })}
            </div>

            {/* Arrows */}
            {(() => {
 const colors = [
    "#a637f7", "#d10d0d", "#FF8C00", "#00008B", "#006400",
    "#9B870C", "#8B008B", "#0dd8d8", "#3B3B3B", "#4B3621",
    "#191970", "#800000", "#5F9EA0", "#483D8B", "#556B2F"
  ];

  return Object.entries(currentMatches).map(
    ([leftIndex, rightIndex], i) => (
      <Xarrow
        key={i}
        start={`left-${leftIndex}`}
        end={`right-${rightIndex}`}
        startAnchor="right"
        endAnchor="left"
        strokeWidth={3}
        curveness={0.5}
        path="smooth"
        animateDrawing
        headSize={4}
        color={colors[i % colors.length]} // Cycles through 20 colors
      />
    )
  );
})()}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={questions?.pagination?.current_page === 1}
        >
          Previous
        </button>

        {questions?.pagination?.total === page ? (
          <button onClick={handleStoreQuestion} className="btn btn-primary">
            Submit
          </button>
        ) : (
          <button
            onClick={() => {
              handleStoreQuestion();
              setPage((prev) => prev + 1);
            }}
            className="btn btn-primary"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default LinkingQuestions;
