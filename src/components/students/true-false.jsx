import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getSelected, setAttemptQuestions } from "../../_store/_reducers/question";

const TrueFalseQuestions = ({ question, index }) => {
  const dispatch = useDispatch();
  const answersStore = useSelector(getSelected);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      toast.error("Please select an option before submitting.");
      return;
    }

    const payload = {
      answers: [
        {
          question_id: question.id,
          answer: selectedAnswer,
          type: question?.question?.type,
        },
      ],
    };

    try {
      await userService.answer(payload);
      toast.success("Answer submitted successfully.");
      setIsSubmitted(true);
      dispatch(setAttemptQuestions({
        question_id: question.id,
        answer: selectedAnswer,
        type: question?.question?.type,
      }));
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit answer.");
    }
  };

  useEffect(() => {
    const answered = answersStore.some((ans) => ans.question_id === question?.id);
    setIsSubmitted(answered);
    if (answered) {
      const existingAnswer = answersStore.find((ans) => ans.question_id === question?.id);
      setSelectedAnswer(existingAnswer?.answer || "");
    }
  }, [answersStore, question?.id]);

  // The correct answer from the question object
  const correctAnswer = question?.question?.answer?.choice;

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

        {question?.question?.options?.map((opt, idx) => {
          // Highlight selected and correct answers visually
          const isUserSelected = selectedAnswer === opt.value;
          const isCorrect = correctAnswer === opt.value;

          return (
            <div key={idx}>
              <label
                className={`kbc-option-label ${
                  isSubmitted
                    ? isCorrect
                      ? "text-green-600 font-bold"
                      : isUserSelected
                      ? "text-red-600 line-through"
                      : ""
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={opt.value}
                  checked={selectedAnswer === opt.value}
                  disabled={isSubmitted}
                  onChange={handleOptionChange}
                />
                {opt.value}
                {isSubmitted && isCorrect && " (Correct Answer)"}
                {isSubmitted && isUserSelected && !isCorrect && " (Your Answer)"}
              </label>
            </div>
          );
        })}

        {question.question.explation && isSubmitted && (
          <div className="mt-3 text-green-600">
            <strong>Explanation:</strong> {question.question.explation}
          </div>
        )}

        <div className="flex text-end mt-3">
          <button
            onClick={handleSubmit}
            className="btn btn-primary mt-3"
            disabled={isSubmitted || !selectedAnswer}
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TrueFalseQuestions;
