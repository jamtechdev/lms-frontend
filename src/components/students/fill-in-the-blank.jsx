import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import { useSelector } from "react-redux";


const FillInTheBlank = (props) => {
    const { questions, type, page, setPage } = props;
    const dispatch = useDispatch();
    const answersStore = useSelector((state) => state.question.attempts);
    console.log(answersStore, '>>>>>>>', questions)
    const [inputs, setInputs] = useState({});
    const [inputErrors, setInputErrors] = useState({});
    const [userAnswerJSON, setUserAnswerJSON] = useState([]);
    useEffect(() => { setInputs({}) }, [page]);
    const handlePaperSubmit = () => {
        let payload = answersStore;
        console.log(payload, 'Final Submit')
    }
    function removeHtmlTags(inputString) {
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = inputString;
        return tempDiv.textContent || tempDiv.innerText || '';
    }


    return (
        <>
            {questions?.questions_array?.map((qObj, index) => {
                function createDynamicInputFields(questionText) {
                    const regex = /\(\d+\)_____/g;
                    let updatedText = questionText.replace(regex, (match) => {
                        const number = match.match(/\d+/)[0];
                        return `<input type="text" id="input${number}" placeholder="Enter answer for (${number})">`;
                    });
                    return updatedText;
                }

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
                            {/* <strong>Options:</strong> {options.join(", ")} */}
                        </div>

                        <div>
                            {removeHtmlTags(qObj?.question?.question_text)}
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
export default FillInTheBlank;