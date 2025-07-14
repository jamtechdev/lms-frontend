import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttemptQuestions } from "../../_store/_reducers/question";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";

const ReArrangeList = ({ question, index }) => {
  const dispatch = useDispatch();
  const answersStore = useSelector((state) => state.question.attempts);
  const containerRefs = useRef({});
  const positionsRef = useRef({});

  const [submitted, setSubmitted] = useState(false);
  const [words, setWords] = useState([]);

  // Shuffle the words only once when component mounts
  useEffect(() => {
    if (question?.question?.options) {
      const shuffled = [...question.question.options].sort(() => Math.random() - 0.5);
      setWords(shuffled);
    }
  }, [question]);

  // Animate changes when reordering
  useLayoutEffect(() => {
    const newPositions = {};
    words.forEach((word, idx) => {
      const key = `${word.value}-${idx}`;
      const node = containerRefs.current[key];
      if (node) newPositions[key] = node.getBoundingClientRect();
    });

    words.forEach((word, idx) => {
      const key = `${word.value}-${idx}`;
      const node = containerRefs.current[key];
      const oldRect = positionsRef.current[key];
      const newRect = newPositions[key];
      if (node && oldRect) {
        const dx = oldRect.left - newRect.left;
        const dy = oldRect.top - newRect.top;
        if (dx || dy) {
          node.style.transform = `translate(${dx}px, ${dy}px)`;
          node.style.transition = "transform 0s";
          node.getBoundingClientRect();
          node.style.transition = "transform 300ms ease";
          node.style.transform = "";
        }
      }
    });

    positionsRef.current = newPositions;
  }, [words]);

  const handleDragStart = (e, idx) => {
    if (submitted) return;
    e.dataTransfer.setData("text/plain", idx);
  };

  const handleDrop = (e, dropIdx) => {
    if (submitted) return;
    e.preventDefault();
    const dragIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (isNaN(dragIdx)) return;

    const newList = [...words];
    const [dragged] = newList.splice(dragIdx, 1);
    newList.splice(dropIdx, 0, dragged);
    setWords(newList);
  };

  const handleDragOver = (e) => {
    if (!submitted) e.preventDefault();
  };

  const handleSubmit = async () => {
    if (submitted || words.length === 0) return;

    const userAnswer = words.map(w => w.value).join(" ");
    const payload = {
      question_id: question.id,
      answer: question.question.answer.answer.join(" "),
      user_answer: userAnswer,
      type: question.question.type,
    };

    dispatch(setAttemptQuestions(payload));

    const updatedAnswers = [...answersStore.filter(a => a.question_id !== payload.question_id), payload];

    try {
      await userService.answer({
        answers: updatedAnswers.map(({ question_id, user_answer, type }) => ({
          question_id,
          answer: user_answer,
          type,
        })),
      });
      toast.success("Answer submitted successfully.");
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Submission failed.");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="mb-3">Question {index + 1}</h2>
      <strong>Instruction:</strong> {question?.question?.instruction}
      <div className="question-card mt-2">
        <div className="rearrangeBox mt-4">
          {words.map((word, idx) => {
            const key = `${word.value}-${idx}`;
            return (
              <div
                key={key}
                ref={(node) => (containerRefs.current[key] = node)}
                className="drop-zone flex flex-col gap-4 p-6 rounded-lg bg-gray-50 mb-8"
                draggable={!submitted}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, idx)}
              >
                <div
                  className="draggable-item bg-purple-100 text-purple-800 p-4 rounded-xl shadow-md font-medium text-xl border border-blue-200"
                >
                  {word.value}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-3">
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={submitted || words.length === 0}
          >
            {submitted ? "Submitted" : "Submit"}
          </button>
        </div>

        <p className="mt-2">
          Your Answer: <strong>{words.map(w => w.value).join(" ")}</strong>
        </p>
      </div>

    </div>
  );
};

export default ReArrangeList;
