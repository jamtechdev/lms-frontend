import { useState } from "react";
import parse from "html-react-parser";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";

const McqQuestions = ({ question, index }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (e) => {
    if (isSubmitted) return;
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer before submitting.");
      return;
    }

    const payload = {
      answers: [
        {
          question_id: question?.id,
          answer: selectedAnswer,
          type: question?.question?.type || "mcq",
        },
      ],
    };

    try {
      await userService.answer(payload);
      toast.success("Answer submitted successfully.");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit answer.");
    }
  };

  return (
    <>
      <h2 className="mb-3">Question {index + 1}</h2>
      <strong>Instruction:</strong> {question.question.instruction}

      <div className="question-card mt-2">
        <div className="question-text mb-2 font-medium">
          {typeof question?.question?.content === "string"
            ? parse(question.question.content)
            : ""}
        </div>

        <div className="mcq-options mb-3">
          {question?.question.options?.map((opt, idx) => (
            <div key={idx} className="mb-2">
              <label className="kbc-option-label">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={opt.value}
                  checked={selectedAnswer === opt.value}
                  onChange={handleOptionChange}
                  disabled={isSubmitted}
                />
                {opt.value}
              </label>

              {isSubmitted && opt.explanation && selectedAnswer === opt.value && (
                <div className="text-sm text-gray-600 mt-1 ml-6">
                  <strong>Explanation:</strong> {opt.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex text-end mt-3">
          <button
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
            disabled={!selectedAnswer || isSubmitted}
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default McqQuestions;
