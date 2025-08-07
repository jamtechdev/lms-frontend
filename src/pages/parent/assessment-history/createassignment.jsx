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
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const initialValues = {
    title: "",
    student_id: "",
    subject_id: "",
    question_ids: [],
    description: "",
    due_date: "",
    assignment_type: "",
    number_of_papers: "",
    frequency: "",
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
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .min(
        new Date().toISOString().split("T")[0],
        "Due Date cannot be in the past"
      ),
    assignment_type: Yup.string().required("Assignment type is required"),
    number_of_papers: Yup.number().when("assignment_type", {
      is: "routine",
      then: (schema) =>
        schema
          .required("Number of papers is required")
          .min(1, "Must be at least 1"),
      otherwise: (schema) => schema.notRequired(),
    }),

    frequency: Yup.string().when("assignment_type", {
      is: "routine",
      then: (schema) => schema.required("Frequency is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
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
                <label htmlFor="assignment_type" className="form-label mb-8 h6">
                  Choose Assignment Type
                </label>
                <Field
                  as="select"
                  name="assignment_type"
                  className="form-control"
                >
                  <option value="">Select assignment type</option>
                  <option value="one-off">
                    One-off Assignment (single instance)
                  </option>
                  <option value="routine">
                    Routine Assignment (recurring)
                  </option>
                </Field>
                <ErrorMessage
                  name="assignment_type"
                  component="div"
                  className="text-danger text-13"
                />
              </Col>
              {values.assignment_type === "routine" && (
                <>
                  <Col xl={6}>
                    <label
                      htmlFor="number_of_papers"
                      className="form-label mb-8 h6"
                    >
                      Number of Papers
                    </label>
                    <Field
                      name="number_of_papers"
                      type="number"
                      className="form-control py-11"
                      placeholder="Enter number of papers"
                    />
                    <ErrorMessage
                      name="number_of_papers"
                      component="div"
                      className="text-danger text-13"
                    />
                  </Col>

                  <Col xl={6}>
                    <label htmlFor="frequency" className="form-label mb-8 h6">
                      Frequency
                    </label>
                    <Field
                      as="select"
                      name="frequency"
                      className="form-control"
                    >
                      <option value="">Select frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </Field>
                    <ErrorMessage
                      name="frequency"
                      component="div"
                      className="text-danger text-13"
                    />
                  </Col>
                </>
              )}
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
                <label htmlFor="due_date" className="form-label mb-8 h6">
                  Due Date <small className="text-muted">(optional)</small>
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
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default CreateAssignment;
