import parse from "html-react-parser";
import { useState, useEffect } from "react";
import Xarrow from "react-xarrows";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import { userService } from "../../_services";
import toast from "react-hot-toast";
import Feedback from "../Feedback";

const LinkingAssignment = ({ question, index }) => {
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);

  // Internal state to manage pagination if question has multiple sets (adjust as needed)
  const [page, setPage] = useState(1);

  // Manage shuffledRight internally or derive it here:
  // Assuming question has a field with right side items, otherwise adjust accordingly
  const [shuffledRight, setShuffledRight] = useState([]);

  const [matchesByQuestion, setMatchesByQuestion] = useState({});
  const [selected, setSelected] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState(new Set());

  // Assuming 'type' is from question.question.type or fallback
  const type = question?.question?.type || "linking";

  useEffect(() => {
    // Shuffle right side items on load or page change
    if (question?.question?.answer) {
      const rightItems = question.question.answer.map((a) => a.right);
      const shuffled = [...rightItems].sort(() => Math.random() - 0.5);
      setShuffledRight(shuffled);
    }
  }, [question, page]);
  useEffect(() => {
    if (!question?.question?.answer) return;

    const rightItems = question.question.answer.map((a) => a.right);
    const leftItems = question.question.answer.map((a) => a.left);
    const submitted = answersStore.find(
      (ans) => ans.question_id === question.id
    );
    if (submitted) {
      try {
        const parsedAnswer = JSON.parse(submitted.user_answer);
        const matches = {};

        Object.entries(parsedAnswer).forEach(([leftWord, rightWord]) => {
          const leftIndex = leftItems.findIndex((l) => l.word === leftWord);
          const rightIndex = rightItems.findIndex((r) => r.word === rightWord);
          if (leftIndex !== -1 && rightIndex !== -1) {
            matches[leftIndex] = rightIndex;
          }
        });

        setMatchesByQuestion({ [question.id]: matches });
        setSubmittedQuestions((prev) => new Set(prev).add(question.id));
        setShuffledRight(rightItems); // keep original order
      } catch (e) {
        console.error("Failed to parse saved answer", e?.response);
      }
    } else {
      const shuffled = [...rightItems].sort(() => Math.random() - 0.5);
      setShuffledRight(shuffled);
    }
  }, [question, answersStore]);

  if (!question || !Array.isArray(question.question.answer)) return null;

  const q = question;
  const qId = q.id;
  const currentMatches = matchesByQuestion[qId] ?? {};
  const leftItems = q.question.answer.map((a) => a.left);
  const maxLength = Math.max(leftItems.length, shuffledRight.length);
  const selectedLeft = selected[qId]?.leftIndex;
  const selectedRight = selected[qId]?.rightIndex;
  const isSubmitted = submittedQuestions.has(qId);
  const isButtonDisabled = Object.keys(currentMatches).length === 0;

  const handleLeftClick = (qId, index) => {
    if (submittedQuestions.has(qId)) return;
    setSelected((prev) => ({
      ...prev,
      [qId]: { leftIndex: index, rightIndex: null },
    }));
  };

  const handleRightClick = (qId, index) => {
    if (submittedQuestions.has(qId)) return;
    const selectedState = selected[qId] ?? {};
    if (
      selectedState.leftIndex !== null &&
      selectedState.leftIndex !== undefined
    ) {
      setMatchesByQuestion((prev) => {
        const prevForQ = prev[qId] ?? {};
        return {
          ...prev,
          [qId]: {
            ...prevForQ,
            [selectedState.leftIndex]: index,
          },
        };
      });
      setSelected((prev) => ({
        ...prev,
        [qId]: { leftIndex: null, rightIndex: null },
      }));
    } else {
      setSelected((prev) => ({
        ...prev,
        [qId]: { leftIndex: null, rightIndex: index },
      }));
    }
  };

  const handleSubmitSingle = async (q) => {
    const qId = q.id;
    const leftItems = q.question.answer.map((a) => a.left);
    const currentMatchMap = matchesByQuestion[qId] ?? {};
    const userAnswerTextMap = {};

    for (const [leftIndex, rightIndex] of Object.entries(currentMatchMap)) {
      const leftItem = leftItems[leftIndex]?.word;
      const rightItem = shuffledRight[rightIndex]?.word;
      if (leftItem && rightItem) {
        userAnswerTextMap[leftItem] = rightItem;
      }
    }

    const payload = {
      question_id: qId,
      type,
      user_answer: JSON.stringify(userAnswerTextMap),
    };

    try {
      await userService.answer({
        answers: [
          {
            question_id: payload.question_id,
            answer: payload.user_answer,
            type: payload.type,
          },
        ],
      });
      toast.success(`Answer submitted successfully.`);
      dispatch(setAttemptQuestions(payload));
      setSubmittedQuestions((prev) => new Set(prev).add(qId));
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    }
  };

  return (
    <>
      <div className="question-header">
        <h2>Question {index + 1}</h2>
        <p><strong>Instruction:</strong> {q.question.instruction}</p>
        <Feedback/>
      </div>
      <div className="question-card mb-0">
        <h2 className="question-text">{parse(q.question.content)}</h2>

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
            <div className="flex flex-col gap-6 left-side">
              {Array.from({ length: maxLength }).map((_, i) => {
                const item = leftItems[i];
                const isConnected = currentMatches[i] !== undefined;
                const isSelected = selectedLeft === i;

                return item ? (
                  <div
                    key={i}
                    id={`left-${qId}-${i}`}
                    className={`link-item ${isConnected ? "connected" : ""} ${
                      isSelected ? "selected" : ""
                    } ${isSubmitted ? "disabled" : ""}`}
                    onClick={() => handleLeftClick(qId, i)}
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

            <div className="flex flex-col gap-6 right-side">
              {Array.from({ length: maxLength }).map((_, i) => {
                const item = shuffledRight[i];
                const isConnected = Object.values(currentMatches).includes(i);
                const isSelected = selectedRight === i;

                return item ? (
                  <div
                    key={i}
                    id={`right-${qId}-${i}`}
                    className={`link-item ${isConnected ? "connected" : ""} ${
                      isSelected ? "selected" : ""
                    } ${isSubmitted ? "disabled" : ""}`}
                    onClick={() => handleRightClick(qId, i)}
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

            {Object.entries(currentMatches).map(
              ([leftIndex, rightIndex], i) => {
                const colors = [
                  "#a637f7",
                  "#d10d0d",
                  "#FF8C00",
                  "#00008B",
                  "#006400",
                  "#9B870C",
                  "#8B008B",
                  "#0dd8d8",
                  "#3B3B3B",
                  "#4B3621",
                  "#191970",
                  "#800000",
                  "#5F9EA0",
                  "#483D8B",
                  "#556B2F",
                ];
                return (
                  <Xarrow
                    key={`${qId}-${i}`}
                    start={`left-${qId}-${leftIndex}`}
                    end={`right-${qId}-${rightIndex}`}
                    startAnchor="right"
                    endAnchor="left"
                    strokeWidth={3}
                    curveness={0.5}
                    path="smooth"
                    animateDrawing
                    headSize={4}
                    color={colors[i % colors.length]}
                  />
                );
              }
            )}
          </div>
        </div>
        {/* map(pair => `${pair.left.word} → ${pair.right.word}`).join("\n"); */}
        {isSubmitted && (
          <div className="mt-4 p-3 border rounded bg-green-100 text-green-800 font-semibold whitespace-pre-line">
            Correct Answer:
            <div className="mt-2">
              {question?.question?.answer
                ?.map(
                  (pair, idx) =>
                    `${idx + 1}. ${pair.left.word} → ${pair.right.word}`
                )
                .join(",\n")}
            </div>
          </div>
        )}
        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={() => handleSubmitSingle(q)}
            className="dashboard-button"
            disabled={isSubmitted || isButtonDisabled}
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default LinkingAssignment;
