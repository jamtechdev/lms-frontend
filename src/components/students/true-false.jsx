import React, { useState } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const TrueFalseQuestions = (props) => {
  const { question, index, } = props;
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);

  const [submittedQuestions, setSubmittedQuestions] = useState({});

  const handleOptionChange = (e, question) => {
    const payload = {
      question_id: question?.id,
      answer: question?.question?.answer?.choice,
      user_answer: e?.target?.value,
      // type: type,
    };
    dispatch(setAttemptQuestions(payload));
  };

  const handleSubmit = async (question) => {
    const selectedAnswer = answersStore?.find(
      (item) => item.question_id === question.id
    );

    if (!selectedAnswer) return;

    const payload = {
      answers: [
        {
          question_id: question.id,
          answer: selectedAnswer.user_answer,
          type: question?.question?.type,
        },
      ],
    };

    try {
      await userService.answer(payload);
      toast.success("Answer submitted successfully.");
      setSubmittedQuestions((prev) => ({
        ...prev,
        [question.id]: true,
      }));
    } catch (error) {
      console.error("Error", error);
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
        {question?.question?.options?.map((opt, idx) => (
          <div key={idx}>
            <label className="kbc-option-label">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={opt?.value}
                // disabled={isSubmitted}
                // checked={selectedAnswer?.user_answer == opt?.value}
                onChange={(e) => handleOptionChange(e, question)}
              />
              {opt.value}
            </label>
          </div>
        ))}
        {true && (
          <div className="mt-3 text-green-600">
            <strong>Explanation:</strong> {question.question.explation}
          </div>
        )}
        <div className="flex text-end mt-3">
          <button
            onClick={() => handleSubmit(question)}
            className="btn btn-primary mt-3"
          // disabled={!selectedAnswer || isSubmitted}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default TrueFalseQuestions;
