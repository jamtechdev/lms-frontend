import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import parentService from "../../../_services/parent.service";
import loader from "../../../assets/images/loader.gif";

function formatDateForInput(dateString) {
  const date = new Date(dateString);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

const UpdateAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creating, setCreating] = useState(false);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

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
    const fetchData = async () => {
      try {
        const [subjectRes, studentRes, questionRes, assignmentRes] =
          await Promise.all([
            parentService.getAllSubject(),
            parentService.getAllChild(),
            parentService.getQuestions(),
            parentService.updateById({ assignment_id: id }),
          ]);

        setSubjects(subjectRes.data);
        setStudents(studentRes.data);
        setQuestions(questionRes.data.questions_array);

        const assignment = assignmentRes.data;
        const questionIds = assignment.questions.map((q) => q.id);

        setInitialValues({
          title: assignment.title || "",
          student_id: assignment.student_id?.toString() || "",
          subject_id: assignment.subject?.id?.toString() || "",
          question_ids: questionIds.map(String),
          description: assignment.description || "",
          due_date: assignment.due_date
            ? formatDateForInput(assignment.due_date)
            : "",
        });
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load assignment.");
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (values) => {
    setCreating(true);
    const formData = new FormData();

    formData.append("assignment_id", id);

    for (let key in values) {
      if (key === "question_ids") {
        formData.append("question_ids", values[key].join(","));
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      await parentService.updateAssignments(formData);
      toast.success("Updated successfully!");
      navigate("/parent/assessment");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed!");
    } finally {
      setCreating(false);
    }
  };

  const getFullName = (student) => `${student.first_name} ${student.last_name}`;

  if (!initialValues)
    return (
      <div className="text-center mt-5">
        <img src={loader} width={100} />
      </div>
    );

  return (
    <Card className="p-4">
      <h3 className="mb-3 border-bottom pb-3">Update Assignment</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Row className="g-4">
              <Col xl={6}>
                <label htmlFor="title" className="form-label h6">
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  className="form-control"
                  placeholder="Enter title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </Col>

              <Col xl={6}>
                <label htmlFor="student_id" className="form-label h6">
                  Select Student
                </label>
                <Field as="select" name="student_id" className="form-control">
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id.toString()}>
                      {getFullName(s)}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="student_id"
                  component="div"
                  className="text-danger"
                />
              </Col>

              <Col xl={6}>
                <label htmlFor="subject_id" className="form-label h6">
                  Select Subject
                </label>
                <Field as="select" name="subject_id" className="form-control">
                  <option value="">Select subject</option>
                  {subjects.map((subj) => (
                    <option key={subj.id} value={subj.id.toString()}>
                      {subj.subject_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="subject_id"
                  component="div"
                  className="text-danger"
                />
              </Col>

              <Col xl={6}>
                <label className="form-label h6">Select Questions</label>
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
                    className="text-danger"
                  />
                </div>
              </Col>

              <Col xl={12}>
                <label htmlFor="description" className="form-label h6">
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  className="form-control"
                  placeholder="Enter description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
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
                  {creating ? "Submitting..." : "Update"}
                </button>
              </Col>
            </Row>

            {showModal && (
              <div className="modal show fade d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable">
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
                      {questions.map((q) => (
                        <div className="form-check" key={q.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`q-${q.id}`}
                            value={q.id.toString()}
                            checked={values.question_ids.includes(
                              q.id.toString()
                            )}
                            onChange={(e) => {
                              const value = e.target.value;
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
                          >
                            {q.question.content}
                          </label>
                        </div>
                      ))}
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

export default UpdateAssignment;
