import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const McqQuestions = (props) => {
    const { questions, type, page, setPage } = props;
    const navigate = useNavigate();
    const answersStore = useSelector((state) => state.question.attempts);
    const dispatch = useDispatch();
    const handleOptionChange = (e, question) => {
        let payload = {
            question_id: question?.id,
            answer: type == "mcq" ? question?.question?.answer?.answer : question?.question?.answer?.choice,
            user_answer: e?.target?.value,
            type: type
        }
        dispatch(setAttemptQuestions(payload));
    };
    const handleSubmit = async () => {
        let payload = {
            answers: answersStore?.map(item => ({
                question_id: item.question_id,
                answer:  item.user_answer,
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
            {questions?.questions_array?.map((question, index) => (
                <div key={index}>
                    <h2 className="mb-3">Questions</h2>
                    <div className="question-card">
                        <div className="question-text">{page}. {parse(question?.question?.content)}</div>
                        <div className="mcq-options">
                            {question?.question.options?.map((opt, index) => {
                                const selectedAnswer = answersStore?.find(ans => ans.question_id === question.id);
                                return (
                                    <div key={index}>
                                        <label
                                            className={`kbc-option-label`}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${opt.value}`}
                                                value={opt.value}
                                                checked={selectedAnswer?.user_answer == opt?.value}
                                                onChange={(e) => handleOptionChange(e, question)}
                                            />
                                            {opt.value}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="btn btn-primary mt-3 mr-2"
                            onClick={(e) => setPage((prev) => prev - 1)}
                            disabled={(questions?.pagination?.current_page == 1)}
                        >
                            Previous
                        </button>
                        {(questions?.pagination?.total == page) ?
                            <button onClick={() => handleSubmit()} className="btn btn-primary mt-3 ml-2">
                                Submit
                            </button>
                            : <button onClick={(e) => setPage((prev) => prev + 1)} className="btn btn-primary mt-3">
                                Next
                            </button>
                        }
                    </div>
                </div>
            ))}
        </>
    )
}
export default McqQuestions;