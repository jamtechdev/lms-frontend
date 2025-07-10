import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Table,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import topicsService from "../../_services/topics.service";
import userService from "../../_services/user.service";
import { getLevel } from "../../_store/_reducers/auth";

const NewStudentDashboard = () => {
  const level = useSelector(getLevel);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await userService.getSubject(level);
        setSubjects(response.data);
      } catch (err) {
        console.log(err?.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (level) {
      fetchSubjects();
    }
  }, [level]);

  const handleSubjectChange = async (e) => {
    const selectedSubjectId = e.target.value;
    const subjectObj = subjects.find(
      (s) => s.id.toString() === selectedSubjectId
    );

    setSelectedSubject(selectedSubjectId);
    setSelectedTopic("");
    if (subjectObj) {
      setTopicsLoading(true);
      try {
        const data = await topicsService.topicsBySubject(subjectObj.id);
        setTopics(data.data || []);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setTopicsLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSubject("");
    setSelectedTopic("");
    setTopics([]);
  };

  return (
    <Container className="my-4" fluid>
      <Row className="mb-4">
        <Col md={9}>
          <Card className="h-100 text-left">
            <Card.Body>
              <h1>Hi Sophie! 👋</h1>
              <Card.Text className="mb-3">
                You’re doing great in P3. Let’s keep learning!
              </Card.Text>
              <div className="text-muted alert alert-warning">
                💡 Tip: Stay curious and ask questions — it's the best way to
                learn!
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="mb-0">Your Gems</h2>
                <h3 className="text-warning mb-0">💎 45</h3>
              </div>
              <div className="pt-2 pb-3">
                <p className="text-muted my-1">Progress to next reward</p>
                <ProgressBar now={45} label={`45%`} />
              </div>
              <button className="dashboard-button w-100" size="sm">
                View Prizes
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <h2 className="pb-2 border-bottom mb-3">
            🧑 Weekly Assignment Target
          </h2>
          <h5 className="mb-3">
            Your parent has assigned you to complete 3 papers this week.
          </h5>
          <ProgressBar label={`1 of 3 completed`} now={33} />
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h2 className="pb-2 border-bottom mb-3">
            📃 This Week’s Required Papers
          </h2>
          <p>You must complete at least one paper per subject this week.</p>
          <Row>
            {[
              {
                subject: "English",
                due: "28 Apr 2025",
                status: "Start",
                disabled: false,
              },
              {
                subject: "Math",
                due: "28 Apr 2025",
                status: "Completed",
                disabled: true,
              },
              {
                subject: "Science",
                due: "28 Apr 2025",
                status: "Start",
                disabled: false,
              },
            ].map(({ subject, due, status, disabled }, i) => (
              <Col md={4} className="mb-3" key={i}>
                <Card className="student-card flex-row align-items-start justify-content-between m-0">
                  <div>
                    <h4 className="text-white">📘 {subject}</h4>
                    <p className="text-white m-0">Due: {due}</p>
                  </div>
                  <button
                    className="dashboard-button width-fit"
                    disabled={disabled}
                  >
                    {status}
                  </button>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="pb-2 border-bottom mb-3">📅 Daily Challenge</h2>
              <Card className="student-card flex-row align-items-start justify-content-between m-0">
                <div>
                  <h4 className="text-white">🔍 Mystery Science Quiz</h4>
                  <p className="mb-2 text-white">
                    Complete today’s special challenge to earn bonus gems!
                  </p>
                  <p className="badge badge-success">Earn +5 Gems</p>
                </div>
                <button className="dashboard-button">Start Challenge</button>
              </Card>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <h2 className="pb-2 border-bottom mb-3">❓ Question Bank</h2>
              <div className="flex-column text-center align-items-center pt-4">
                <h5>📚 Start learning by picking a subject and a topic!</h5>
                <button
                  className="dashboard-button mx-auto mt-4"
                  onClick={() => setShowModal(true)}
                >
                  Start
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <h2 className="pb-2 border-bottom mb-3">📃 Your Past Assessments</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>English</td>
                <td>20 Apr 2025</td>
                <td>90%</td>
                <td>
                  <Button variant="link" size="sm">
                    Review
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Math</td>
                <td>15 Apr 2025</td>
                <td>85%</td>
                <td>
                  <Button variant="link" size="sm">
                    Review
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Alert variant="warning" className="d-flex align-items-center">
        😊{" "}
        <span className="ms-2">
          Did you know? Frogs can breathe through their skin! 🐸
        </span>
      </Alert>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="kids-modal"
        animation={true}
      >
        <Modal.Header closeButton className="kids-modal-header">
          <Modal.Title>Select Your Subject & Topic 🎓</Modal.Title>
        </Modal.Header>

        <Modal.Body className="kids-modal-body">
          <Form>
            <Form.Group controlId="subjectSelect" className="mb-4">
              <Form.Label>🧠 Choose a Subject</Form.Label>
              <Form.Select
                value={selectedSubject}
                onChange={handleSubjectChange}
                disabled={loading}
                className="kids-select"
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subject_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="topicSelect" className="mb-2">
              <Form.Label>📚 Pick a Topic</Form.Label>
              <Form.Select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                disabled={!selectedSubject || topicsLoading}
                className="kids-select"
              >
                <option value="">-- Select Topic --</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </Form.Select>
              {topicsLoading && (
                <div className="mt-2 text-muted">🎈 Loading topics...</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="kids-modal-footer">
          <Button variant="outline-danger" onClick={handleCloseModal}>
            ❌ Cancel
          </Button>
          <Button
            variant="success"
            disabled={!selectedSubject || !selectedTopic}
            onClick={() => {
              navigate(
                `/student/all-questions?sub=${selectedSubject}&topic=${selectedTopic}`
              );
              handleCloseModal();
            }}
          >
            ✅ Start Paper
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewStudentDashboard;
