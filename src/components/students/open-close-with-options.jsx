import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const OpenClozeWithOptions = (props) => {
  const { questions, type, page, setPage } = props;
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);
  const [inputs, setInputs] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [userAnswerJSON, setUserAnswerJSON] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});

  useEffect(() => {
    setInputs({});
    setInputErrors({});
    setUserAnswerJSON({});
    setSubmittedQuestions({});
  }, [page]);

  const handlePaperSubmit = async (questionId) => {
    const payload = {
      answers: answersStore?.map((item) => ({
        question_id: item.question_id,
        answer: item.user_answer,
        type: item?.type,
      })),
    };

    try {
      await userService.answer(payload);
      toast.success("Answer submitted successfully.");
      setSubmittedQuestions((prev) => ({
        ...prev,
        [questionId]: true,
      }));
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      {questions.questions_array.map((qObj, index) => {
        const questionData = qObj.question;
        const paragraph = questionData.paragraph;
        const blanks = questionData.questions;
        const options =
          questionData?.question_group?.shared_options?.map((opt) =>
            opt.toLowerCase()
          ) || [];

        const handleChange = (e, questionId, blank_number, inputId) => {
          const value = e.target.value.trim();

          setInputs((prev) => ({
            ...prev,
            [questionId]: {
              ...(prev[questionId] || {}),
              [inputId]: value,
            },
          }));

          const isValid = value === "" || options.includes(value.toLowerCase());

          setInputErrors((prev) => ({
            ...prev,
            [questionId]: {
              ...(prev[questionId] || {}),
              [inputId]: !isValid,
            },
          }));

          if (isValid) {
            setUserAnswerJSON((prev) => {
              const updated = [...(prev[questionId] || [])];
              const idx = updated.findIndex(
                (item) => item.blank_number === blank_number
              );
              if (idx !== -1) {
                updated[idx] = { blank_number, value };
              } else {
                updated.push({ blank_number, value });
              }

              const newState = {
                ...prev,
                [questionId]: updated,
              };

              dispatch(
                setAttemptQuestions({
                  question_id: questionId,
                  type: type,
                  user_answer: JSON.stringify(updated),
                })
              );

              return newState;
            });
          }
        };

        const renderedParagraph = paragraph
          ?.split(/(\(\d+\)_____)/g)
          ?.map((part, i) => {
            const match = part.match(/\((\d+)\)_____/);
            if (match) {
              const blankNumber = parseInt(match[1]);
              const question = blanks.find(
                (q) => q.blank_number === blankNumber
              );

              const inputValue =
                inputs[qObj.id]?.[question.id] ||
                JSON.parse(
                  answersStore?.find((item) => item.question_id === qObj.id)
                    ?.user_answer || "[]"
                )?.find((item) => item.blank_number === blankNumber)?.value ||
                "";

              const hasError = inputErrors[qObj.id]?.[question.id];

              return (
                <span key={i}>
                  <span style={{ fontWeight: "bold", marginLeft: "7px" }}>
                    ({blankNumber})
                  </span>
                  <input
                    type="text"
                    placeholder="_____"
                    value={inputValue}
                    onChange={(e) =>
                      handleChange(e, qObj.id, blankNumber, question.id)
                    }
                    style={{
                      width: "60px",
                      margin: "0 5px",
                      border: "none",
                      background: "transparent",
                      borderBottom: hasError ? "2px solid red" : "none",
                      textAlign: "center",
                    }}
                  />
                </span>
              );
            } else {
              return <span key={i}>{part}</span>;
            }
          });

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
              <div>
                <strong>Instruction:</strong> {questionData.instruction}
              </div>
            </div>

            {options.length > 0 && (
              <div>
                <strong>Options:</strong> {options.join(", ")}
              </div>
            )}

            <div className="px-0 py-3 options">
              <strong>
                {(page - 1) * questions.pagination.per_page + index + 1}. .
              </strong>{" "}
              {renderedParagraph}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handlePaperSubmit(qObj.id)}
                className="btn btn-primary mt-3"
                disabled={submittedQuestions[qObj.id]}
              >
                {submittedQuestions[qObj.id] ? "Submitted" : "Submit"}
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

export default OpenClozeWithOptions;
