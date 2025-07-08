import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import parse from "html-react-parser";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const Comprehension = (props) => {
  const { questions, type: globalType, page, setPage } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const answersStore = useSelector((state) => state.question.attempts);
  const [inputs, setInputs] = useState([]);
  useEffect(() => {
    setInputs([]);
  }, [page]);

  const handlePaperSubmit = async () => {
    let payload = {
      answers: answersStore?.map((item) => ({
        question_id: item.question_id,
        answer: item.user_answer,
        type: item?.type,
      })),
    };

    try {
      await userService.answer(payload);
      toast.success("Answer submitted successfully.");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      {questions.questions_array.map((qObj, index) => {
        const questionData = qObj.question;
        const passage = questionData.passage;
        const subquestions = questionData.subquestions;
        const handleChange = (subQues, value, type) => {
          setInputs((prevInputs) => {
            const index = prevInputs.findIndex(
              (input) => input.subQues === subQues
            );
            if (index !== -1) {
              const updatedInputs = [...prevInputs];
              updatedInputs[index] = {
                ...updatedInputs[index],
                user_answer: value,
                type: type,
              };
              return updatedInputs;
            }
            const newInputs = [
              ...prevInputs,
              { subQues, user_answer: value, type: type },
            ];
            return newInputs;
          });
          let updatedInputs = [...inputs];
          const index = updatedInputs.findIndex(
            (input) => input.subQues === subQues
          );
          if (index !== -1) {
            updatedInputs[index] = {
              ...updatedInputs[index],
              user_answer: value,
              type: type,
            };
          } else {
            updatedInputs.push({ subQues, user_answer: value, type: type });
          }
          const payload = {
            question_id: qObj?.id,
            type: globalType,
            user_answer: JSON.stringify(updatedInputs),
          };
          dispatch(setAttemptQuestions(payload));
        };

        return (
          <>
            <div key={index} className="question-card max75">
              <div
                style={{
                  padding: "15px",
                  marginBottom: "20px",
                  background: "#f1f5f9",
                  borderLeft: "5px solid #2563eb",
                }}
              >
                <h4>Passage:</h4>
                <div>{typeof passage === "string" ? parse(passage) : ""}</div>
              </div>

              {Array.isArray(subquestions) &&
                subquestions.map((subq, subIndex) => {
                  const questionId = `${qObj.id}-${subIndex}`;
                  const selectedAnswer = answersStore?.find(
                    (ans) => ans.question_id === questionId
                  );
                  if (subq?.type == "mcq") {
                    let prefilled;
                    const getSelected = answersStore.find(
                      (item) => item.question_id == qObj?.id
                    );
                    if (getSelected) {
                      prefilled = JSON.parse(getSelected?.user_answer);
                      prefilled = prefilled?.find(
                        (item) => item?.subQues == subq?.question
                      );
                    }
                    return (
                      <div key={subIndex}>
                        <div className="question-text mt-2">
                          {subIndex + 1}.{" "}
                          {typeof subq?.question === "string"
                            ? parse(subq.question)
                            : ""}
                        </div>
                        {subq?.options?.map((opt, i) => (
                          <div key={i}>
                            <label className={`kbc-option-label`}>
                              <input
                                type="radio"
                                name={`mcq-question`}
                                disabled={isSubmitted}
                                value={opt}
                                checked={prefilled?.user_answer == opt}
                                onChange={(e) =>
                                  handleChange(
                                    subq.question,
                                    e?.target?.value,
                                    subq?.type
                                  )
                                }
                              />
                              {opt}
                            </label>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (subq?.type == "true_false") {
                    let prefilled;
                    const getSelected = answersStore.find(
                      (item) => item.question_id == qObj?.id
                    );
                    if (getSelected) {
                      prefilled = JSON.parse(getSelected?.user_answer);
                      prefilled = prefilled?.find(
                        (item) => item?.subQues == subq?.question
                      );
                    }
                    return (
                      <div key={subIndex}>
                        <div className="question-text mt-2">
                          {subIndex + 1}.{" "}
                          {typeof subq?.question === "string"
                            ? parse(subq.question)
                            : ""}
                        </div>
                        <div>
                          <label className="kbc-option-label">
                            <input
                              type="radio"
                              name={`question`}
                              disabled={isSubmitted}
                              value="True"
                              checked={prefilled?.user_answer == "True"}
                              onChange={(e) =>
                                handleChange(
                                  subq.question,
                                  e?.target?.value,
                                  subq?.type
                                )
                              }
                            />
                            True
                          </label>
                          <label className="kbc-option-label">
                            <input
                              type="radio"
                              name={`question`}
                              disabled={isSubmitted}
                              value="False"
                              checked={prefilled?.user_answer == "False"}
                              onChange={(e) =>
                                handleChange(
                                  subq.question,
                                  e?.target?.value,
                                  subq?.type
                                )
                              }
                            />
                            False
                          </label>
                        </div>
                      </div>
                    );
                  }
                  if (subq?.type == "fill_blank") {
                    let prefilled;
                    const getSelected = answersStore.find(
                      (item) => item.question_id == qObj?.id
                    );
                    if (getSelected) {
                      prefilled = JSON.parse(getSelected?.user_answer);
                      prefilled = prefilled?.find(
                        (item) => item?.subQues == subq?.question
                      );
                    }
                    return (
                      <div key={subIndex}>
                        <div className="question-text mt-2">
                          {subIndex + 1}.{" "}
                          {typeof subq?.question === "string"
                            ? parse(subq.question)
                            : ""}
                        </div>
                        <input
                          type="text"
                          name="fill_blank"
                          disabled={isSubmitted}
                          onChange={(e) =>
                            handleChange(
                              subq.question,
                              e?.target?.value,
                              subq?.type
                            )
                          }
                          className="comprehension_input"
                        />
                      </div>
                    );
                  }
                  if (subq?.type == "open_ended") {
                    let prefilled;
                    const getSelected = answersStore.find(
                      (item) => item.question_id == qObj?.id
                    );
                    if (getSelected) {
                      prefilled = JSON.parse(getSelected?.user_answer);
                      prefilled = prefilled?.find(
                        (item) => item?.subQues == subq?.question
                      );
                    }
                    return (
                      <div key={subIndex} className="comprehension-subq">
                        <div className="question-text mt-2">
                          {subIndex + 1}.{" "}
                          {typeof subq?.question === "string"
                            ? parse(subq.question)
                            : ""}
                        </div>
                        <textarea
                          rows={3}
                          disabled={isSubmitted}
                          style={{
                            width: "100%",
                            borderColor: "#ccc",
                            padding: "8px",
                            borderRadius: "4px",
                          }}
                          value={prefilled?.user_answer}
                          onChange={(e) =>
                            handleChange(
                              subq.question,
                              e?.target?.value,
                              subq?.type
                            )
                          }
                          placeholder="Type your answer here..."
                        />
                      </div>
                    );
                  }
                })}
              <button
                onClick={handlePaperSubmit}
                className="btn btn-primary mt-3"
                disabled={answersStore.length === 0 || isSubmitted}
              >
                {isSubmitted ? "Submitted" : "Submit"}
              </button>
            </div>
          </>
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
export default Comprehension;
