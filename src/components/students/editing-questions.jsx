import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditingQuesions = (props) => {
  const { questions, page, setPage, type } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answersStore = useSelector((state) => state.question.attempts);
  const [inputs, setInputs] = useState({});
  useEffect(() => {
    setInputs({});
  }, [page]);

  const handleStoreData = async (question) => {
    console.log(question);
    let payload = {
      question_id: question?.id,
      type: type,
      user_answer: JSON.stringify(inputs),
    };
    dispatch(setAttemptQuestions(payload));
    if (questions?.pagination?.total === page) {
      const updatedAnswers = [...answersStore, payload];
      let finalPayload = {
        answers: updatedAnswers?.map((item) => ({
          question_id: item.question_id,
          answer: item.user_answer,
          type: item?.type,
        })),
      };
      await userService
        .answer(finalPayload)
        .then((data) => {
          console.log(data);
          toast.success("Answer submitted successfully.");
          navigate("/student");
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };

  return (
    <>
      {questions.questions_array.map((qObj, index) => {
        const questionData = qObj.question;
        const paragraph = questionData.paragraph;
        const boxes = questionData.questions;

        const handleInputChange = (e, boxNumber) => {
          const value = e.target.value;
          setInputs((prev) => ({ ...prev, [boxNumber]: value }));
          // console.log({
          //     question_id: qObj.id,
          //     user_answer: value,
          //     type: "editing",
          // })
          // dispatch(
          //     setAttemptQuestions({
          //         question_id: `${qObj.id}-${boxNumber}`,
          //         user_answer: value,
          //         type: "editing",
          //     })
          // );
        };

        const renderedParagraph = paragraph
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
                    // critical to prevent wrapping
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
            <div className="flex justify-between">
              <button
                className="btn btn-primary mt-3 mr-2"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={questions?.pagination?.current_page === 1}
              >
                Previous
              </button>
              {questions?.pagination?.total === page ? (
                <button
                  onClick={() => handleStoreData(qObj)}
                  className="btn btn-primary mt-3 ml-2"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => {
                    setPage((prev) => prev + 1);
                    handleStoreData(qObj);
                  }}
                  className="btn btn-primary mt-3"
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
export default EditingQuesions;
