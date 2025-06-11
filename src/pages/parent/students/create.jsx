import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudentSchema } from "../../../components/parent/student-validation-schema";
import parentService from "../../../_services/parent.service";
import toast from "react-hot-toast";

const CreateStudent = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [creating, setCreating] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((prev) => !prev);
  const [studentLevel, setStudentLevel] = useState();
  useEffect(() => {
    const fetchStudentLevel = async () => {
      await parentService
        .getStudentLevel()
        .then((data) => {
          setStudentLevel(data?.data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    };
    fetchStudentLevel();
  }, []);
  const [filteredLevels, setFilteredLevels] = useState([]);
  useEffect(() => {
    if (studentLevel) {
      setFilteredLevels(studentLevel["primary"] || []);
    }
  }, [studentLevel]);
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    student_type: "",
    phone: "",
    address: "",
    student_level: null,
    avatar: null,
    lock_code: null,
    lock_code_enabled: false,
    password: "",
    password_confirmation: "",
  };
  const handleSubmit = async (values) => {
    setCreating(true);
    const formData = new FormData();
    for (let key in values) {
      if (values[key] !== null) {
        if (key === "lock_code_enabled") {
          formData.append(key, values[key] ? 1 : 0);
        } else {
          formData.append(key, values[key]);
        }
      }
    }
    await parentService
      .createStudent(formData)
      .then((data) => {
        navigate("/parent/students");
        toast.success("Created successful!");
      })
      .catch((error) => {
        console.error("Submit Error:", error);
      })
      .finally(() => {
        setCreating(false);
      });
  };
  return (
    <>
      <h3>Create Form</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={createStudentSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <div className="mb-24">
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
            <div className="mb-24">
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
            <div className="mb-24">
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
                  <i className="ph ph-user"></i>
                </span>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger text-13"
              />
            </div>
            <div className="mb-24">
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
                  <i className="ph ph-user"></i>
                </span>
              </div>
              <ErrorMessage
                name="phone"
                component="div"
                className="text-danger text-13"
              />
            </div>
            <div className="mb-24">
              <label htmlFor="student_type" className="form-label mb-8 h6">
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
            <div className="mb-24">
              <label htmlFor="student_level" className="form-label mb-8 h6">
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
            <div className="mb-24">
              <label htmlFor="avatar" className="form-label mb-8 h6">
                Avatar (Optional)
              </label>
              <div className="position-relative">
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="form-control py-11 ps-40"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("avatar", file);
                  }}
                />
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-user"></i>
                </span>
              </div>
              <ErrorMessage
                name="avatar"
                component="div"
                className="text-danger text-13"
              />
            </div>
            <div className="mb-24">
              <label htmlFor="password" className="form-label mb-8 h6">
                Password
              </label>
              <div className="position-relative">
                <Field
                  id="password"
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  className="form-control py-11 ps-40"
                  placeholder="Enter Current Password"
                />
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-lock"></i>
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger text-13"
              />
            </div>
            <div className="mb-24">
              <label
                htmlFor="password_confirmation"
                className="form-label mb-8 h6"
              >
                Confirm Password
              </label>
              <div className="position-relative">
                <Field
                  id="password_confirmation"
                  name="password_confirmation"
                  type={passwordShown ? "text" : "password"}
                  className="form-control py-11 ps-40"
                  placeholder="Enter confirm password"
                />
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-lock"></i>
                </span>
              </div>
              <ErrorMessage
                name="password_confirmation"
                component="div"
                className="text-danger text-13"
              />
            </div>
            <div className="mb-24">
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
                  className="form-check-label ms-2"
                >
                  Generate Lock Code
                </label>
              </div>
            </div>
            <div className="mb-24">
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
            <div className="mb-24">
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
            <button
              type="submit"
              className="btn btn-main rounded-pill w-100"
              disabled={creating}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default CreateStudent;
