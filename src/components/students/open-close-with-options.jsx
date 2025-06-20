import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import { useSelector } from "react-redux";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const OpenClozeWithOptions = (props) => {
    const { questions, type, page, setPage } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const answersStore = useSelector((state) => state.question.attempts);
    const [inputs, setInputs] = useState({});
    const [inputErrors, setInputErrors] = useState({});
    const [userAnswerJSON, setUserAnswerJSON] = useState([]);
    useEffect(() => { setInputs({}) }, [page]);
    const handlePaperSubmit = async() => {
        let payload = {
            answers: answersStore?.map(item => ({
                question_id: item.question_id,
                answer: item.user_answer,
                type: item?.type,
            }))
        };
        await userService.answer(payload).then((data) => {
            toast.success("Answer submitted successfully.");
            navigate("/student/question-type");
        }).catch((error) => {
            console.error("Error", error);
        });
    }

    return (
        <>
            {questions.questions_array.map((qObj, index) => {
                const questionData = qObj.question;
                const paragraph = questionData.paragraph;
                const blanks = questionData.questions;
                const options = questionData.question_group.shared_options.map(
                    (opt) => opt.toLowerCase()
                );
                const handleChange = (e, id, blank_number) => {
                    const value = e.target.value.trim();

                    setInputs((prev) => ({ ...prev, [id]: value }));

                    if (value === "" || options.includes(value.toLowerCase())) {
                        // valid input → clear error and dispatch
                        setInputErrors((prev) => ({ ...prev, [id]: false }));
                        // user answer json format
                        const existingAnswerIndex = userAnswerJSON.findIndex(
                            (answer) => answer.blank_number === blank_number
                        );
                        if (existingAnswerIndex !== -1) {
                            userAnswerJSON[existingAnswerIndex] = {
                                blank_number: blank_number,
                                value: value,
                            };
                        } else {
                            userAnswerJSON.push({
                                blank_number: blank_number,
                                value: value,
                            });
                        }
                        let payload = {
                            question_id: qObj?.id,
                            type: type,
                            user_answer: JSON.stringify(userAnswerJSON),
                        }
                        console.log(payload, '============')
                        dispatch(
                            setAttemptQuestions(payload)
                        );
                    } else {
                        // invalid → show error but don't dispatch
                        setInputErrors((prev) => ({ ...prev, [id]: true }));
                    }
                };
                const renderedParagraph = paragraph?.split(/(\(\d+\)_____)/g)?.map((part, i) => {
                    const match = part.match(/\((\d+)\)_____/);
                    if (match) {
                        const blankNumber = parseInt(match[1]);
                        const question = blanks.find(
                            (q) => q.blank_number === blankNumber
                        );
                        const inputValue = inputs[question.id] || "";
                        const hasError = inputErrors[question.id];
                        const foundObject = answersStore?.find(item => item.question_id === qObj?.id);
                        let prefilledFromStore;
                        if (foundObject) {
                            prefilledFromStore = JSON.parse(foundObject?.user_answer)?.find(item => item?.blank_number == question?.blank_number);
                        }
                        return (
                            <>

                                <span style={{ fontSize: 'larger', color: 'black', margin: '1px', marginLeft: '7px'}}>({question?.blank_number})</span>
                                <input
                                    key={i}
                                    type="text"
                                    placeholder={`_____`}
                                    value={inputs[question.id] || prefilledFromStore?.value || ""}
                                    onChange={(e) => handleChange(e, question.id, question?.blank_number)}
                                    style={{
                                        width: "60px",
                                        margin: "0 5px",
                                        border: "none",
                                        background: "transparent",
                                        borderBottom: inputErrors[question.id]
                                            ? "2px solid red"
                                            : "none",
                                        textAlign: "center",
                                    }}
                                />
                             
                            </>
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
                            <strong>Options:</strong> {options.join(", ")}
                        </div>

                        <div className="px-0 py-3 options">
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
                    </div>
                );
            })}
        </>
    )
}
export default OpenClozeWithOptions;