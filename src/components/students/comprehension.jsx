import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import parse from "html-react-parser";



const Comprehension = (props) => {
    const { questions, type: globalType, page, setPage } = props;
    const dispatch = useDispatch();
    const answersStore = useSelector((state) => state.question.attempts);
    const [inputs, setInputs] = useState([]);
    useEffect(() => { setInputs([]) }, [page]);
    const handlePaperSubmit = () => {
        let payload = answersStore;
        console.log(payload, 'Final Submit')
    }

    return (
        <>
            {questions.questions_array.map((qObj, index) => {
                const questionData = qObj.question;
                const passage = questionData.passage;
                const subquestions = questionData.subquestions;
                const handleChange = (subQues, value, type) => {
                    setInputs((prevInputs) => {
                        // Check if the subQues already exists
                        const index = prevInputs.findIndex((input) => input.subQues === subQues);
                        // If subQues exists, update its userAnswer
                        if (index !== -1) {
                            const updatedInputs = [...prevInputs];
                            updatedInputs[index] = { ...updatedInputs[index], user_answer: value, type: type };
                            return updatedInputs;
                        }
                        const newInputs = [...prevInputs, { subQues, user_answer: value, type: type }];
                        return newInputs;
                    });
                    // Work with a local array that mimics the state
                    let updatedInputs = [...inputs];
                    const index = updatedInputs.findIndex((input) => input.subQues === subQues);
                    if (index !== -1) {
                        updatedInputs[index] = { ...updatedInputs[index], user_answer: value, type: type };
                    } else {
                        updatedInputs.push({ subQues, user_answer: value, type: type });
                    }
                    const payload = {
                        question_id: qObj?.id,
                        type: globalType,
                        user_answer: JSON.stringify(updatedInputs),
                    };
                    dispatch(setAttemptQuestions(payload));
                }

                return (
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
                            <div>{parse(passage)}</div>
                        </div>

                        {subquestions.map((subq, subIndex) => {
                            const questionId = `${qObj.id}-${subIndex}`;
                            const selectedAnswer = answersStore?.find(
                                (ans) => ans.question_id === questionId
                            );
                            // const prefilled = JSON.parse(answersStore.find(item => item.question_id === qObj?.id)?.user_answer || "[]")?.find(ans => ans?.subQues === subq?.question);

                            if (subq?.type == "mcq") {
                                let prefilled;
                                const getSelected = answersStore.find(item => item.question_id == qObj?.id);
                                if (getSelected) {
                                    prefilled = JSON.parse(getSelected?.user_answer);
                                    prefilled = prefilled?.find(item => item?.subQues == subq?.question);
                                }
                                return (
                                    <div key={subIndex}>
                                        <div className="question-text mt-2">{subIndex + 1}. {parse(subq?.question)}</div>
                                        {subq?.options?.map((opt, i) => (
                                            <div key={i}>
                                                <label
                                                    className={`kbc-option-label`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`mcq-question`}
                                                        value={opt}
                                                        checked={prefilled?.user_answer == opt}
                                                        onChange={(e) => handleChange(subq.question, e?.target?.value, subq?.type)}
                                                    />
                                                    {opt}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                            if (subq?.type == "true_false") {
                                let prefilled;
                                const getSelected = answersStore.find(item => item.question_id == qObj?.id);
                                if (getSelected) {
                                    prefilled = JSON.parse(getSelected?.user_answer);
                                    prefilled = prefilled?.find(item => item?.subQues == subq?.question);
                                }
                                return (
                                    <div key={subIndex}>
                                        <div className="question-text mt-2">{subIndex + 1}. {parse(subq?.question)}</div>
                                        <div>
                                            <label
                                                className="kbc-option-label"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question`}
                                                    value="True"
                                                    checked={prefilled?.user_answer == "True"}
                                                    onChange={(e) => handleChange(subq.question, e?.target?.value, subq?.type)}
                                                />
                                                True
                                            </label>
                                            <label
                                                className="kbc-option-label"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question`}
                                                    value="False"
                                                    checked={prefilled?.user_answer == "False"}
                                                    onChange={(e) => handleChange(subq.question, e?.target?.value, subq?.type)}
                                                />
                                                False
                                            </label>
                                        </div>
                                    </div>
                                )
                            }
                            if (subq?.type == "fill_blank") {
                                let prefilled;
                                const getSelected = answersStore.find(item => item.question_id == qObj?.id);
                                if (getSelected) {
                                    prefilled = JSON.parse(getSelected?.user_answer);
                                    prefilled = prefilled?.find(item => item?.subQues == subq?.question);
                                }
                                return (
                                    <div key={subIndex}>
                                        <div className="question-text mt-2">{subIndex + 1}. {parse(subq?.question)}</div>
                                        <input
                                            type="text"
                                            name="fill_blank"
                                            // value={prefilled?.user_answer}
                                            onChange={(e) => handleChange(subq.question, e?.target?.value, subq?.type)}
                                            className="comprehension_input"
                                        />
                                    </div>
                                )
                            }
                            if (subq?.type == "open_ended") {
                                let prefilled;
                                const getSelected = answersStore.find(item => item.question_id == qObj?.id);
                                if (getSelected) {
                                    prefilled = JSON.parse(getSelected?.user_answer);
                                    prefilled = prefilled?.find(item => item?.subQues == subq?.question);
                                }
                                return (
                                    <div key={subIndex} className="comprehension-subq">
                                        <div className="question-text mt-2">{subIndex + 1}. {parse(subq?.question)}</div>
                                        <textarea
                                            rows={3}
                                            style={{
                                                width: "100%",
                                                borderColor: "#ccc",
                                                padding: "8px",
                                                borderRadius: "4px",
                                            }}
                                            value={prefilled?.user_answer}
                                            onChange={(e) => handleChange(subq.question, e?.target?.value, subq?.type)}
                                            placeholder="Type your answer here..."
                                        />
                                    </div>
                                )
                            }

                        })}

                    </div>
                );
            })
            }
            <div className="flex justify-between">
                <button
                    className="btn btn-primary mt-3 mr-2"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={questions?.pagination?.current_page === 1}
                >
                    Previous
                </button>
                {questions?.pagination?.total === page ? (
                    <button onClick={() => handlePaperSubmit()} className="btn btn-primary mt-3 ml-2">Submit</button>
                ) : (
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="btn btn-primary mt-3"
                    >
                        Next
                    </button>
                )}
            </div>
        </>
    )
}
export default Comprehension;