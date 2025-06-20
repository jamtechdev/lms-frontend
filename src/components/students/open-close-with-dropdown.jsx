import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import { useSelector } from "react-redux";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const OpenClozeWithDropdown = (props) => {
    const { questions, type, page, setPage } = props;
    const dispatch = useDispatch();
    const answersStore = useSelector((state) => state.question.attempts);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [inputErrors, setInputErrors] = useState({});
    const [userAnswerJSON, setUserAnswerJSON] = useState([]);
    useEffect(() => { setInputs({}) }, [page]);

    const handleStoreData = async (question) => {
        let payload = {
            question_id: question?.id,
            type: type,
            user_answer: JSON.stringify(inputs),
        }
        dispatch(setAttemptQuestions(payload));
        if (questions?.pagination?.total === page) {
            const updatedAnswers = [...answersStore, payload];
            let finalPayload = {
                answers: updatedAnswers?.map(item => ({
                    question_id: item.question_id,
                    answer: item.user_answer,
                    type: item?.type,
                }))
            };
            await userService.answer(finalPayload).then((data) => {
                console.log(data);
                toast.success("Answer submitted successfully.");
                navigate("/student/question-type");
            }).catch((error) => {
                console.error("Error", error);
            });
        }
    }

    return (
        <>
            {questions.questions_array.map((qObj, index) => {
                const questionData = qObj.question;
                const paragraph = questionData.paragraph.replace(/<[^>]+>/g, "");
                const blanks = questionData.questions;

                const handleOptionClick = (blank_number, selectedOption) => {
                    setInputs((prev) => ({ ...prev, [blank_number]: selectedOption }));

                    // dispatch(
                    //     setAttemptQuestions({
                    //         question_id: questionId,
                    //         user_answer: selectedOption,
                    //         type: type,
                    //     })
                    // );
                };

                const renderedParagraph = paragraph
                    .split(/(\(\d+\)\[[^\]]+\])/g)
                    .map((part, i) => {
                        const match = part.match(/\((\d+)\)\[([^\]]+)\]/);
                        if (match) {
                            const blankNumber = parseInt(match[1]);
                            const optionsText = match[2];
                            const question = blanks.find(
                                (q) => q.blank_number === blankNumber
                            );
                            const selectedAnswer = inputs[question.blank_number];
                            const options = optionsText.split("/").map((opt) => opt.trim());

                            return (
                                <span key={i} style={{ margin: "0 5px" }}>
                                    [
                                    {options.map((opt, idx) => {
                                        const isSelected = selectedAnswer === opt;
                                        return (
                                            <span
                                                key={idx}
                                                onClick={() => handleOptionClick(question.blank_number, opt)}
                                                style={{
                                                    cursor: "pointer",
                                                    margin: "0 5px",
                                                    textDecoration: isSelected ? "underline" : "none",
                                                }}
                                            >
                                                {opt}
                                            </span>
                                        );
                                    })}
                                    ]
                                </span>
                            );
                        } else {
                            return <span key={i}>{part}</span>;
                        }
                    });

                return (
                    <div key={index} style={{ marginBottom: "30px" }}>
                        <div
                            style={{
                                marginTop: "15px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                background: "#f9f9f9",
                            }}
                        >
                            <strong>Instruction:</strong> {questionData.instruction}
                        </div>

                        <div style={{ marginTop: "10px", lineHeight: "1.8" }}>
                            <strong>{page}.</strong> {renderedParagraph}
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="btn btn-primary mt-3 mr-2"
                                onClick={() => setPage((prev) => prev - 1)}
                                disabled={questions?.pagination?.current_page === 1}
                            >
                                Previous
                            </button>
                            {questions?.pagination?.total === page ? (
                                <button onClick={() => {
                                    handleStoreData(qObj)
                                }} className="btn btn-primary mt-3 ml-2">Submit</button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setPage((prev) => prev + 1)
                                        handleStoreData(qObj)
                                    }}
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
export default OpenClozeWithDropdown;