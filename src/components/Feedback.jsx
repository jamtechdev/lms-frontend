import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Feedback = () => {
  const [selectedReason, setSelectedReason] = useState("");
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = (reason) => {
    setSelectedReason(reason);
    setShowFeedbackBox(true);
  };

  const handleToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
    if (!isOpen) {
      // Reset when dropdown closes
      setSelectedReason("");
      setShowFeedbackBox(false);
    }
  };

  const reasons = [
    "No Solution",
    "Solution Error",
    "No Image",
    "Image Error",
    "Question Text Error",
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

        {!showFeedbackBox && (
          <ul>
            {reasons.map((reason) => (
              <li key={reason} onClick={() => handleItemClick(reason)}>
                {reason}
              </li>
            ))}
          </ul>
        )}

        {showFeedbackBox && (
          <div className="feedback-box mt-3">
            <div className="feedback-header mb-2">
              <span>{selectedReason}</span>
            </div>
            <textarea rows={3}></textarea>
            <button>Submit</button>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Feedback;
