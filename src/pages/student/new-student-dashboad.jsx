import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import topicsService from "../../_services/topics.service";
import userService from "../../_services/user.service";
import {
  getChildId,
  getFirstName,
  getLastName,
  getLevel,
} from "../../_store/_reducers/auth";
import loader from "../../assets/images/loader.gif";
import parentService from "../../_services/parent.service";

const NewStudentDashboard = () => {
  const level = useSelector(getLevel);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [assignmentLoading, setAssignmentLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState();
  const childId = useSelector(getChildId);
  const firstname = useSelector(getFirstName);
  const lastname = useSelector(getLastName);
  const [results, setResults] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [gems, setGems] = useState([]);
  const [papersModalOpen, setPapersModalOpen] = useState(false);
  const [papers, setPapers] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState("");
  const getAssignments = async () => {
    setAssignmentLoading(true);
    try {
      const data = await userService.getStudentAssignment({
        student_id: childId,
      });
      setAssignments(data?.data);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setAssignmentLoading(false);
    }
  };

  useEffect(() => {
    getAssignments();
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

  const handleStart = (id) => {
    navigate(`/student/week-assignment/${id}`);
  };

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

  const fetchResults = async () => {
    setResultsLoading(true);
    try {
      const data = await userService.getResult({
        student_id: childId,
      });
      setResults(data?.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setResultsLoading(false);
    }
  };

  const fetchGems = async () => {
    try {
      const data = await parentService.getStudentGems(childId);
      setGems(data?.data?.total_gems);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    fetchResults();
    fetchGems();
  }, []);

  const fetchPapers = async (assignment_id) => {
    setLoading(true);
    try {
      const response = await userService.getPapers({ assignment_id });
      setPapers(response?.data || []);
      setPapersModalOpen(true);
    } catch (error) {
      console.error("Error fetching papers:", error);
    } finally {
      setLoading(false);
    }
  };

  const AssignmentButton = ({ due_date, id, recurrence_type }) => {
    let isEnabled = false;

    if (recurrence_type === "daily") {
      isEnabled = true;
    } else if (due_date) {
      const dueDate = new Date(due_date);
      dueDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      isEnabled = dueDate >= today;
    }

    return (
      <div>
        <button
          className="dashboard-button width-fit"
          disabled={!isEnabled}
          onClick={() => {
            setSelectedAssignmentId(id);
            fetchPapers(id);
          }}
        >
          Start
        </button>
      </div>
    );
  };
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    d.setHours(0, 0, 0, 0);
    return `${d.getDate()} ${d.toLocaleString("en-US", {
      month: "short",
    })} ${d.getFullYear()}`;
  }

  return (
    <Container className="my-4" fluid>
      <Row className="mb-4">
        <Col md={8}>
          <Card className="h-100 text-left">
            <Card.Body>
              <h1>
                Hi {firstname} {lastname} 👋
              </h1>
              <Card.Text className="mb-3">
                You’re doing great. Let’s keep learning!
              </Card.Text>
              <div className="text-muted alert alert-warning">
                💡 Tip: Stay curious and ask questions — it's the best way to
                learn!
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mt-4 mt-md-0">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="mb-0">Your Gems</h2>
                <h3 className="text-warning mb-0">💎 {gems}</h3>
              </div>
              <div className="pt-2 pb-3">
                <p className="text-muted my-1">Redeem your gem-based rewards</p>
              </div>
              <div className="d-flex gap-5">
                <button
                  className="dashboard-button w-100"
                  size="sm"
                  onClick={() => navigate("gems")}
                >
                  Gems History
                </button>
                <button
                  className="dashboard-button w-100"
                  size="sm"
                  onClick={() => navigate("prize")}
                >
                  View Prizes
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="mb-4">
        <Card.Body>
          <h2 className="pb-2 border-bottom mb-3">📃 This Week’s Assignment</h2>
          <p>You must complete at least one paper per subject this week.</p>
          <Row>
            {assignmentLoading ? (
              <Col className="text-center mt-3">
                <img src={loader} width={100} alt="Loading..." />
              </Col>
            ) : assignments && assignments.length > 0 ? (
              assignments.map((assignment, i) => (
                <Col md={4} className="mb-3" key={i}>
                  <Card className="student-card flex-row align-items-start justify-content-between m-0">
                    <div>
                      <h3 className="text-white">{assignment?.title}</h3>
                      <h4 className="text-white">
                        📘 {assignment?.subject?.subject_name}
                      </h4>

                      {assignment?.recurrence_type === "none" && (
                        <p className="text-white m-0">
                          Due: {formatDate(assignment?.due_date)}
                        </p>
                      )}

                      {assignment?.recurrence_type === "daily" && (
                        <>
                          <p className="text-white m-0">
                            📝 Papers Count: {assignment?.papers_count || 0}
                          </p>
                          <p className="text-white m-0">
                            🔁 Frequency: {assignment?.frequency || "N/A"}
                          </p>
                        </>
                      )}
                    </div>

                    <AssignmentButton
                      due_date={assignment?.due_date}
                      id={assignment?.id}
                      status={assignment?.assignment_status}
                      recurrence_type={assignment?.recurrence_type}
                    />
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <div className="text-center text-muted py-3">
                  💤 No assignments available for this week.
                </div>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>

      <Row className="mb-4">
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
        <Col md={6} className="mt-4 mt-md-0">
          <Card className="h-100">
            <Card.Body>
              <h2 className="pb-2 border-bottom mb-3">
                📃 Your Past Assessments
              </h2>
              <div className="table-height">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Score</th>
                      <th>Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultsLoading ? (
                      <tr>
                        <td colSpan="3" className="text-center py-4">
                          <img src={loader} width={50} alt="Loading..." />
                        </td>
                      </tr>
                    ) : results.length > 0 ? (
                      results.map((item, index) => (
                        <tr key={index}>
                          <td>{item.subject || "N/A"}</td>
                          <td>{item.score}%</td>
                          <td>
                            {item.submitted_at
                              ? new Date(item.submitted_at).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "N/A"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          💤 No assessments found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
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
                <option value="all">All Topic</option>
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

        <Modal.Footer className="pt-0">
          <div className="d-flex align-items-center justify-content-center w-100 gap-3 m-0">
            <button
              className="logout-btn w-50 justify-content-center"
              onClick={handleCloseModal}
            >
              ❌ Cancel
            </button>
            <button
              className="dashboard-button w-50"
              disabled={!selectedSubject || !selectedTopic}
              onClick={() => {
                navigate(
                  `/student/all-questions?sub=${selectedSubject}&topic=${selectedTopic}`
                );
                handleCloseModal();
              }}
            >
              ✅ Start Practice
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={papersModalOpen}
        onHide={() => {
          setPapersModalOpen(false);
          setSelectedPaper("");
        }}
        centered
        dialogClassName="kids-modal"
        animation={true}
      >
        <Modal.Header closeButton className="kids-modal-header">
          <Modal.Title>📄 Assignment Papers</Modal.Title>
        </Modal.Header>

        <Modal.Body className="kids-modal-body">
          {loading ? (
            <div className="text-center py-4">
              <img src={loader} width={60} alt="Loading..." />
            </div>
          ) : papers && papers.length > 0 ? (
            <Form.Group controlId="paperSelect">
              <Form.Label>📄 Select a Paper</Form.Label>
              <Form.Select
                className="kids-select"
                value={selectedPaper}
                onChange={(e) => setSelectedPaper(e.target.value)}
              >
                <option value="">-- Select Paper --</option>
                {papers.map((paper) => (
                  <option key={paper.id} value={paper.id}>
                    {paper.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          ) : (
            <div className="text-muted text-center py-3">
              💤 No papers found for this assignment.
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex gap-3 w-100">
            <button
              className="logout-btn w-50"
              onClick={() => {
                setPapersModalOpen(false);
                setSelectedPaper("");
              }}
            >
              ❌ Cancel
            </button>
            <button
              className="dashboard-button w-50"
              disabled={!selectedPaper}
              onClick={() => {
                navigate(`/student/week-assignment/${selectedPaper}`);
                setPapersModalOpen(false);
                setSelectedPaper("");
              }}
            >
              ✅ Start Assignment
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewStudentDashboard;
