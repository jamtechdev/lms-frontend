import parse from "html-react-parser";
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Xarrow from "react-xarrows";

const ItemTypes = {
    LEFT_ITEM: "LEFT_ITEM",
};

const DraggableLeft = ({ item, index }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.LEFT_ITEM,
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={dragRef}
            id={`left-${index}`}
            className="link-item"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div className="selector-circle"></div>
            {item.match_type === "text" ? (
                <div>{item.word}</div>
            ) : (
                <img src={item.image_uri} alt="left" style={{ width: "100px" }} />
            )}
        </div>
    );
};

const DroppableRight = ({ item, index, onDrop }) => {
    const [, dropRef] = useDrop(() => ({
        accept: ItemTypes.LEFT_ITEM,
        drop: (draggedItem) => {
            onDrop(draggedItem.index, index);
        },
    }));

    return (
        <div ref={dropRef} id={`right-${index}`} className="link-item">
            {item.match_type === "text" ? (
                <div>{item.word}</div>
            ) : (
                <img src={item.image_uri} alt="right" style={{ width: "100px" }} />
            )}
            <div className="selector-circle"></div>
        </div>
    );
};

const LinkingQuestions = (props) => {
    const { questions, type, page, setPage, shuffledRight, setShuffledRight, userMatches, setUserMatches } = props;
    console.log(userMatches, '..........', shuffledRight)
    const handleDrop = (leftIndex, rightIndex) => {
        const leftItem = questions?.questions_array[0]?.question?.answer[leftIndex]?.left?.word;
        const rightItem = shuffledRight[rightIndex]?.word;
        setUserMatches((prev) => ({
            ...prev,
            [leftIndex]: { leftItem, rightItem },
        }));
    };
    const logSelectedMatches = (question, shuffledRight, userMatches) => {
        if (
            !question?.question?.answer ||
            !Array.isArray(shuffledRight) ||
            !userMatches
        ) {
            console.warn("Missing or invalid inputs");
            return;
        }

        const selectedMatches = Object.entries(userMatches).map(([leftIndex, rightIndex]) => {
            const leftItem = question.question.answer[leftIndex]?.left;
            const rightItem = shuffledRight[rightIndex];

            return {
                left: {
                    word: leftItem?.word,
                    image_uri: leftItem?.image_uri,
                    match_type: leftItem?.match_type
                },
                right: {
                    word: rightItem?.word,
                    image_uri: rightItem?.image_uri,
                    match_type: rightItem?.match_type
                }
            };
        });

        const result = {
            type: question.question.type,
            answer: selectedMatches
        };

        console.log("Final Match Result:", result);
    };

    return (
        <>
            {questions.questions_array.map((question, index) => (
                <div key={index}>
                    <DndProvider backend={HTML5Backend}>
                        <div className="question-card">
                            <h2 className="question-text">
                                {page}. {parse(question?.question?.content)}
                            </h2>

                            <div className="linking-container">
                                {/* Left Side */}
                                <div className="left-side">
                                    {question?.question?.answer?.map((pair, i) => (
                                        <div className="link-item" key={i} id={`left-${i}`}>
                                            <DraggableLeft item={pair.left} index={i} />
                                        </div>
                                    ))}
                                </div>

                                {/* Right Side */}
                                <div className="right-side">
                                    {shuffledRight.map((item, i) => (
                                        <div className="link-item" key={i} id={`right-${i}`}>
                                            <DroppableRight
                                                item={item}
                                                index={i}
                                                onDrop={(leftIndex, rightIndex) =>
                                                    setUserMatches((prev) => ({
                                                        ...prev,
                                                        [leftIndex]: rightIndex,
                                                    }))
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Arrows */}
                                {Object.entries(userMatches).map(
                                    ([leftIndex, rightIndex], i) => (
                                        <Xarrow
                                            key={i}
                                            start={`left-${leftIndex}`}
                                            end={`right-${rightIndex}`}
                                            startAnchor="right"
                                            endAnchor="left"
                                            strokeWidth={2}
                                            curveness={0.4 + i * 0.1}
                                            headSize={0}
                                            color="#2563eb"
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </DndProvider>
                    <div className="flex justify-between">
                        <button
                            className="btn btn-primary mt-3 mr-2"
                            onClick={() => setPage((prev) => prev - 1)}
                            disabled={questions?.pagination?.current_page === 1}
                        >
                            Previous
                        </button>
                        {questions?.pagination?.total === page ? (
                            <button onClick={logSelectedMatches(question, shuffledRight, userMatches)} className="btn btn-primary mt-3 ml-2">Submit</button>
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
            ))}

        </>
    )
}
export default LinkingQuestions;