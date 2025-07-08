import React, { useState } from "react";
import {
  Container,
  Card,
  Button,
  Table,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { getFirstName, getLastName } from "../../_store/_reducers/auth";

const NewParentDashboard = () => {
  const [show, setShow] = useState(false);
  const firstname = useSelector(getFirstName);
  const lastname = useSelector(getLastName);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
                <Col xl={3} lg={4} md={6}>
                  <div className="student-card">
                    <div className="student-info">
                      <h5 className="mb-3 text-white">Sophie</h5>
                      <button onClick={handleShow} className="dashboard-button">
                        Enter Kid mode
                      </button>
                    </div>
                    <div className="student-image">SO</div>
                  </div>
                </Col>
                <Col xl={3} lg={4} md={6}>
                  <div className="student-card">
                    <div className="student-info">
                      <h5 className="mb-3 text-white">Ryan</h5>
                      <button className="dashboard-button">
                        Enter Kid mode
                      </button>
                    </div>
                    <div className="student-image">RY</div>
                  </div>
                </Col>
                <Col xl={3} lg={4} md={6}>
                  <div className="student-card">
                    <div className="student-info">
                      <h5 className="mb-3 text-white">Chloe</h5>
                      <button className="dashboard-button">
                        Enter Kid mode
                      </button>
                    </div>
                    <div className="student-image">CH</div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 my-2">
        {/* <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <h2 className="pb-2 border-bottom mb-3">
                🗂️ Weekly Overview (2–8 June)
              </h2>
              <Table striped className="w-full" responsive>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Attempted</th>
                    <th>Correct</th>
                    <th>Wrong</th>
                    <th>Results</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      subject: "English",
                      attempted: 20,
                      correct: 18,
                      wrong: 2,
                      results: "2025-06-02: 9/10, 2025-06-05: 8/10",
                    },
                    {
                      subject: "Math",
                      attempted: 10,
                      correct: 6,
                      wrong: 4,
                      results: "2025-06-03: 6/10",
                    },
                    {
                      subject: "Science",
                      attempted: 10,
                      correct: 7,
                      wrong: 3,
                      results: "2025-06-04: 7/10",
                    },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td>{item.subject}</td>
                      <td>{item.attempted}</td>
                      <td>{item.correct}</td>
                      <td
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                      >
                        {item.wrong}
                      </td>
                      <td>{item.results}</td>
                      <td>
                        <Button size="sm" variant="primary">
                          ⬇️ Download Full Report
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col> */}
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
        <Modal.Header>
          <h2 className="modal-title text-center w-100">Enter Kid's Mode</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            A 4-digit PIN is required for this action.
            <div className="d-flex align-items-center justify-content-center gap-5 px-2 mt-3 w-75 mx-auto">
              <input type="text" className="form-control text-center" />
              <input type="text" className="form-control text-center" />
              <input type="text" className="form-control text-center" />
              <input type="text" className="form-control text-center" />
              <input type="text" className="form-control text-center" />
              <input type="text" className="form-control text-center" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex align-items-center justify-content-center w-100 gap-5 m-0">
            <button
              className="logout-btn w-100 justify-content-center"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="dashboard-button w-100" onClick={handleClose}>
              Confirm
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewParentDashboard;
