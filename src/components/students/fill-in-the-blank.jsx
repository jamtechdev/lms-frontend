import { useEffect, useState } from "react";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import { userService } from "../../_services";
import {
  getSelected,
  setAttemptQuestions,
} from "../../_store/_reducers/question";
import { useDispatch, useSelector } from "react-redux";
import Feedback from "../Feedback";
import { getChildId } from "../../_store/_reducers/auth";
import ChatgptIcon from "../ChatgptIcon";

const FillInTheBlank = ({ question, index }) => {
  const dispatch = useDispatch();
  const answersStore = useSelector(getSelected);
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({});
  const [answers, setAnswers] = useState([]);
  const [correctMap, setCorrectMap] = useState({});
  const childId = useSelector(getChildId);

  const questionId = question?.id;
  const questionData = question?.question || {};
  const instruction = questionData?.instruction;
  const questionText = questionData?.question_text;
  const blanks = questionData?.blanks || [];
  const type = questionData?.type || questionData?.question_type;

  const isAllFilled = () => {
    return blanks.every((b) => inputs[b.blank_number]?.trim());
  };

  const getCorrectAnswerMap = (blanks = []) =>
    blanks.reduce((acc, b) => {
      acc[b.blank_number] = b.correct_answer;
      return acc;
    }, {});

  useEffect(() => {
    setInputs({});
    setAnswers([]);
    const corrects = getCorrectAnswerMap(blanks);
    setCorrectMap(corrects);

    const saved = answersStore.find((ans) => ans.question_id === questionId);
    if (saved?.answer || saved?.user_answer) {
      try {
        const parsed = JSON.parse(saved.answer || saved.user_answer);
        setInputs(parsed);
        setSubmitted(true);
        setAnswers([
          {
            question_id: questionId,
            user_answer: JSON.stringify(parsed),
            type: type,
          },
        ]);
      } catch (err) {
        console.warn("Invalid answer format in Redux store:", err);
      }
    }
  }, [questionId, blanks, answersStore]);

  const handleChange = (index, value) => {
    setInputs((prev) => ({ ...prev, [index]: value }));
  };

  const handleStoreData = async () => {
    if (!isAllFilled()) {
      toast.error("Please fill all blanks before submitting.");
      return;
    }

    const payload = {
      question_id: questionId,
      type: type,
      user_answer: JSON.stringify(inputs),
      answer: JSON.stringify(correctMap),
    };

    const updatedAnswers = [
      ...answers.filter((a) => a.question_id !== questionId),
      payload,
    ];
    setAnswers(updatedAnswers);
    setSubmitted(true);

    try {
      const finalPayload = {
        answers: updatedAnswers.map((item) => ({
          question_id: item.question_id,
          answer: item.user_answer,
          type: item?.type,
          child_id: childId,
        })),
      };

      const response = await userService.answer(finalPayload);
      toast.success("Answer submitted successfully.");
      toast.success(response?.message);
      dispatch(setAttemptQuestions(finalPayload?.answers[0]));
    } catch (error) {
      console.error("Error", error);
      toast.error("Something went wrong while submitting.");
    }
  };

  const renderParsedQuestion = (text = "") => {
    const htmlWithInputs = text.replace(/\(\d+\)_____/g, (match) => {
      const number = match.match(/\d+/)[0];
      return `<input data-index="${number}" />`;
    });

    return parse(htmlWithInputs, {
      replace: (domNode) => {
        if (domNode.name === "input" && domNode.attribs?.["data-index"]) {
          const index = domNode.attribs["data-index"];
          const userVal = inputs[index] || "";
          const correctVal = correctMap[index] || "";
          const isCorrect =
            submitted &&
            userVal.trim().toLowerCase() === correctVal.trim().toLowerCase();
          const isIncorrect = submitted && !isCorrect;

          return (
            <span
              key={`blank-${index}`}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 4px",
                verticalAlign: "middle",
              }}
            >
              <input
                type="text"
                placeholder={`(${index})`}
                value={userVal}
                onChange={(e) => handleChange(index, e.target.value)}
                disabled={submitted}
                style={{
                  padding: "4px 6px",
                  fontSize: "15px",
                  width: "100px",
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: submitted
                    ? isCorrect
                      ? "#22c55e"
                      : "#dc2626"
                    : "#ccc",
                  backgroundColor:
                    submitted && isIncorrect ? "#fef2f2" : "#fff",
                  borderRadius: "6px",
                }}
              />
              {submitted && isIncorrect && (
                <span
                  style={{
                    marginTop: "2px",
                    fontSize: "11px",
                    color: "#dc2626",
                    whiteSpace: "nowrap",
                  }}
                >
                  ✓ {correctVal}
                </span>
              )}
            </span>
          );
        }
      },
    });
  };

  return (
    <>
      <div className="question-header">
        <h2>Question {index + 1}</h2>
        <p className="instruction-text">
          <strong>Instruction:</strong> {parse(instruction || "")}
        </p>
        <Feedback question_id={question?.id} />
        {submitted && <ChatgptIcon question_id={question?.id} />}
      </div>
      <div className="question-card">
        <div>{renderParsedQuestion(questionText)}</div>
        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={handleStoreData}
            className="dashboard-button"
            disabled={!isAllFilled() || submitted}
          >
            {submitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default FillInTheBlank;
