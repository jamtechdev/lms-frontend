import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userService } from "../../_services";

const FillInTheBlank = (props) => {
  const { questions, type, page, setPage } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const currentQuestionId = questions?.questions_array?.[0]?.id;
    const prev = answersStore.find((a) => a.question_id === currentQuestionId);
    if (prev) {
      setInputs(JSON.parse(prev.user_answer));
    } else {
      setInputs({});
    }
  }, [page, questions, answersStore]);

  const getCorrectAnswerMap = (blanks = []) =>
    blanks.reduce((acc, b) => {
      acc[b.blank_number] = b.correct_answer;
      return acc;
    }, {});

  const handleStoreData = async (question, currentInputs = inputs) => {
    const payload = {
      question_id: question?.id,
      type: type,
      user_answer: JSON.stringify(currentInputs),
      answer: JSON.stringify(getCorrectAnswerMap(question?.question?.blanks)),
    };

    dispatch(setAttemptQuestions(payload));

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

      await userService
        .answer(finalpayload)
        .then((data) => {
          console.log(data);
          toast.success("Answer submitted successfully.");
          navigate("/student/question-type");
        })
        .catch((error) => {
          console.error("Error", error);
          toast.error("Something went wrong while submitting.");
        });
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
                  handleStoreData(qObj);
                  setPage((prev) => prev + 1);
                }}
                className="btn btn-primary mt-3"
              >
                Next
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default FillInTheBlank;
