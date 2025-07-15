import parse from "html-react-parser";
import { useEffect, useState } from "react";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";

const EditingQuesions = ({ question, index }) => {
  const [submitted, setSubmitted] = useState(false);
  const [answersStore, setAnswersStore] = useState([]);
  const [inputs, setInputs] = useState({});

  const questionData = question?.question || {};
  const paragraph = questionData?.paragraph || "";
  const boxes = questionData?.questions || [];
  const questionId = question?.id;
  const instruction = questionData?.instruction || "";
  const type = questionData?.type || "";

  useEffect(() => {
    setInputs({});
    setAnswersStore([]);
  }, [questionId]);

  const handleInputChange = (e, boxNumber) => {
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [boxNumber]: value }));
  };

  const isAnyInputFilled = Object.values(inputs).some(
    (val) => val.trim() !== ""
  );

  const handleStoreData = async () => {
    const payload = {
      question_id: questionId,
      type: type,
      user_answer: JSON.stringify(inputs),
    };

    const updatedAnswers = [
      ...answersStore.filter((a) => a.question_id !== questionId),
      payload,
    ];
    setAnswersStore(updatedAnswers);
    setSubmitted(true);

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
  };

  const renderedParagraph = paragraph
    .split(/(\(\d+\))/g)
    .map((part, i) => {
      const match = part.match(/\((\d+)\)/);
      if (match) {
        const boxNumber = parseInt(match[1]);
        const inputVal = inputs[boxNumber] || "";

        return (
          <input
            key={`input-${i}`}
            type="text"
            value={inputVal}
            disabled={submitted}
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
        );
      } else {
        return (
          <span
            key={`text-${i}`}
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
    <>
      <h2 className="mb-3">Question {index + 1}</h2>
      <strong>Instruction:</strong> {instruction}
      <div className="question-card">
        <div
          style={{
            borderRadius: "8px",
            backgroundColor: "#f8fafc",
            marginBottom: "0px",
          }}
        >
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
            onClick={handleStoreData}
            disabled={submitted || !isAnyInputFilled}
            className={`btn btn-primary mt-3 ${submitted || !isAnyInputFilled ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {submitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditingQuesions;
