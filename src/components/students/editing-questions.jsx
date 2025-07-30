import parse from "html-react-parser";
import { useEffect, useState } from "react";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelected,
  setAttemptQuestions,
} from "../../_store/_reducers/question";
import Feedback from "../Feedback";
import { getChildId } from "../../_store/_reducers/auth";

const EditingQuesions = ({ question, index }) => {
  const dispatch = useDispatch();
  const answersStore = useSelector(getSelected);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [inputs, setInputs] = useState({});
  const childId = useSelector(getChildId);
  const questionData = question?.question || {};
  const paragraph = questionData?.paragraph || "";
  const boxes = questionData?.questions || [];
  const questionId = question?.id;
  const instruction = questionData?.instruction || "";
  const type = questionData?.type || "";

  useEffect(() => {
    setInputs({});
    setAnswers([]);

    const saved = answersStore.find((ans) => ans.question_id === questionId);
    if (saved?.answer || saved?.user_answer) {
      try {
        const parsed = JSON.parse(saved.answer || saved.user_answer);
        setInputs(parsed);
        setAnswers([
          {
            question_id: questionId,
            user_answer: JSON.stringify(parsed),
            type: type,
          },
        ]);
        setSubmitted(true);
      } catch (err) {
        console.warn("Invalid answer format:", err);
      }
    }
  }, [questionId, answersStore]);

  const handleInputChange = (e, boxNumber) => {
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [boxNumber]: value }));
  };

  const isAnyInputFilled = boxes.every(
  (box) => inputs[box.box] && inputs[box.box].trim() !== ""
);

  const handleStoreData = async () => {
    const payload = {
      question_id: questionId,
      type: type,
      user_answer: JSON.stringify(inputs),
    };

    const updatedAnswers = [
      ...answers.filter((a) => a.question_id !== questionId),
      payload,
    ];
    setAnswers(updatedAnswers);
    setSubmitted(true);

    const finalPayload = {
      answers: updatedAnswers.map((item) => ({
        question_id: item.question_id,
        answer: item.user_answer,
        type: item?.type,
          child_id: childId,
      })),
    };

    try {
      const response = await userService.answer(finalPayload);
      toast.success("Answer submitted successfully.");
      toast.success(response?.message);
      dispatch(setAttemptQuestions(finalPayload?.answers[0]));
    } catch (error) {
      console.error("Error", error);
      toast.error("Submission failed.");
    }
  };

  const renderedParagraph = paragraph.split(/(\(\d+\))/g).map((part, i) => {
    const match = part.match(/\((\d+)\)/);
    if (match) {
      const boxNumber = parseInt(match[1]);
      const correctAnswer =
        boxes.find((q) => q.box === boxNumber)?.correct || "";
      const inputVal = inputs[boxNumber] || "";
      const isWrong =
        submitted &&
        inputVal.trim().toLowerCase() !== correctAnswer.trim().toLowerCase();

      return (
        <span
          key={`input-${i}`}
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 4px",
            verticalAlign: "middle",
          }}
        >
          <input
            type="text"
            value={inputVal}
            disabled={submitted}
            placeholder={`Word ${boxNumber}`}
            onChange={(e) => handleInputChange(e, boxNumber)}
            style={{
              width: "100px",
              padding: "4px 6px",
              fontSize: "15px",
              border: "1px solid",
              borderColor: submitted
                ? isWrong
                  ? "#dc2626"
                  : "#22c55e"
                : "#cbd5e1",
              borderRadius: "6px",
              backgroundColor: submitted && isWrong ? "#fef2f2" : "#fff",
              textAlign: "center",
            }}
          />
          {submitted && (
            <div
              style={{
                fontSize: "11px",
                marginTop: "2px",
                color: isWrong ? "#dc2626" : "#22c55e",
                minHeight: "14px",
                whiteSpace: "nowrap",
              }}
            >
              {isWrong ? `✓ ${correctAnswer}` : ""}
            </div>
          )}
        </span>
      );
    } else {
      return (
        <span
          key={`text-${i}`}
          style={{
            display: "inline-flex",
            whiteSpace: "pre-wrap",
          }}
        >
          {parse(part)}
        </span>
      );
    }
  });

  return (
    <>
      <div className="question-header">
        <h2>Question {index + 1}</h2>
          <p className="instruction-text">
          <strong>Instruction:</strong> {instruction}
        </p>
        <Feedback question_id={question?.id} />
      </div>
      <div className="question-card">
        <div
          style={{
            borderRadius: "8px",
            backgroundColor: "#f8fafc",
          }}
        >
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
        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={handleStoreData}
            disabled={submitted || !isAnyInputFilled}
            className={`dashboard-button ${
              submitted || !isAnyInputFilled ? "" : ""
            }`}
          >
            {submitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditingQuesions;
