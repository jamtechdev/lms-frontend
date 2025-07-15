import { useEffect, useState } from "react";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import { userService } from "../../_services";

const FillInTheBlank = ({ question, index }) => {
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({});
  const [answersStore, setAnswersStore] = useState([]);

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
    const prev = answersStore.find((a) => a.question_id === questionId);
    if (prev) {
      setInputs(JSON.parse(prev.user_answer));
      setSubmitted(true);
    } else {
      setInputs({});
      setSubmitted(false);
    }
  }, [questionId, answersStore]);

  const handleStoreData = async () => {
    if (!isAllFilled()) {
      toast.error("Please fill all blanks before submitting.");
      return;
    }

    const payload = {
      question_id: questionId,
      type: type,
      user_answer: JSON.stringify(inputs),
      answer: JSON.stringify(getCorrectAnswerMap(blanks)),
    };

    const updatedAnswers = [
      ...answersStore.filter((a) => a.question_id !== questionId),
      payload,
    ];
    setAnswersStore(updatedAnswers);
    setSubmitted(true);

    try {
      const finalPayload = {
        answers: updatedAnswers.map((item) => ({
          question_id: item.question_id,
          answer: item.user_answer,
          type: item?.type,
        })),
      };

      await userService.answer(finalPayload);
      toast.success("Answer submitted successfully.");
    } catch (error) {
      console.error("Error", error);
      toast.error("Something went wrong while submitting.");
    }
  };

  const handleChange = (index, value) => {
    setInputs((prev) => ({ ...prev, [index]: value }));
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
          return (
            <input
              key={index}
              type="text"
              placeholder={`(${index})`}
              value={inputs[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              disabled={submitted}
              style={{
                margin: "0 4px",
                padding: "4px",
                width: "100px",
                border: "none",
                borderBottom: "1px solid #ccc",
              }}
            />
          );
        }
      },
    });
  };

  return (
    <>
    <h2 className="mb-3">Question {index + 1}</h2>
      <strong>Instruction:</strong> {parse(instruction || "")}
    <div className="question-card">
      <div>{renderParsedQuestion(questionText)}</div>

      <div className="flex justify-end">
        <button
          onClick={handleStoreData}
          className="btn btn-primary mt-3"
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
