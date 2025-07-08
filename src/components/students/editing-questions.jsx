import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const EditingQuesions = (props) => {
  const { questions, page, setPage, type } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState({});
  const answersStore = useSelector((state) => state.question.attempts);
  const [inputs, setInputs] = useState({});
  useEffect(() => {
    setInputs({});
  }, [page]);

  const handleStoreData = async (question) => {
    const questionId = question?.id;

    const payload = {
      question_id: questionId,
      type: type,
      user_answer: JSON.stringify(inputs),
    };

    dispatch(setAttemptQuestions(payload));
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));

    if (questions?.pagination?.total === page) {
      const updatedAnswers = [...answersStore, payload];
      const finalPayload = {
        answers: updatedAnswers.map((item) => ({
          question_id: item.question_id,
          answer: item.user_answer,
          type: item?.type,
        })),
      };

      try {
        await userService.answer(finalPayload);
        toast.success("Answer submitted successfully.");
      } catch (error) {
        console.error("Error", error);
        toast.error("Submission failed.");
      }
    }
  };

  return (
    <>
      {questions.questions_array.map((qObj, index) => {
        const questionData = qObj.question;
        const paragraph = questionData.paragraph;
        const boxes = questionData.questions;
        const questionId = qObj.id;
        const isSubmitted = submitted[questionId] === true;
        const isAnyInputFilled = Object.values(inputs).some(
          (val) => val.trim() !== ""
        );

        const handleInputChange = (e, boxNumber) => {
          const value = e.target.value;
          setInputs((prev) => ({ ...prev, [boxNumber]: value }));
        };

        const renderedParagraph = (
          typeof paragraph === "string" ? paragraph : ""
        )
          .split(/(\(\d+\))/g)
          .map((part, i) => {
            const match = part.match(/\((\d+)\)/);
            if (match) {
              const boxNumber = parseInt(match[1]);
              const inputVal = inputs[boxNumber] || "";

              return (
                <>
                  <input
                    key={i}
                    type="text"
                    value={inputVal}
                    disabled={isSubmitted}
                    placeholder={`Word ${boxNumber}`}
                    onChange={(e) => handleInputChange(e, boxNumber)}
                    style={{
                      display: "inline-block",
                      verticalAlign: "middle",
                      width: "110px",
                      margin: "0 4px",
                      padding: "5px 8px",
                      fontSize: "15px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                      outlineColor: "#2563eb",
                    }}
                  />

                  <br></br>
                </>
              );
            } else {
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {parse(part)}
                </span>
              );
            }
          });

        return (
          <div key={index} className="question-card">
            <div
              style={{
                borderRadius: "8px",
                backgroundColor: "#f8fafc",
                marginBottom: "0px",
              }}
            >
              <h5 style={{ marginBottom: "12px", fontWeight: "600" }}>
                {page}. {questionData.instruction}
              </h5>

              <div
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  backgroundColor: "#fff",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  display: "block",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {renderedParagraph}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleStoreData(qObj)}
                disabled={isSubmitted || !isAnyInputFilled}
                className={`btn btn-primary mt-3 ${
                  isSubmitted || !isAnyInputFilled
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
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
export default EditingQuesions;
