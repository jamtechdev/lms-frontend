import { useEffect, useState } from "react";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelected,
  setAttemptQuestions,
} from "../../_store/_reducers/question";
import Feedback from "../Feedback";

const OpenClozeWithDropdown = ({ question, index }) => {
  const dispatch = useDispatch();
  const answersStore = useSelector(getSelected);
  const [inputs, setInputs] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [answers, setAnswers] = useState([]);

  const questionData = question?.question || {};
  const paragraph = (questionData.paragraph || "").replace(/<[^>]+>/g, "");
  const blanks = questionData.questions || [];
  const questionId = question?.id;
  const questionType = questionData?.question_type;

  const selectedAnswers = inputs[questionId] || {};
  const isSubmitted = submittedQuestions[questionId] || false;

  const handleStoreData = async () => {
    const payload = {
      question_id: questionId,
      type: questionType,
      user_answer: JSON.stringify(inputs[questionId]),
    };

    const updatedAnswers = [
      ...answers.filter((a) => a.question_id !== questionId),
      payload,
    ];
    setAnswers(updatedAnswers);

    const finalPayload = {
      answers: updatedAnswers.map((item) => ({
        question_id: item.question_id,
        answer: item.user_answer,
        type: item.type,
      })),
    };

    try {
      await userService.answer(finalPayload);
      toast.success("Answer submitted successfully.");
      setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
      dispatch(
        setAttemptQuestions({
          question_id: questionId,
          type: questionType,
          user_answer: JSON.stringify(inputs[questionId]),
        })
      );
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit answer.");
    }
  };

  const handleSelectChange = (blankNumber, selectedOption) => {
    if (isSubmitted) return;

    setInputs((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [blankNumber]: selectedOption,
      },
    }));
  };

  const renderedParagraph = paragraph
    .split(/(\(\d+\)\[[^\]]+\])/g)
    .map((part, i) => {
      const match = part.match(/\((\d+)\)\[[^\]]+\]/);
      if (match) {
        const blankNumber = parseInt(match[1]);
        const blank = blanks.find((b) => b.blank_number === blankNumber);
        if (!blank) return <span key={i}>{part}</span>;

        const selectedValue = selectedAnswers[blankNumber] || "";

        return (
          <select
            key={i}
            value={selectedValue}
            disabled={isSubmitted}
            onChange={(e) => handleSelectChange(blankNumber, e.target.value)}
            style={{
              margin: "0 5px",
              padding: "3px 8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: isSubmitted ? "#f0f0f0" : "#fff",
              cursor: isSubmitted ? "not-allowed" : "pointer",
            }}
          >
            <option value="">-- Select --</option>
            {blank.options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      } else {
        return <span key={i}>{part}</span>;
      }
    });

  const allAnswered = blanks.every((q) => selectedAnswers[q.blank_number]);
  useEffect(() => {
    setInputs({});
    setSubmittedQuestions({});
    setAnswers([]);
    // ✅ Restore answer from Redux store if it exists
    const saved = answersStore.find((ans) => ans.question_id === questionId);

    if (saved?.answer || saved?.user_answer) {
      try {
        const parsed = JSON.parse(saved.answer || saved.user_answer);

        setInputs((prev) => ({
          ...prev,
          [questionId]: parsed,
        }));

        setSubmittedQuestions((prev) => ({
          ...prev,
          [questionId]: true,
        }));
      } catch (err) {
        console.warn("Invalid answer format", err);
      }
    }
  }, [questionId, answersStore]);
  return (
    <>
      <div className="question-header">
        <h2>Question {index + 1}</h2>
        <p> <strong>Instruction:</strong> {questionData.instruction}</p>
        <Feedback/>
      </div>
      <div className="question-card">
        <div>
          <strong>{index + 1}.</strong> {renderedParagraph}
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={handleStoreData}
            className="dashboard-button"
            disabled={!allAnswered || isSubmitted}
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
        {isSubmitted && (
          <div className="mt-4 p-3 border rounded bg-green-100 text-green-800 font-semibold whitespace-pre-line">
            Correct Answers:
            <div className="mt-2">
              {blanks.map((blank, idx) => (
                <div key={blank.id}>
                  {idx + 1}. ({blank.blank_number}) → {blank.correct_answer}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OpenClozeWithDropdown;
