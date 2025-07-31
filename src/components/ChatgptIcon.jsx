import React, { useState } from "react";
import { userService } from "../_services";
import toast from "react-hot-toast";
import loader from "../assets/images/loader.gif";

const ChatgptIcon = ({ question_id }) => {
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchAi = async () => {
    setLoading(true);
    try {
      const response = await userService.getAi({ question_id });
      const result = response?.data?.[0]?.data;

      if (result) {
        setModalData(result);
        setShowModal(true);
      } else {
        toast.error("Invalid response from AI.");
      }
    } catch (error) {
      toast.error("Error fetching AI response.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <button
        className="feedback-dropdown-btn ai-button"
        onClick={fetchAi}
        disabled={loading}
      >
        {loading ? (
          <img src={loader} width={20} height={20} alt="Loading..." />
        ) : (
          <i className="ph ph-open-ai-logo"></i>
        )}
      </button>
      {showModal && modalData && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">AI Feedback</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Correct Answer:</strong> {modalData.correct_answer}
                </p>
                <p>
                  <strong>Explanation:</strong> {modalData.explanation}
                </p>
                <p>
                  <strong>Suggestion:</strong> {modalData.suggestion}
                </p>
                <p>
                  <strong>Improvement:</strong> {modalData.improvement}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatgptIcon;
