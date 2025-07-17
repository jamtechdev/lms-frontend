import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import parentService from "../../../_services/parent.service";

const CreateAssignment = () => {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const initialValues = {
    title: "",
    student_id: "",
    subject_id: "",
    question_ids: [],
    description: "",
    due_date: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    student_id: Yup.string().required("Student is required"),
    subject_id: Yup.string().required("Subject is required"),
    question_ids: Yup.array()
      .min(1, "Please select at least one question")
      .required("Question is required"),
    description: Yup.string().required("Description is required"),
    due_date: Yup.date()
      .required("Due Date is required")
      .min(
        new Date().toISOString().split("T")[0],
        "Due Date cannot be in the past"
      ),
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await parentService.getAllChild();
        setStudents(res.data);
      } catch (error) {
        console.error("Error loading students:", error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchSubjectsByLevel = async (level) => {
      try {
        const res = await parentService.getAllSubject(level);
        setSubjects(res.data);
      } catch (error) {
        console.error("Error loading subjects:", error);
        setSubjects([]);
      }
    };

    if (selectedStudentId) {
      const student = students.find(
        (s) => s.id.toString() === selectedStudentId.toString()
      );
      if (student?.student_level) {
        fetchSubjectsByLevel(student.student_level);
      }
    }
  }, [selectedStudentId, students]);

  useEffect(() => {
    const fetchQuestions = async (subjectId) => {
      try {
        const res = await parentService.getQuestions(subjectId);
        setQuestions(res.data);
      } catch (error) {
        console.error("Error loading questions:", error);
        setQuestions([]);
      }
    };

    if (selectedSubjectId) {
      fetchQuestions(selectedSubjectId);
    }
  }, [selectedSubjectId]);

  const handleSubmit = async (values) => {
    setCreating(true);
    const formData = new FormData();

    for (let key in values) {
      if (key === "question_ids") {
        const idsString = values[key].join(",");
        formData.append("question_ids", idsString);
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      await parentService.createAssignment(formData);
      toast.success("Assignment created successfully!");
      navigate("/parent/assessment");
    } catch (error) {
      console.error("Assignment creation failed", error);
      toast.error("Failed to create assignment.");
    } finally {
      setCreating(false);
    }
  };

  const getFullName = (student) => `${student.first_name} ${student.last_name}`;

  return (
    <Card className="p-4">
      <h3 className="mb-3 border-bottom pb-3">Create Assignment</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Row className="g-4">
              <Col xl={6}>
                <label htmlFor="title" className="form-label mb-8 h6">
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  className="form-control py-11"
                  placeholder="Enter title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger text-13"
                />
              </Col>

              <Col xl={6}>
                <label htmlFor="student_id" className="form-label mb-8 h6">
                  Select Student
                </label>
                <Field
                  as="select"
                  name="student_id"
                  className="form-control"
                  onChange={(e) => {
                    const studentId = e.target.value;
                    setFieldValue("student_id", studentId);
                    setSelectedStudentId(studentId);
                    setFieldValue("subject_id", "");
                    setSubjects([]);
                    setFieldValue("question_ids", []);
                    setQuestions([]);
                  }}
                >
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {getFullName(s)}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="student_id"
                  component="div"
                  className="text-danger text-13"
                />
              </Col>

              <Col xl={6}>
                <label htmlFor="subject_id" className="form-label mb-8 h6">
                  Select Subject
                </label>
                <Field
                  as="select"
                  name="subject_id"
                  className="form-control"
                  onChange={(e) => {
                    const subjectId = e.target.value;
                    setFieldValue("subject_id", subjectId);
                    setSelectedSubjectId(subjectId);
                    setFieldValue("question_ids", []);
                    setQuestions([]);
                  }}
                >
                  <option value="">Select subject</option>
                  {subjects.map((subj) => (
                    <option key={subj.id} value={subj.id}>
                      {subj.subject_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="subject_id"
                  component="div"
                  className="text-danger text-13"
                />
              </Col>

              <Col xl={6}>
                <label className="form-label mb-8 h6">Select Questions</label>
                <div>
                  <button
                    type="button"
                    className="form-control text-start"
                    onClick={() => setShowModal(true)}
                  >
                    {values.question_ids.length > 0
                      ? `${values.question_ids.length} question(s) selected`
                      : "Click to select questions"}
                  </button>
                  <ErrorMessage
                    name="question_ids"
                    component="div"
                    className="text-danger text-13"
                  />
                </div>
              </Col>

              <Col xl={12}>
                <label htmlFor="description" className="form-label mb-8 h6">
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  className="form-control py-11"
                  placeholder="Enter description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger text-13"
                />
              </Col>

              <Col xl={6}>
                <label htmlFor="due_date" className="form-label mb-8 h6">
                  Due Date
                </label>
                <Field
                  name="due_date"
                  type="date"
                  className="form-control py-11"
                  min={new Date().toISOString().split("T")[0]}
                />
                <ErrorMessage
                  name="due_date"
                  component="div"
                  className="text-danger text-13"
                />
              </Col>

              <Col xl={12}>
                <button
                  type="submit"
                  className="dashboard-button"
                  disabled={creating}
                >
                  {creating ? "Submitting..." : "Submit"}
                </button>
              </Col>
            </Row>
            {showModal && (
              <div
                className="modal show fade d-block"
                tabIndex="-1"
                role="dialog"
              >
                <div
                  className="modal-dialog modal-dialog-scrollable"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Select Questions</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      {questions.length === 0 ? (
                        <p>No questions available...</p>
                      ) : (
                        questions.map((q) => {
                          const rawContent =
                            q.question?.content ||
                            q.question?.paragraph ||
                            q.question?.passage ||
                            q.question?.question_text ||
                            q.question?.instruction ||
                            "Untitled question";
                          const cleanText = rawContent
                            .replace(/<\/?p>/g, "")
                            .trim();

                          return (
                            <div className="form-check mb-2" key={q.id}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`q-${q.id}`}
                                value={q.id}
                                checked={values.question_ids.includes(
                                  Number(q.id)
                                )}
                                onChange={(e) => {
                                  const value = Number(e.target.value);
                                  const updated = e.target.checked
                                    ? [...values.question_ids, value]
                                    : values.question_ids.filter(
                                        (id) => id !== value
                                      );
                                  setFieldValue("question_ids", updated);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`q-${q.id}`}
                                dangerouslySetInnerHTML={{ __html: rawContent }}
                              ></label>
                            </div>
                          );
                        })
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowModal(false)}
                      >
                        Confirm Selection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default CreateAssignment;
