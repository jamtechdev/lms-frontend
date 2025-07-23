import { useEffect, useState } from "react";
import parse from "html-react-parser";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelected,
  setAttemptQuestions,
} from "../../_store/_reducers/question";
import Feedback from "../Feedback";

const Comprehension = ({ question, index }) => {
  const dispatch = useDispatch();
  const answersStore = useSelector(getSelected);
  const [inputs, setInputs] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);

  const questionData = question?.question || {};
  const passage = questionData?.passage || "";
  const subquestions = questionData?.subquestions || [];
  const questionId = question?.id;
  const questionType = questionData?.type;

  useEffect(() => {
    setInputs([]);
    setAnswers([]);

    const saved = answersStore.find((ans) => ans.question_id === questionId);
    if (saved?.answer || saved?.user_answer) {
      try {
        const parsed = JSON.parse(saved.answer || saved.user_answer);
        setInputs(parsed);
        setAnswers([
          {
            question_id: questionId,
            user_answer: JSON.stringify(parsed),
            type: questionType,
          },
        ]);
        setIsSubmitted(true);
      } catch (err) {
        console.warn("Invalid answer format:", err);
      }
    }
  }, [questionId, answersStore]);

  const handleChange = (subQues, value, type) => {
    setInputs((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((item) => item.subQues === subQues);
      if (index !== -1) {
        updated[index] = { subQues, user_answer: value, type };
      } else {
        updated.push({ subQues, user_answer: value, type });
      }
      return updated;
    });

    const newAttempt = {
      question_id: questionId,
      type: questionType,
      user_answer: JSON.stringify([
        ...inputs.filter((i) => i.subQues !== subQues),
        { subQues, user_answer: value, type },
      ]),
    };

    const updatedAnswers = [
      ...answers.filter((a) => a.question_id !== questionId),
      newAttempt,
    ];
    setAnswers(updatedAnswers);
  };

  const handlePaperSubmit = async () => {
    const payload = {
      answers: answers?.map((item) => ({
        question_id: item.question_id,
        answer: item.user_answer,
        type: item?.type,
      })),
    };

    try {
      await userService.answer(payload);
      toast.success("Answer submitted successfully.");
      setIsSubmitted(true);
      dispatch(setAttemptQuestions(payload?.answers[0]));
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to submit answers.");
    }
  };

  const getPrefilled = (subq) => {
    const stored = answers.find((item) => item.question_id === questionId);
    if (stored) {
      try {
        const parsed = JSON.parse(stored.user_answer || "[]");
        return parsed.find((i) => i.subQues === subq.question);
      } catch {
        return null;
      }
    }
    return null;
  };

  return (
    <>
      <div className="question-header">
        <h2>Question {index + 1}</h2>
        <Feedback question_id={question?.id} />
      </div>
      <div className="question-card">
        <p className="instruction-text">
          <strong>Instruction:</strong> {question.question.instruction}
        </p>
        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            background: "#f1f5f9",
            borderLeft: "5px solid #2563eb",
          }}
        >
          <h4>Passage:</h4>
          <div>{parse(passage)}</div>
        </div>

        {subquestions.map((subq, subIndex) => {
          const prefilled = getPrefilled(subq);
          const parsedQuestion =
            typeof subq?.question === "string" ? parse(subq.question) : "";
          const inputName = `input-${questionId}-${subIndex}`;
          const correctAnswer = subq?.answer;

          if (subq.type === "mcq" || subq.type === "true_false") {
            const options =
              subq.type === "mcq" ? subq.options : ["True", "False"];
            return (
              <div key={subIndex} className="mb-3">
                <div className="question-text">
                  {subIndex + 1}. {parsedQuestion}
                </div>
                {options.map((opt, i) => {
                  const isUserSelected = prefilled?.user_answer === opt;
                  const isCorrect = correctAnswer === opt;
                  return (
                    <div key={i}>
                      <label
                        className={`kbc-option-label ${
                          isSubmitted
                            ? isCorrect
                              ? "text-green-600 font-bold"
                              : isUserSelected
                              ? "text-red-600 line-through"
                              : ""
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={inputName}
                          disabled={isSubmitted}
                          value={opt}
                          checked={isUserSelected}
                          onChange={(e) =>
                            handleChange(
                              subq.question,
                              e.target.value,
                              subq.type
                            )
                          }
                        />
                        {opt}
                        {isSubmitted && isCorrect && " (Correct Answer)"}
                        {isSubmitted &&
                          isUserSelected &&
                          !isCorrect &&
                          " (Your Answer)"}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          }

          if (subq.type === "fill_blank") {
            return (
              <div key={subIndex} className="mb-3">
                <div className="question-text">
                  {subIndex + 1}. {parsedQuestion}
                </div>
                <input
                  type="text"
                  className="comprehension_input"
                  disabled={isSubmitted}
                  value={prefilled?.user_answer || ""}
                  onChange={(e) =>
                    handleChange(subq.question, e.target.value, subq.type)
                  }
                />
                {isSubmitted && (
                  <div className="mt-1 text-green-700">
                    Correct Answer: <strong>{correctAnswer}</strong>
                  </div>
                )}
              </div>
            );
          }

          if (subq.type === "open_ended") {
            return (
              <div key={subIndex} className="comprehension-subq mb-4">
                <div className="question-text">
                  {subIndex + 1}. {parsedQuestion}
                </div>
                <textarea
                  rows={3}
                  style={{
                    width: "100%",
                    borderColor: "#ccc",
                    padding: "8px",
                    borderRadius: "4px",
                  }}
                  disabled={isSubmitted}
                  value={prefilled?.user_answer || ""}
                  onChange={(e) =>
                    handleChange(subq.question, e.target.value, subq.type)
                  }
                  placeholder="Type your answer here..."
                />
                {isSubmitted && (
                  <div className="mt-1 text-green-700">
                    Correct Answer: <strong>{correctAnswer}</strong>
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}

        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={handlePaperSubmit}
            className="dashboard-button"
            disabled={isSubmitted || subquestions.length === 0}
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Comprehension;
