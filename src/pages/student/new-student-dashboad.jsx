import React from "react";
import {
  Container,
  ContainerFluid,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Table,
  Alert,
} from "react-bootstrap";

const NewStudentDashboard = () => {
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
          <h2 class="pb-2 border-bottom mb-3">🧑 Weekly Assignment Target</h2>
          <div>
            <h5 className="mb-3">
              Your parent has assigned you to complete 3 papers this week.
            </h5>
            <ProgressBar
              label={`1 of 3 completed`}
              now={33}
              className="flex-1 w-100"
            />
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h2 class="pb-2 border-bottom mb-3">
            📃 This Week’s Required Papers
          </h2>
          <p>You must complete at least one paper per subject this week.</p>
          <Row>
            {[
              {
                subject: "English",
                due: "28 Apr 2025",
                status: "Start",
                variant: "primary",
              },
              {
                subject: "Math",
                due: "28 Apr 2025",
                status: "Completed",
                variant: "success",
                disabled: true,
              },
              {
                subject: "Science",
                due: "28 Apr 2025",
                status: "Start",
                variant: "primary",
              },
            ].map(({ subject, due, status, variant, disabled }, i) => (
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
              <h2 class="pb-2 border-bottom mb-3">📅 Daily Challenge</h2>
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
              <h2 class="pb-2 border-bottom mb-3">❓ Question Bank</h2>
              <div className="flex-column text-center align-items-center pt-4">
                <h5>
                  Browse and filter questions by subject from our full library.
                </h5>
                <button className="dashboard-button mx-auto mt-4">Start</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <h2 class="pb-2 border-bottom mb-3">📃 Your Past Assessments</h2>
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
    </Container>
  );
};

export default NewStudentDashboard;
