import { useEffect, useState } from "react";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";

const OpenClozeWithDropdown = ({ question, index }) => {
  const [inputs, setInputs] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [answersStore, setAnswersStore] = useState([]);

  useEffect(() => {
    setInputs({});
    setSubmittedQuestions({});
    setAnswersStore([]);
  }, [question?.id]);

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
      ...answersStore.filter((a) => a.question_id !== questionId),
      payload,
    ];
    setAnswersStore(updatedAnswers);

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

  return (
    <div>
      <h2 className="mb-3">Question {index + 1}</h2>
      <div>
        <strong>Instruction:</strong> {questionData.instruction}
      </div>

      <div className="question-card mt-2">
        <div>
          <strong>{index + 1}.</strong> {renderedParagraph}
        </div>

        <div className="flex text-end mt-4">
          <button
            onClick={handleStoreData}
            className="btn btn-primary mt-3"
            disabled={!allAnswered || isSubmitted}
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenClozeWithDropdown;
