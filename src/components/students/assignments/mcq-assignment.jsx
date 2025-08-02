import { useState } from "react";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAssignmentsQuestion } from "../../../_store/_reducers/question";
import Feedback from "../../Feedback";

const McqAssignment = ({ question, index }) => {
  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer before submitting.");
      return;
    }
    const payload = {
      question_id: question?.id,
      user_answer: selectedAnswer,
      type: question?.question?.type || "mcq",
    };
    dispatch(setAssignmentsQuestion(payload));
    toast.success("Answer submitted successfully.");
  };
  return (
    <>
      <div className="question-header">
        <h2>Question {index + 1}</h2>
        <p className="instruction-text">
          <strong>Instruction:</strong> {question.question.instruction}
        </p>
        <Feedback question_id={question?.id} />
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
            return (
              <div key={idx} className="mb-2">
                <label className={`kbc-option-label`}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={opt.value}
                    checked={isUserSelected}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  />
                  {opt.value}
                </label>
                {question?.is_attempt && opt.explanation && (
                  <div className="ml-4 text-sm w-1/2">
                    <strong>Explanation:</strong> {parse(opt.explanation)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            className="dashboard-button"
            onClick={handleSubmit}
            disabled={question?.is_attempt}
          >
            {question?.is_attempt ? "Attempted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default McqAssignment;
