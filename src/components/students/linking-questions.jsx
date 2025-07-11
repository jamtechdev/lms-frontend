import parse from "html-react-parser";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Xarrow from "react-xarrows";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import { userService } from "../../_services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const LinkingQuestions = ({
  questions,
  type,
  page,
  setPage,
  shuffledRight,
}) => {
  const [matchesByQuestion, setMatchesByQuestion] = useState({});
  const [selected, setSelected] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState(new Set());

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answersStore = useSelector((state) => state.question.attempts);

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

    dispatch(setAttemptQuestions(payload));

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
      toast.success(`Answer submitted`);
      setSubmittedQuestions((prev) => new Set(prev).add(qId));
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    }
  };

  return (
    <div>
      {questions.questions_array.map((q, qIdx) => {
        if (!Array.isArray(q.question.answer)) return null;

        const qId = q.id;
        const currentMatches = matchesByQuestion[qId] ?? {};
        const leftItems = q.question.answer.map((a) => a.left);
        const maxLength = Math.max(leftItems.length, shuffledRight.length);
        const selectedLeft = selected[qId]?.leftIndex;
        const selectedRight = selected[qId]?.rightIndex;
        const isSubmitted = submittedQuestions.has(qId);
        const isButtonDisabled = Object.keys(currentMatches).length === 0;

        return (
          <div key={qId} className="mb-10">
            <div>
              <strong>Instruction:</strong> {q.question.instruction}
            </div>
            <div className="question-card mb-0">
              <h2 className="question-text mb-4">
                {questions.pagination.per_page * (page - 1) + qIdx + 1}.{" "}
                {parse(q.question.content)}
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
                  <div className="flex flex-col gap-6 left-side">
                    {Array.from({ length: maxLength }).map((_, i) => {
                      const item = leftItems[i];
                      const isConnected = currentMatches[i] !== undefined;
                      const isSelected = selectedLeft === i;

                      return item ? (
                        <div
                          key={i}
                          id={`left-${qId}-${i}`}
                          className={`link-item ${
                            isConnected ? "connected" : ""
                          } ${isSelected ? "selected" : ""} ${
                            isSubmitted ? "disabled" : ""
                          }`}
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
                      const isConnected =
                        Object.values(currentMatches).includes(i);
                      const isSelected = selectedRight === i;

                      return item ? (
                        <div
                          key={i}
                          id={`right-${qId}-${i}`}
                          className={`link-item ${
                            isConnected ? "connected" : ""
                          } ${isSelected ? "selected" : ""} ${
                            isSubmitted ? "disabled" : ""
                          }`}
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

                  {(() => {
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

                    return Object.entries(currentMatches).map(
                      ([leftIndex, rightIndex], i) => (
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
                      )
                    );
                  })()}
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleSubmitSingle(q)}
                  className="btn btn-primary"
                  disabled={isSubmitted || isButtonDisabled}
                >
                  {isSubmitted ? "Submitted" : "Submit"}
                </button>
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default LinkingQuestions;
