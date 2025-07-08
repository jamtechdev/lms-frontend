import React, { useRef, useLayoutEffect, useState } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const ReArrangeList = (props) => {
  const {
    question,
    words,
    onReorder,
    setResult,
    page,
    setPage,
    totalPages,
    questions,
  } = props;
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);
  const containerRefs = useRef({});
  const positionsRef = useRef({});
  const [submitted, setSubmitted] = useState(false);

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
    if (submitted) return;
    event.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (event) => {
    if (!submitted) event.preventDefault();
  };

  const handleDrop = (event, dropIndex) => {
    if (submitted) return;
    event.preventDefault();
    const dragIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
    if (isNaN(dragIndex)) return;

    const newItems = [...words];
    const [dragged] = newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, dragged);
    onReorder(newItems);
  };

  const handleSubmit = async () => {
    if (submitted || words.length === 0) return;

    const payload = {
      question_id: question?.id,
      answer: question?.question?.answer?.answer?.join(" "),
      user_answer: words?.join(" "),
      type: question?.question?.type,
    };

    dispatch(setAttemptQuestions(payload));

    const updatedAnswers = [...answersStore, payload];
    const finalPayload = {
      answers: updatedAnswers.map((item) => ({
        question_id: item.question_id,
        answer: item.user_answer,
        type: item.type,
      })),
    };

    try {
      await userService.answer(finalPayload);
      toast.success("Answer submitted successfully.");
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed.");
    }
  };
  const isSubmitDisabled = submitted || words.length === 0;
  return (
    <div className="mt-4">
      <div className="ques">
        {parse(
          typeof question?.question?.content === "string"
            ? question.question.content
            : ""
        )}
      </div>

      <div className="rearrangeBox mt-4">
        {words.map((word, index) => {
          const key = `${word}-${index}`;
          return (
            <div
              key={key}
              ref={(node) => (containerRefs.current[key] = node)}
              className="drop-zone flex flex-col gap-4 p-6 rounded-lg bg-gray-50 mb-8"
              draggable={!submitted}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div
                className="draggable-item bg-purple-100 text-purple-800 p-4 rounded-xl shadow-md font-medium text-xl border border-blue-200"
                draggable="true"
              >
                {word}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2">
        Your Answer: <strong>{words.join(" ")}</strong>
      </p>

      <div className="mt-3">
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          disabled={isSubmitDisabled}
        >
          {submitted ? "Submitted" : "Submit"}
        </button>
      </div>
      {questions?.pagination?.total_pages > 1 && (
        <div className="mt-4 flex justify-center">
          <ResponsivePagination
            current={page}
            total={questions.pagination.total_pages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default ReArrangeList;
