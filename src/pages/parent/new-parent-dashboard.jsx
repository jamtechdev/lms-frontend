import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getFirstName,
  getLastName,
  getToken,
} from "../../_store/_reducers/auth";
import parentService from "../../_services/parent.service";
import userService from "../../_services/user.service";
import { login } from "../../_store/_reducers/auth";
import { useNavigate } from "react-router-dom";

import loader from "../../assets/images/loader.gif";
import toast from "react-hot-toast";

const NewParentDashboard = () => {
  const [show, setShow] = useState(false);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const inputRefs = useRef([]);
  const parentToken = useSelector(getToken);
  const firstname = useSelector(getFirstName);
  const lastname = useSelector(getLastName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setPin(["", "", "", "", "", ""]);
    setSelectedChildId(null);
  };

  const handleShow = (childId) => {
    setSelectedChildId(childId);
    setShow(true);
  };

  const fetchChild = async () => {
    setLoading(true);
    try {
      const response = await parentService.getChild();
      if (response?.data) {
        setChildren(response.data);
      }
    } catch (error) {
      console.error("Error fetching child:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentSubmit = async (pinCode) => {
    try {
      const values = {
        lock_code: pinCode,
        child_id: selectedChildId,
      };
      const response = await userService.loginStudent(values);
      const userData = response.data;

      dispatch(
        login({
          token: parentToken,
          first_name: userData?.first_name,
          last_name: userData?.last_name,
          student_type: userData?.student_type,
          level: userData?.level_id,
          role: userData?.role,
          avatar: userData?.avatar,
          child_id: selectedChildId,
        })
      );

      toast.success("Student login successful!");
      navigate("/student");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Student login failed, please try again"
      );
    } finally {
      handleClose();
    }
  };

  const handlePinChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.every((digit) => digit !== "")) {
      const pinCode = newPin.join("");
      handleStudentSubmit(pinCode);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    fetchChild();
  }, []);

  return (
    <>
      <Card className="text-left my-2">
        <Card.Body>
          <h2 className="dashboard-username">
            Good morning{" "}
            <b>
              {firstname} {lastname}
            </b>
          </h2>
          <Card.Text>
            Track weekly assignments, progress and detailed results here.
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="g-3 my-2">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <h2 className="pb-2 border-bottom mb-3">🧑‍ Student List</h2>
              <Row className="g-3">
                {loading ? (
                  <div className="text-center w-100 mt-3">
                    <img src={loader} width={100} alt="Loading..." />
                  </div>
                ) : children.length === 0 ? (
                  <div className="text-center w-100 py-5">
                    <p>No students found.</p>
                  </div>
                ) : (
                  children.map((child) => (
                    <Col key={child.id} xl={3} lg={4} md={6}>
                      <div className="student-card">
                        <div className="student-info">
                          <h5 className="mb-3 text-white">
                            {child.first_name} {child.last_name}
                          </h5>
                          <button
                            onClick={() => handleShow(child.id)}
                            className="dashboard-button"
                          >
                            Enter Kid mode
                          </button>
                        </div>
                        <div className="student-image">
                          <img
                            src={child.avatar}
                            alt={`${child.first_name} ${child.last_name}`}
                          />
                        </div>
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 my-2">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <h2 className="pb-2 border-bottom mb-3">📋 Assignment Review</h2>
              {[
                {
                  subject: "English",
                  text: "Your child did well in English this week. Grammar and vocabulary assignments show consistent accuracy. Focus can be on comprehension next.",
                },
                {
                  subject: "Math",
                  text: "Performance in Math was average. Consider reviewing fractions and decimals.",
                },
                {
                  subject: "Science",
                  text: "Good understanding of Science topics. Can explore deeper on recent topics covered.",
                },
              ].map((item, i) => (
                <div key={i} className="mb-3 p-3 rounded border">
                  <h6>{item.subject}</h6>
                  <p className="m-0">{item.text}</p>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="pb-0">
          <h2 className="modal-title text-center w-100">Enter Kid's Mode</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            A 6-digit PIN is required for this action.
            <div className="d-flex align-items-center justify-content-center gap-5 mt-3 w-100 mx-auto">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control text-center"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={{ width: "50px", fontSize: "1.5rem" }}
                />
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex align-items-center justify-content-center w-100 gap-3 m-0">
            <button
              className="logout-btn w-100 justify-content-center"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="dashboard-button w-100"
              onClick={() => handleStudentSubmit(pin.join(""))}
              disabled={pin.some((digit) => digit === "")}
            >
              Confirm
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewParentDashboard;
