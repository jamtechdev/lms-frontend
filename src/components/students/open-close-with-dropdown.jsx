import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const OpenClozeWithDropdown = (props) => {
  const { questions, type, page, setPage } = props;
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);
  const [inputs, setInputs] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});

  useEffect(() => {
    setInputs({});
    setSubmittedQuestions({});
  }, [questions]);

  const handleStoreData = async (question) => {
    const questionId = question?.id;

    const payload = {
      question_id: questionId,
      type: type,
      user_answer: JSON.stringify(inputs[questionId]),
    };

    dispatch(setAttemptQuestions(payload));
    const updatedAnswers = [...answersStore, payload];

    const finalPayload = {
      answers: updatedAnswers.map((item) => ({
        question_id: item.question_id,
        answer: item.user_answer,
        type: item.type,
      })),
    };

    try {
      await userService.answer(finalPayload);
      toast.success("Answer submitted successfully.");
      setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit answer.");
    }
  };

  const handleOptionClick = (questionId, blankNumber, selectedOption) => {
    if (submittedQuestions[questionId]) return;

    setInputs((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [blankNumber]: selectedOption,
      },
    }));
  };

  return (
    <>
      {questions.questions_array.map((qObj, index) => {
        const questionData = qObj.question;
        const paragraph = (questionData.paragraph || "").replace(
          /<[^>]+>/g,
          ""
        );
        const blanks = questionData.questions || [];
        const questionId = qObj.id;
        const selectedAnswers = inputs[questionId] || {};
        const isSubmitted = submittedQuestions[questionId] || false;

        const renderedParagraph = paragraph
          .split(/(\(\d+\)\[[^\]]+\])/g)
          .map((part, i) => {
            const match = part.match(/\((\d+)\)\[([^\]]+)\]/);
            if (match) {
              const blankNumber = parseInt(match[1]);
              const optionsText = match[2];
              const question = blanks.find(
                (q) => q.blank_number === blankNumber
              );
              if (!question) return <span key={i}>{part}</span>;

              const selectedAnswer = selectedAnswers[blankNumber];
              const options = optionsText.split("/").map((opt) => opt.trim());

              return (
                <span key={i} style={{ margin: "0 5px" }}>
                  [
                  {options.map((opt, idx) => {
                    const isSelected = selectedAnswer === opt;
                    return (
                      <Fragment key={idx}>
                        {idx !== 0 && (
                          <span style={{ margin: "0 3px" }}>/</span>
                        )}
                        <span
                          onClick={() =>
                            handleOptionClick(questionId, blankNumber, opt)
                          }
                          style={{
                            cursor: isSubmitted ? "not-allowed" : "pointer",
                            margin: "0 5px",
                            fontWeight: "bold",
                            textDecoration: isSelected ? "underline" : "none",
                            opacity: isSubmitted ? 0.6 : 1,
                          }}
                        >
                          {opt}
                        </span>
                      </Fragment>
                    );
                  })}
                  ]
                </span>
              );
            } else {
              return <span key={i}>{part}</span>;
            }
          });

        const allAnswered = blanks.every(
          (q) => selectedAnswers[q.blank_number]
        );

        return (
          <div key={index} style={{ marginBottom: "30px" }}>
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                background: "#f9f9f9",
              }}
            >
              <strong>Instruction:</strong> {questionData.instruction}
            </div>

            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                lineHeight: "1.8",
              }}
            >
              <strong>
                {(page - 1) * questions.pagination.per_page + index + 1}.
              </strong>{" "}
              {renderedParagraph}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleStoreData(qObj)}
                className="btn btn-primary mt-3"
                disabled={!allAnswered || isSubmitted}
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

export default OpenClozeWithDropdown;
