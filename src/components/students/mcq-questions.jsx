import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const McqQuestions = (props) => {
  const { questions, type, page, setPage } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionChange = (e, question, option) => {
    const userAnswer = e?.target?.value;
    setSelectedAnswers((prev) => ({
      ...prev,
      [question.id]: userAnswer,
    }));

    let payload = {
      question_id: question?.id,
      answer:
        type === "mcq"
          ? question?.question?.answer?.answer
          : question?.question?.answer?.choice,
      user_answer: userAnswer,
      type: type,
    };

    dispatch(setAttemptQuestions(payload));
  };

  const handleSubmit = async () => {
    const payload = {
      answers: answersStore?.map((item) => ({
        question_id: item.question_id,
        answer: item.user_answer,
        type: item?.type,
      })),
    };

    await userService
      .answer(payload)
      .then(() => {
        toast.success("Answer submitted successfully.");
        navigate("/student");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  console.log(questions);
  return (
    <>
      {questions?.questions_array?.map((question, index) => {
        const selectedAnswer = answersStore?.find(
          (ans) => ans.question_id === question.id
        );
        const userAnswer = selectedAnswers[question.id];

        return (
          <div key={index}>
            <h2 className="mb-3">Question</h2>
            <div>
              {" "}
              <strong>Instruction:</strong> {question.question.instruction}
            </div>
            <div className="question-card">
              <div className="question-text mb-2">
                {page}.{" "}
                {typeof question?.question?.content === "string"
                  ? parse(question.question.content)
                  : ""}
              </div>

              <div className="mcq-options mt-2">
                {question?.question?.options?.map((opt, idx) => {
                  const isSelected = userAnswer === opt.value;
                  const isCorrect = opt.is_correct;
                  const showFeedback = userAnswer !== undefined;
                  const optionColor = showFeedback
                    ? isSelected
                      ? isCorrect
                        ? "bg-success-100 border-green-500 text-green-700"
                        : "bg-danger-100 border-red-500 text-red-700"
                      : ""
                    : "";

                  return (
                    <div
                      key={idx}
                      className={`flex items-start border rounded p-2 mb-2 ${optionColor}`}
                    >
                      <label className="flex items-center w-full cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={opt.value}
                          checked={userAnswer === opt.value}
                          onChange={(e) => handleOptionChange(e, question, opt)}
                          className="mr-2 mt-1"
                        />
                        <span className="flex-1">{opt.value}</span>
                      </label>
                      {isSelected && opt.explanation && (
                        <div className="ml-4 text-sm w-1/2">
                          <strong>Explanation:</strong> {parse(opt.explanation)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="btn btn-primary mr-2"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={questions?.pagination?.current_page === 1}
              >
                Previous
              </button>

              {questions?.pagination?.total === page ? (
                <button onClick={handleSubmit} className="btn btn-primary ml-2">
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="btn btn-primary"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default McqQuestions;
