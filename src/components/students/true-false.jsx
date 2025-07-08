import React, { useState } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const TrueFalseQuestions = (props) => {
  const { questions, page, setPage, type } = props;
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);

  const [submittedQuestions, setSubmittedQuestions] = useState({});

  const handleOptionChange = (e, question) => {
    const payload = {
      question_id: question?.id,
      answer: question?.question?.answer?.choice,
      user_answer: e?.target?.value,
      type: type,
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
          type: type,
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
      <h2 className="mb-3">Questions</h2>
      {questions?.questions_array?.map((question, index) => {
        const selectedAnswer = answersStore?.find(
          (ans) => ans.question_id === question.id
        );
        const isSubmitted = submittedQuestions[question.id];

        return (
          <div key={index}>
            <strong>Instruction:</strong> {question.question.instruction}
            <div className="question-card max50 mb-0">
              <div className="question-text">
                {(page - 1) * questions.pagination.per_page + index + 1}.{" "}
                {typeof question?.question?.content === "string"
                  ? parse(question.question.content)
                  : ""}
              </div>
              {question?.question.options?.map((opt, idx) => (
                <div key={idx}>
                  <label className="kbc-option-label">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={opt?.value}
                      disabled={isSubmitted}
                      checked={selectedAnswer?.user_answer == opt?.value}
                      onChange={(e) => handleOptionChange(e, question)}
                    />
                    {opt.value}
                  </label>
                </div>
              ))}
            </div>
            {isSubmitted && (
              <div className="mt-3 text-green-600">
                <strong>Explanation:</strong> {question.question.explation}
              </div>
            )}
            <div className="flex justify-end mt-3">
              <button
                onClick={() => handleSubmit(question)}
                className="btn btn-primary mt-3"
                disabled={!selectedAnswer || isSubmitted}
              >
                Submit
              </button>
            </div>
          </div>
        );
      })}
      {questions?.pagination?.total_pages > 1 && (
        <div className="mt-4 flex justify-center">
          <ResponsivePagination
            current={page}
            total={questions.pagination.total_pages}
            onPageChange={setPage}
          />
        </div>
      )}
    </>
  );
};

export default TrueFalseQuestions;
