import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAssignmentsQuestion } from "../../../_store/_reducers/question";
import Feedback from "../../Feedback";

const OpenClozeWithDropdownAssignment = ({ question, index }) => {
  const dispatch = useDispatch();
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
    dispatch(setAssignmentsQuestion(payload));
    toast.success("Answer submitted successfully.");
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
  }, [questionId]);

  return (
    <>
      <div className="question-header">
        <h2>Question {index + 1}</h2>
     <Feedback question_id={question?.id}/>
      </div>
      <div className="question-card">
        <p className="instruction-text"> <strong>Instruction:</strong> {questionData.instruction}</p>
        <div>
          <strong>{index + 1}.</strong> {renderedParagraph}
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={handleStoreData}
            className="dashboard-button"
            disabled={question?.is_attempt || !allAnswered || isSubmitted}
          >
            {(question?.is_attempt || isSubmitted) ? "Attempted" : "Submit"}
          </button>
        </div>

      </div>
    </>
  );
};

export default OpenClozeWithDropdownAssignment;
