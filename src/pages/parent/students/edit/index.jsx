import { useNavigate, useParams } from "react-router-dom";
import parentService from "../../../../_services/parent.service";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { editStudentSchema } from "../../../../components/parent/student-validation-schema";
import toast from "react-hot-toast";
import { Card, Col, Row } from "react-bootstrap";
import loader from "../../../../assets/images/loader.gif";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [studentLevel, setStudentLevel] = useState({});
  const [filteredLevels, setFilteredLevels] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentRes, levelsRes] = await Promise.all([
        parentService.getStudentById(id),
        parentService.getStudentLevel(),
      ]);
      setStudent(studentRes?.data);
      setStudentLevel(levelsRes?.data);
      const type = studentRes?.data?.student_type;
      if (type) {
        setFilteredLevels(levelsRes?.data?.[type] || []);
      }
    } catch (error) {
      console.error("Error fetching student data or levels:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  const handleSubmit = async (values) => {
    setUpdating(true);
    const formData = new FormData();
    for (let key in values) {
      if (values[key] !== null) {
        if (key === "lock_code_enabled") {
          formData.append(key, values[key] ? 1 : 0);
        } else if (key === "avatar" && values[key] !== student?.avatar) {
          // If avatar has changed, append it to FormData
          formData.append(key, values[key]);
        } else if (key !== "avatar") {
          formData.append(key, values[key]);
        }
      }
    }
    await parentService
      .updateStudentByParent(values?.id, formData)
      .then((data) => {
        toast.success("Updated successful!");
        navigate("/parent/students");
      })
      .catch((error) => {
        console.error("Error", error);
      })
      .finally(() => {
        setUpdating(false);
      });
  };
  if (loading) return <div className="text-center mt-5">
        <img src={loader} width={100} />
      </div>;
  return (
    <>
      <Card className="p-4">
        <h3 className="mb-3 border-bottom pb-3">Edit Student</h3>
        <Formik
          enableReinitialize
          initialValues={student}
          validationSchema={editStudentSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors }) => (
            <Form>
              <Row className="g-4">
                <Col xl={12} lg={12} md={12}>
                  <div>
                    <label htmlFor="avatar" className="form-label mb-8 h6">
                      Avatar (Optional)
                    </label>
                    <div className="avatar-wrapper">
                      <div className="position-relative file-section">
                        <input
                          id="avatar"
                          name="avatar"
                          type="file"
                          accept="image/*"
                          className="form-control py-11"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("avatar", file);
                          }}
                        />
                      </div>
                      <img
                        src={student?.avatar}
                        alt="avatar"
                        className="avatar-img"
                      />
                    </div>
                    <ErrorMessage
                      name="avatar"
                      component="div"
                      className="text-danger text-13"
                    />
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6}>
                  <div>
                    <label htmlFor="first_name" className="form-label mb-8 h6">
                      First Name
                    </label>
                    <div className="position-relative">
                      <Field
                        id="first_name"
                        name="first_name"
                        type="text"
                        className="form-control py-11 ps-40"
                        placeholder="Type your first name"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-user"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-danger text-13"
                    />
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6}>
                  <div>
                    <label htmlFor="last_name" className="form-label mb-8 h6">
                      Last Name
                    </label>
                    <div className="position-relative">
                      <Field
                        id="last_name"
                        name="last_name"
                        type="text"
                        className="form-control py-11 ps-40"
                        placeholder="Type your last name"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-user"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-danger text-13"
                    />
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6}>
                  <div>
                    <label htmlFor="email" className="form-label mb-8 h6">
                      Email
                    </label>
                    <div className="position-relative">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="form-control py-11 ps-40"
                        placeholder="Type your email"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-envelope"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger text-13"
                    />
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6}>
                  <div>
                    <label htmlFor="phone" className="form-label mb-8 h6">
                      Phone
                    </label>
                    <div className="position-relative">
                      <Field
                        id="phone"
                        name="phone"
                        type="number"
                        className="form-control py-11 ps-40"
                        placeholder="Type your phone"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-device-mobile"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger text-13"
                    />
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6}>
                  <div>
                    <label
                      htmlFor="student_type"
                      className="form-label mb-8 h6"
                    >
                      Student Type
                    </label>
                    <div className="position-relative">
                      <Field
                        as="select"
                        id="student_type"
                        name="student_type"
                        className="form-control"
                        onChange={(e) => {
                          const selectedType = e.target.value;
                          setFieldValue("student_type", selectedType);
                          setFilteredLevels(studentLevel?.[selectedType] || []);
                          setFieldValue("student_level", "");
                        }}
                      >
                        <option value="">Select Type</option>
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                      </Field>
                    </div>
                    <ErrorMessage
                      name="student_type"
                      component="div"
                      className="text-danger text-13"
                    />
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6}>
                  <div>
                    <label
                      htmlFor="student_level"
                      className="form-label mb-8 h6"
                    >
                      Student Level
                    </label>
                    <div className="position-relative">
                      <Field
                        as="select"
                        id="student_level"
                        name="student_level"
                        className="form-control"
                      >
                        <option value="">Select Level</option>
                        {filteredLevels.map((level) => (
                          <option key={level.id} value={level.id}>
                            {level.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage
                      name="student_level"
                      component="div"
                      className="text-danger text-13"
                    />
                  </div>
                </Col>
                <Col xl={12} lg={12} md={12}>
                  <div>
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="lock_code_enabled"
                        id="lock_code_enabled"
                        className="form-check-input"
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFieldValue("lock_code_enabled", checked);
                          if (checked) {
                            const randomCode = Math.floor(
                              100000 + Math.random() * 900000
                            ).toString();
                            setFieldValue("lock_code", randomCode);
                          } else {
                            setFieldValue("lock_code", "");
                          }
                        }}
                      />
                      <label
                        htmlFor="lock_code_enabled"
                        className="form-check-label ms-2 ps-0"
                      >
                        Generate Lock Code
                      </label>
                    </div>
                  </div>
                </Col>
                <Col xl={12} lg={12} md={12}>
                  <div>
                    <label htmlFor="lock_code" className="form-label mb-8 h6">
                      Lock Code
                    </label>
                    <Field
                      id="lock_code"
                      name="lock_code"
                      type="text"
                      className="form-control"
                      disabled
                      placeholder="Auto-generated lock code"
                    />
                    <ErrorMessage
                      name="lock_code"
                      component="div"
                      className="text-danger text-13"
                    />
                  </div>
                </Col>
                <Col xl={12} lg={12} md={12}>
                  <div>
                    <label htmlFor="address" className="form-label mb-8 h6">
                      Address
                    </label>
                    <div className="position-relative">
                      <Field
                        id="address"
                        name="address"
                        type="text"
                        className="form-control py-11 ps-40"
                        placeholder="Type your address"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-user"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger text-13"
                    />
                  </div>
                </Col>
                <Col xl={12} lg={12} md={12}>
                  <button
                    type="submit"
                    className="dashboard-button"
                    disabled={updating}
                  >
                    Submit
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};
export default EditStudent;
