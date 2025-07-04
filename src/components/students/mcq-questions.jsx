import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const McqQuestions = (props) => {
  const { questions, type, page, setPage } = props;
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);

  const handleOptionChange = (e, question) => {
    if (submittedQuestions.includes(question.id)) return;

    const payload = {
      question_id: question?.id,
      answer:
        type === "mcq"
          ? question?.question?.answer?.answer
          : question?.question?.answer?.choice,
      user_answer: e?.target?.value,
      type: type,
    };
    dispatch(setAttemptQuestions(payload));
  };

  const handleSubmit = async (questionId) => {
    const selected = answersStore.find(
      (item) => item.question_id === questionId
    );
    if (!selected) {
      toast.error("Please select an answer before submitting.");
      return;
    }

    const payload = {
      answers: [
        {
          question_id: selected.question_id,
          answer: selected.user_answer,
          type: selected?.type,
        },
      ],
    };

    try {
      await userService.answer(payload);
      toast.success("Answer submitted successfully.");
      setSubmittedQuestions((prev) => [...prev, questionId]);
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Failed to submit answer.");
    }
  };

  return (
    <>
      <h2 className="mb-3">Questions</h2>
      {questions?.questions_array?.map((question, index) => {
        const questionNumber =
          (page - 1) * questions.pagination.per_page + index + 1;
        const selectedAnswer = answersStore?.find(
          (ans) => ans.question_id === question.id
        );
        const isSubmitted = submittedQuestions.includes(question.id);
        return (
          <div
            key={index}
            className="mb-5 border p-4 rounded shadow-sm bg-white"
          >
            <div>
              <strong>Instruction:</strong> {question.question.instruction}
            </div>
            <div className="question-card mt-2">
              <div className="question-text mb-2 font-medium">
                {questionNumber}.{" "}
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
                        checked={selectedAnswer?.user_answer === opt?.value}
                        onChange={(e) => handleOptionChange(e, question)}
                        disabled={isSubmitted}
                      />{" "}
                      {opt.value}
                    </label>
                    {isSubmitted && opt.explanation && (
                      <div className="text-sm text-gray-600 mt-1 ml-6">
                        <strong>Explanation:</strong> {opt.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSubmit(question.id)}
                className="btn btn-primary"
                disabled={isSubmitted || !selectedAnswer?.user_answer}
              >
                {isSubmitted ? "Submitted" : "Submit"}
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

export default McqQuestions;
