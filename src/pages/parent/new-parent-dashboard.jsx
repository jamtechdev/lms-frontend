import React from 'react';
import { Container, Card, Button, Table, Row, Col } from 'react-bootstrap';

const NewParentDashboard = () => {
  return (
    <Container className="my-4">
      <Card className="text-center mb-4">
        <Card.Body>
          <Card.Title>👧 Sophie - P3 Overview</Card.Title>
          <Card.Text>Track weekly assignments, progress and detailed results here.</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col xs="auto"><Button variant="light">←</Button> Previous Week</Col>
            <Col className="text-center fw-bold">📈 Weekly Marks Overview (Assignment)</Col>
            <Col xs="auto">Next Week <Button variant="light">→</Button></Col>
          </Row>
          <img src="https://via.placeholder.com/800x300?text=Line+Chart+Placeholder" className="w-100 rounded" alt="Chart" />
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>🗂️ Weekly Overview (2–8 June)</Card.Title>
          <Table striped>
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
                  subject: 'English',
                  attempted: 20,
                  correct: 18,
                  wrong: 2,
                  results: '2025-06-02: 9/10, 2025-06-05: 8/10',
                },
                {
                  subject: 'Math',
                  attempted: 10,
                  correct: 6,
                  wrong: 4,
                  results: '2025-06-03: 6/10',
                },
                {
                  subject: 'Science',
                  attempted: 10,
                  correct: 7,
                  wrong: 3,
                  results: '2025-06-04: 7/10',
                },
              ].map((item, index) => (
                <tr key={index}>
                  <td>{item.subject}</td>
                  <td>{item.attempted}</td>
                  <td>{item.correct}</td>
                  <td className="text-primary" style={{ cursor: 'pointer' }}>{item.wrong}</td>
                  <td>{item.results}</td>
                  <td><Button size="sm" variant="primary">⬇️ Download Full Report</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>📋 Assignment Review</Card.Title>
          {[
            {
              subject: 'English',
              text: 'Sophie did well in English this week. Grammar and vocabulary assignments show consistent accuracy. Focus can be on comprehension next.',
            },
            {
              subject: 'Math',
              text: 'Performance in Math was average. Consider reviewing fractions and decimals.',
            },
            {
              subject: 'Science',
              text: 'Good understanding of Science topics. Can explore deeper on recent topics covered.',
            },
          ].map((item, i) => (
            <div key={i} className="mb-3">
              <strong>{item.subject}</strong>
              <p>{item.text}</p>
            </div>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewParentDashboard;
