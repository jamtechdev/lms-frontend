import React, { useRef, useLayoutEffect } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ReArrangeList = ({ question, words, onReorder, setPage, isFirst, isLast, setResult }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const answersStore = useSelector((state) => state.question.attempts);
    const containerRefs = useRef({});
    const positionsRef = useRef({});

    useLayoutEffect(() => {
        const newPositions = {};
        words.forEach((word, index) => {
            const key = `${word}-${index}`;
            const node = containerRefs.current[key];
            if (node) newPositions[key] = node.getBoundingClientRect();
        });

        words.forEach((word, index) => {
            const key = `${word}-${index}`;
            const node = containerRefs.current[key];
            if (node && positionsRef.current[key]) {
                const oldRect = positionsRef.current[key];
                const newRect = newPositions[key];
                const deltaX = oldRect.left - newRect.left;
                const deltaY = oldRect.top - newRect.top;

                if (deltaX || deltaY) {
                    node.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                    node.style.transition = "transform 0s";
                    node.getBoundingClientRect();
                    node.style.transition = "transform 300ms ease";
                    node.style.transform = "";
                }
            }
        });

        positionsRef.current = newPositions;
    }, [words]);

    const handleDragStart = (event, index) => {
        event.dataTransfer.setData("text/plain", index);
    };

    const handleDragOver = (event) => event.preventDefault();

    const handleDrop = (event, dropIndex) => {
        event.preventDefault();
        const dragIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
        if (isNaN(dragIndex)) return;

        const newItems = [...words];
        const [dragged] = newItems.splice(dragIndex, 1);
        newItems.splice(dropIndex, 0, dragged);
        onReorder(newItems);
    };
    const handleSubmit = async () => {
        let payload = {
            question_id: question?.id,
            answer: question?.question?.answer?.answer?.join(' '),
            user_answer: words?.join(' '),
            type: question?.question?.type,
        }
        dispatch(setAttemptQuestions(payload));
        if (isLast) {
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
        <div className="mt-4">
            <div>{parse(question?.question?.content)}</div>
            <div >
                {words?.map((word, index) => {
                    const key = `${word}-${index}`;
                    return (
                        <div
                            key={key}
                            ref={(node) => (containerRefs.current[key] = node)}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            style={{
                                padding: "10px 14px",
                                background: 'rgb(199, 196, 189)',
                                borderRadius: "6px",
                                cursor: "move",
                                position: "relative",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                            className="mt-2"
                        >
                            {word}
                        </div>
                    );
                })}
            </div>
            <p className="mt-2">Your Answer: {words?.join(" ")}</p>
            <button
                onClick={() => setPage((prev) => prev - 1)}
                className="btn btn-primary"
                disabled={isFirst}
            >
                Prev
            </button>

            {!isLast ?
                <button onClick={() => {
                    setPage((prev) => prev + 1)
                    handleSubmit()
                }} className="btn btn-primary">Next</button>
                : <button onClick={() => {
                    handleSubmit()
                }} className="btn btn-primary">Submit</button>
            }
        </div>
    );
};

export default ReArrangeList;
