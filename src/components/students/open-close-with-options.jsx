import { useEffect, useState } from "react";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelected,
  setAttemptQuestions,
} from "../../_store/_reducers/question";
import Feedback from "../Feedback";
import { getChildId } from "../../_store/_reducers/auth";

const OpenClozeWithOptions = ({ question, index }) => {
  const dispatch = useDispatch();
  const answersStore = useSelector(getSelected);
  const [inputs, setInputs] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [userAnswerJSON, setUserAnswerJSON] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [storedAnswer, setStoredAnswer] = useState([]);
  const childId = useSelector(getChildId);
  const questionData = question.question;
  const questionId = question.id;
  const type = questionData.question_type;
  const paragraph = questionData.paragraph;
  const blanks = questionData.questions;
  const options =
    questionData?.question_group?.shared_options?.map((opt) =>
      opt.toLowerCase()
    ) || [];

  const handleChange = (e, blank_number, inputId) => {
    const value = e.target.value.trim();

    setInputs((prev) => ({
      ...prev,
      [inputId]: value,
    }));

    const isValid = value === "" || options.includes(value.toLowerCase());

    setInputErrors((prev) => ({
      ...prev,
      [inputId]: !isValid,
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

        return {
          ...prev,
          [questionId]: updated,
        };
      });
    }
  };

  const handlePaperSubmit = async (questionId) => {
    const userAnswer = userAnswerJSON[questionId] || [];

    if (userAnswer.length !== blanks.length) {
      toast.error("Please fill all blanks correctly.");
      return;
    }

    const payload = {
      answers: [
        {
          question_id: questionId,
          answer: JSON.stringify(userAnswer),
          type: type,
          child_id: childId,
        },
      ],
    };

    try {
      const response = await userService.answer(payload);
      toast.success(response?.message);
      setSubmittedQuestions((prev) => ({
        ...prev,
        [questionId]: true,
      }));
      dispatch(
        setAttemptQuestions({
          question_id: questionId,
          answer: JSON.stringify(userAnswer),
          type: type,
        })
      );
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Submission failed.");
    }
  };
  useEffect(() => {
    setInputs({});
    setInputErrors({});
    setUserAnswerJSON({});
    setSubmittedQuestions({});
    setStoredAnswer([]);

    const submitted = answersStore.find(
      (ans) => ans.question_id === questionId
    );

    if (submitted?.answer) {
      try {
        const parsedAnswer = JSON.parse(
          submitted.answer || submitted.user_answer
        );
        const filledInputs = {};
        parsedAnswer.forEach(({ blank_number, value }) => {
          const inputId = blanks.find(
            (q) => q.blank_number === blank_number
          )?.id;
          if (inputId) filledInputs[inputId] = value;
        });
        setInputs(filledInputs);
        setStoredAnswer(parsedAnswer);
        setSubmittedQuestions((prev) => ({
          ...prev,
          [questionId]: true,
        }));
      } catch (e) {
        console.warn("Invalid answer format", e);
      }
    }
  }, [questionId, answersStore, blanks]);

  const renderedParagraph = paragraph
    ?.split(/(\(\d+\)_____)/g)
    ?.map((part, i) => {
      const match = part.match(/\((\d+)\)_____/);
      if (match) {
        const blankNumber = parseInt(match[1]);
        const blank = blanks.find((q) => q.blank_number === blankNumber);

        const inputValue =
          inputs[blank.id] ||
          storedAnswer.find((item) => item.blank_number === blankNumber)
            ?.value ||
          "";

        const hasError = inputErrors[blank.id];

        return (
          <span key={i}>
            <span style={{ fontWeight: "bold", marginLeft: "7px" }}>
              ({blankNumber})
            </span>
            <input
              type="text"
              placeholder="_____"
              value={inputValue}
              onChange={(e) => handleChange(e, blankNumber, blank.id)}
              style={{
                width: "60px",
                margin: "0 5px",
                border: "none",
                background: "transparent",
                borderBottom: hasError ? "2px solid red" : "1px solid #000",
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
    <>
      <div className="question-header">
        <h2>Question {index + 1}</h2>
        <p className="instruction-text">
          <strong>Instruction:</strong> {questionData.instruction}
        </p>
        <Feedback question_id={question?.id} />
      </div>
      <div className="question-card">
        <div>
          {options.length > 0 && (
            <div className="option-tag">
              <strong>Options:</strong>
              {options.map((option, index) => (
                <div key={index}>{option}</div>
              ))}
            </div>
          )}
        </div>
        <div className="px-0 py-3 options">{renderedParagraph}</div>
        {submittedQuestions[questionId] && (
          <div className="mt-4 p-3 border rounded bg-green-100 text-green-800 font-semibold whitespace-pre-line">
            Correct Answers:
            <div className="mt-2">
              {blanks.map((blank, idx) => (
                <div key={blank.id}>
                  {idx + 1}. ({blank.blank_number}) → {blank.correct_answer}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={() => handlePaperSubmit(questionId)}
            className="dashboard-button"
            disabled={submittedQuestions[questionId]}
          >
            {submittedQuestions[questionId] ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default OpenClozeWithOptions;
