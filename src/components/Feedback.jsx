import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { userService } from "../_services";
import toast from "react-hot-toast";

const Feedback = (props) => {
  const { question_id } = props;
  const [selectedReason, setSelectedReason] = useState("");
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemClick = (reason) => {
    setSelectedReason(reason);
    setShowFeedbackBox(true);
  };

  const handleToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
    if (!isOpen) {
      resetFeedback();
    }
  };

  const resetFeedback = () => {
    setSelectedReason("");
    setShowFeedbackBox(false);
    setFeedbackMessage("");
  };

  const handleSubmit = async () => {
    if (!feedbackMessage.trim()) {
      alert("Please enter feedback before submitting.");
      return;
    }

    const payload = {
      question_id,
      type: selectedReason.toLowerCase().replace(/\s+/g, "_"),
      message: feedbackMessage.trim(),
    };

    try {
      setIsSubmitting(true);
      const response = await userService.feedback(payload);
      toast.success("Feedback submitted successfully!");
      resetFeedback();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("There was an error submitting your feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reasons = [
    "No Solution",
    "Answer Text Error",
    "Question Text Error",
    "Other",
  ];

  return (
    <Dropdown
      className="feedback-dropdown"
      onToggle={handleToggle}
      show={isDropdownOpen}
    >
      <Dropdown.Toggle className="feedback-dropdown-btn">
        <i className="ph ph-question"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-3">
        <h6 className="text-center">Flag Question</h6>

        {!showFeedbackBox ? (
          <ul>
            {reasons.map((reason) => (
              <li key={reason} onClick={() => handleItemClick(reason)}>
                {reason}
              </li>
            ))}
          </ul>
        ) : (
          <div className="feedback-box mt-3">
            <div className="feedback-header mb-2">
              <span>{selectedReason}</span>
            </div>
            <textarea
              rows={3}
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder="Enter your feedback here..."
            ></textarea>
            <button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Feedback;
