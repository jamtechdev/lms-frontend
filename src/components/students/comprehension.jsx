import { useEffect, useState } from "react";
import parse from "html-react-parser";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";

const Comprehension = ({ question, index }) => {
  const [inputs, setInputs] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answersStore, setAnswersStore] = useState([]);

  const questionData = question?.question || {};
  const passage = questionData?.passage || "";
  const subquestions = questionData?.subquestions || [];
  const questionId = question?.id;
  const questionType = questionData?.type;

  useEffect(() => {
    setInputs([]);
    setAnswersStore([]);
  }, [questionId]);

  const handleChange = (subQues, value, type) => {
    setInputs((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((item) => item.subQues === subQues);
      if (index !== -1) {
        updated[index] = { subQues, user_answer: value, type };
      } else {
        updated.push({ subQues, user_answer: value, type });
      }
      return updated;
    });

    const updatedInputs = [...inputs];
    const idx = updatedInputs.findIndex((i) => i.subQues === subQues);
    if (idx !== -1) {
      updatedInputs[idx] = { subQues, user_answer: value, type };
    } else {
      updatedInputs.push({ subQues, user_answer: value, type });
    }

    const newAttempt = {
      question_id: questionId,
      type: questionType,
      user_answer: JSON.stringify(updatedInputs),
    };

    const updatedAnswers = [
      ...answersStore.filter((a) => a.question_id !== questionId),
      newAttempt,
    ];
    setAnswersStore(updatedAnswers);
  };

  const handlePaperSubmit = async () => {
    const payload = {
      answers: answersStore?.map((item) => ({
        question_id: item.question_id,
        answer: item.user_answer,
        type: item?.type,
      })),
    };

    try {
      await userService.answer(payload);
      toast.success("Answer submitted successfully.");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to submit answers.");
    }
  };

  const getPrefilled = (subq) => {
    const stored = answersStore.find((item) => item.question_id === questionId);
    if (stored) {
      try {
        const parsed = JSON.parse(stored.user_answer || "[]");
        return parsed.find((i) => i.subQues === subq.question);
      } catch {
        return null;
      }
    }
    return null;
  };

  return (
    <>
      <h2 className="mb-3">Question {index + 1}</h2>
      <strong>Instruction:</strong> {question.question.instruction}
      <div className="question-card max75">
        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            background: "#f1f5f9",
            borderLeft: "5px solid #2563eb",
          }}
        >
          <h4>Passage:</h4>
          <div>{parse(passage)}</div>
        </div>

        {subquestions.map((subq, subIndex) => {
          const prefilled = getPrefilled(subq);
          const parsedQuestion = typeof subq?.question === "string" ? parse(subq.question) : "";
          const inputName = `input-${questionId}-${subIndex}`;

          if (subq.type === "mcq" || subq.type === "true_false") {
            const options = subq.type === "mcq" ? subq.options : ["True", "False"];
            return (
              <div key={subIndex}>
                <div className="question-text mt-2">
                  {subIndex + 1}. {parsedQuestion}
                </div>
                {options.map((opt, i) => (
                  <div key={i}>
                    <label className="kbc-option-label">
                      <input
                        type="radio"
                        name={inputName}
                        disabled={isSubmitted}
                        value={opt}
                        checked={prefilled?.user_answer === opt}
                        onChange={(e) =>
                          handleChange(subq.question, e.target.value, subq.type)
                        }
                      />
                      {opt}
                    </label>
                  </div>
                ))}
              </div>
            );
          }

          if (subq.type === "fill_blank") {
            return (
              <div key={subIndex}>
                <div className="question-text mt-2">
                  {subIndex + 1}. {parsedQuestion}
                </div>
                <input
                  type="text"
                  className="comprehension_input"
                  disabled={isSubmitted}
                  value={prefilled?.user_answer || ""}
                  onChange={(e) =>
                    handleChange(subq.question, e.target.value, subq.type)
                  }
                />
              </div>
            );
          }

          if (subq.type === "open_ended") {
            return (
              <div key={subIndex} className="comprehension-subq">
                <div className="question-text mt-2">
                  {subIndex + 1}. {parsedQuestion}
                </div>
                <textarea
                  rows={3}
                  style={{
                    width: "100%",
                    borderColor: "#ccc",
                    padding: "8px",
                    borderRadius: "4px",
                  }}
                  disabled={isSubmitted}
                  value={prefilled?.user_answer || ""}
                  onChange={(e) =>
                    handleChange(subq.question, e.target.value, subq.type)
                  }
                  placeholder="Type your answer here..."
                />
              </div>
            );
          }

          return null;
        })}

        <button
          onClick={handlePaperSubmit}
          className="btn btn-primary mt-3"
          disabled={isSubmitted || subquestions.length === 0}
        >
          {isSubmitted ? "Submitted" : "Submit"}
        </button>
      </div>
    </>
  );
};
export default Comprehension;
