import React, { useState } from "react";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAssignmentsQuestion } from "../../../_store/_reducers/question";
import Feedback from "../../Feedback";

const TrueFalseAssignment = ({ question, index }) => {
  const dispatch = useDispatch();
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
      question_id: question.id,
      user_answer: selectedAnswer,
      type: question?.question?.type,
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
      <div className="question-card mt-2">
        <div className="question-text">
          {typeof question?.question?.content === "string"
            ? parse(question.question.content)
            : ""}
        </div>

        {question?.question?.options?.map((opt, idx) => {
          return (
            <div key={idx}>
              <label className={`kbc-option-label`}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={opt.value}
                  checked={selectedAnswer === opt.value}
                  disabled={isSubmitted}
                  onChange={handleOptionChange}
                />
                {opt.value}
              </label>
            </div>
          );
        })}

        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={handleSubmit}
            className="dashboard-button"
            disabled={question?.is_attempt || !selectedAnswer}
          >
            {question?.is_attempt ? "Attempted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TrueFalseAssignment;
