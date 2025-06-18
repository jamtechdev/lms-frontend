import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import parse from "html-react-parser";



const Comprehension = (props) => {
    const { questions, type, page, setPage } = props;
    const dispatch = useDispatch();
    const answersStore = useSelector((state) => state.question.attempts);
    const [inputs, setInputs] = useState({});
    useEffect(() => { setInputs({}) }, [page]);

    return (
        <>
            {questions.questions_array.map((qObj, index) => {
                const questionData = qObj.question;
                const passage = questionData.passage;
                const subquestions = questionData.subquestions;
                const handleChange = (subQues, value) => {
                    setInputs((prev) => ({ ...prev, [subQues]: value }));
                    const updatedInputs = { ...inputs, [subQues]: value };
                    let payload = {
                        question_id: qObj?.id,
                        type: type,
                        user_answer: JSON.stringify(updatedInputs),
                    }
                    dispatch(setAttemptQuestions(payload));
                }

                return (
                    <div key={index} className="question-card">
                        <div
                            style={{
                                padding: "15px",
                                marginBottom: "20px",
                                background: "#f1f5f9",
                                borderLeft: "5px solid #2563eb",
                            }}
                        >
                            <h3>Passage:</h3>
                            <div>{parse(passage)}</div>
                        </div>

                        {subquestions.map((subq, subIndex) => {
                            const questionId = `${qObj.id}-${subIndex}`;
                            const selectedAnswer = answersStore?.find(
                                (ans) => ans.question_id === questionId
                            );

                            return (
                                <div key={subIndex} className="comprehension-subq">
                                    <div style={{ marginBottom: "10px" }}>
                                        <strong>Q{subIndex + 1}.</strong> {subq.question}
                                    </div>
                                    <textarea
                                        rows={3}
                                        style={{
                                            width: "100%",
                                            borderColor: "#ccc",
                                            padding: "8px",
                                            borderRadius: "4px",
                                        }}
                                        value={inputs[subq?.question] || selectedAnswer?.user_answer || ""}
                                        onChange={(e) => handleChange(subq.question, e?.target?.value)}
                                        placeholder="Type your answer here..."
                                    />
                                </div>
                            );
                        })}
                        <div className="flex justify-between">
                            <button
                                className="btn btn-primary mt-3 mr-2"
                                onClick={() => setPage((prev) => prev - 1)}
                                disabled={questions?.pagination?.current_page === 1}
                            >
                                Previous
                            </button>
                            {questions?.pagination?.total === page ? (
                                <button className="btn btn-primary mt-3 ml-2">Submit</button>
                            ) : (
                                <button
                                    onClick={() => setPage((prev) => prev + 1)}
                                    className="btn btn-primary mt-3"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                );
            })
            }

        </>
    )
}
export default Comprehension;