import { useEffect, useState } from "react";
import parse from "html-react-parser";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelected,
  setAttemptQuestions,
} from "../../_store/_reducers/question";
import Feedback from "../Feedback";

const McqQuestions = ({ question, index }) => {
  const dispatch = useDispatch();
  const answersStore = useSelector(getSelected);
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
      dispatch(
        setAttemptQuestions({
          question_id: question.id,
          answer: selectedAnswer,
          type: question?.question?.type || "mcq",
        })
      );
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit answer.");
    }
  };

  useEffect(() => {
    const answered = answersStore.some(
      (ans) => ans.question_id === question?.id
    );
    setIsSubmitted(answered);
    if (answered) {
      const existingAnswer = answersStore.find(
        (ans) => ans.question_id === question?.id
      );
      setSelectedAnswer(existingAnswer?.answer || "");
    }
  }, [answersStore, question?.id]);

  // Get correct answer text
  const correctAnswerText = question?.question?.answer?.answer;

  return (
    <>
      <div className="question-header">
        <h2>Question {index + 1}</h2>
        <p><strong>Instruction:</strong> {question.question.instruction}</p>
        <Feedback/>
      </div>
      <div className="question-card">
        <div className="question-text">
          {typeof question?.question?.content === "string"
            ? parse(question.question.content)
            : ""}
        </div>

        <div className="mcq-options mb-3">
          {question?.question.options?.map((opt, idx) => {
            const isUserSelected = selectedAnswer === opt.value;
            const isCorrect = !!opt.is_correct;

            return (
              <div key={idx} className="mb-2">
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
                    checked={isUserSelected}
                    onChange={handleOptionChange}
                    disabled={isSubmitted}
                  />
                  {opt.value}
                  {isSubmitted && isCorrect && " (Correct Answer)"}
                  {isSubmitted &&
                    isUserSelected &&
                    !isCorrect &&
                    " (Your Answer)"}
                </label>
              </div>
            );
          })}
        </div>

        {/* {isSubmitted && (
          <div className="mt-4 p-3 border rounded bg-green-100 text-green-800 font-semibold">
            Correct Answer: <span>{correctAnswerText}</span>
          </div>
        )} */}
        <div className="d-flex justify-content-end mt-4">
          <button
            className="dashboard-button"
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
