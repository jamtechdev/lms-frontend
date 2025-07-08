import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userService } from "../../_services";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const FillInTheBlank = (props) => {
  const { questions, type, page, setPage } = props;
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);
  const [inputs, setInputs] = useState({});
  const isAllFilled = () => {
    const blanks = questions?.questions_array?.[0]?.question?.blanks ?? [];
    return blanks.every((b) => inputs[b.blank_number]?.trim());
  };

  useEffect(() => {
    const currentQuestionId = questions?.questions_array?.[0]?.id;
    const prev = answersStore.find((a) => a.question_id === currentQuestionId);
    if (prev) {
      setInputs(JSON.parse(prev.user_answer));
      setSubmitted(true);
    } else {
      setInputs({});
      setSubmitted(false);
    }
  }, [page, questions, answersStore]);

  const getCorrectAnswerMap = (blanks = []) =>
    blanks.reduce((acc, b) => {
      acc[b.blank_number] = b.correct_answer;
      return acc;
    }, {});

  const handleStoreData = async (question, currentInputs = inputs) => {
    if (!isAllFilled()) {
      toast.error("Please fill all blanks before submitting.");
      return;
    }

    const payload = {
      question_id: question?.id,
      type: type,
      user_answer: JSON.stringify(currentInputs),
      answer: JSON.stringify(getCorrectAnswerMap(question?.question?.blanks)),
    };

    dispatch(setAttemptQuestions(payload));
    setSubmitted(true);

    const updatedAnswers = [
      ...answersStore.filter((a) => a.question_id !== question?.id),
      payload,
    ];

    if (questions?.pagination?.total === page) {
      const finalpayload = {
        answers: updatedAnswers.map((item) => ({
          question_id: item.question_id,
          answer: item.user_answer,
          type: item?.type,
        })),
      };

      try {
        await userService.answer(finalpayload);
        toast.success("Answer submitted successfully.");
      } catch (error) {
        console.error("Error", error);
        toast.error("Something went wrong while submitting.");
      }
    }
  };

  const handleChange = (index, value) => {
    setInputs((prev) => ({ ...prev, [index]: value }));
  };

  const renderParsedQuestion = (questionText) => {
    const htmlWithInputs = questionText.replace(/\(\d+\)_____/g, (match) => {
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
      {questions?.questions_array?.map((qObj, index) => (
        <div key={index}>
          <div className="question-text">
            {page}. {parse(qObj?.question?.instruction)}
          </div>
          <div>{renderParsedQuestion(qObj?.question?.question_text ?? "")}</div>

          <div className="flex justify-end">
            <button
              onClick={() => handleStoreData(qObj)}
              className="btn btn-primary mt-3"
              disabled={!isAllFilled() || submitted}
            >
              {submitted ? "Submitted" : "Submit"}
            </button>
          </div>
        </div>
      ))}
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

export default FillInTheBlank;
