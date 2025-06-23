import React from 'react';
import { Container, ContainerFluid, Row, Col, Card, Button, ProgressBar, Table, Alert } from 'react-bootstrap';

const NewStudentDashboard = () => {
  return (
    <Container className="my-4" fluid>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100 text-center">
            <Card.Body>
              <Card.Title>Hi Sophie! 👋</Card.Title>
              <Card.Text>You’re doing great in P3. Let’s keep learning!</Card.Text>
              <Card.Footer className="text-muted">💡 Tip: Stay curious and ask questions — it's the best way to learn!</Card.Footer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Your Gems</Card.Title>
              <h3 className="text-warning">💎 45</h3>
              <Button variant="primary" size="sm" className="mt-2 float-end">View Prizes</Button>
              <p className="text-muted mt-4 mb-1">Progress to next reward</p>
              <ProgressBar now={45} label={`45%`} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Weekly Assignment Target</Card.Title>
          <Card.Text>Your parent has assigned you to complete 3 papers this week.</Card.Text>
          <ProgressBar now={33} className="mb-2" />
          <small>1 of 3 completed</small>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>This Week’s Required Papers</Card.Title>
          <p className="text-muted">You must complete at least one paper per subject this week.</p>
          <Row>
            {[
              { subject: 'English', due: '28 Apr 2025', status: 'Start', variant: 'primary' },
              { subject: 'Math', due: '28 Apr 2025', status: 'Completed', variant: 'success', disabled: true },
              { subject: 'Science', due: '28 Apr 2025', status: 'Start', variant: 'primary' },
            ].map(({ subject, due, status, variant, disabled }, i) => (
              <Col md={4} className="mb-3" key={i}>
                <Card>
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>📘 {subject}</strong>
                      <div className="text-muted text-sm">Due: {due}</div>
                    </div>
                    <Button variant={variant} size="sm" disabled={disabled}>{status}</Button>
                  </Card.Body>
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
              <Card.Title>Daily Challenge</Card.Title>
              <Card.Text>Complete today’s special challenge to earn bonus gems!</Card.Text>
              <Card className="p-3 d-flex justify-content-between align-items-center">
                <div>
                  <strong>🔍 Mystery Science Quiz</strong>
                  <div className="text-muted text-sm">Earn +5 Gems</div>
                </div>
                <Button variant="purple" size="sm" style={{ backgroundColor: '#6f42c1' }}>Start Challenge</Button>
              </Card>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Question Bank</Card.Title>
              <Card.Text>Browse and filter questions by subject from our full library.</Card.Text>
              <Button variant="primary">Start</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Your Past Assessments</Card.Title>
          <Table hover>
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
                <td><Button variant="link" size="sm">Review</Button></td>
              </tr>
              <tr>
                <td>Math</td>
                <td>15 Apr 2025</td>
                <td>85%</td>
                <td><Button variant="link" size="sm">Review</Button></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Alert variant="warning" className="d-flex align-items-center">
        😊 <span className="ms-2">Did you know? Frogs can breathe through their skin! 🐸</span>
      </Alert>
    </Container>
  );
};

export default NewStudentDashboard;
