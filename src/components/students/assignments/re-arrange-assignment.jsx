import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, } from "react-redux";
import { setAssignmentsQuestion } from "../../../_store/_reducers/question";
import Feedback from "../../Feedback";

const ReArrangeListAssignment = ({ question, index }) => {
  const dispatch = useDispatch();
  const containerRefs = useRef({});
  const positionsRef = useRef({});

  const [submitted, setSubmitted] = useState(false);
  const [words, setWords] = useState([]);

  // Shuffle once on mount
  useEffect(() => {
    if (question?.question?.options) {
      const shuffled = [...question.question.options].sort(
        () => Math.random() - 0.5
      );
      setWords(shuffled);
    }
  }, [question]);

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
          node.getBoundingClientRect(); // force reflow
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

    const userAnswer = words.map((w) => w.value).join(" ");
    const payload = {
      question_id: question.id,
      user_answer: userAnswer,
      type: question.question.type,
    };
    dispatch(setAssignmentsQuestion(payload));
  };

  return (
    <>
      <div className="question-header">
        <h2>Question {index + 1}</h2>
        <p>
          <strong>Instruction:</strong> {question?.question?.instruction}
        </p>
        <Feedback />
      </div>
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
                <div className="draggable-item bg-purple-100 text-purple-800 p-4 rounded-xl shadow-md font-medium text-xl border border-blue-200">
                  {word.value}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-2">
          Your Answer: <strong>{words.map((w) => w.value).join(" ")}</strong>
        </p>
        <div className="d-flex justify-content-end mt-4">
          <button
            onClick={handleSubmit}
            className="dashboard-button"
            disabled={submitted || words.length === 0}
          >
            {submitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReArrangeListAssignment;
