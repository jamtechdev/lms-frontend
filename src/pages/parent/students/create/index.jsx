import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createStudentSchema } from "../../../../components/parent/student-validation-schema";

const CreateStudent = () => {
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => setPasswordShown((prev) => !prev);
    const initialValues = { first_name: "", last_name: "", email: "", student_type: "", phone: "", address: "", student_level: null, lock_code: null, lock_code_enabled: false, password: "", password_confirmation: "", };
    const handleSubmit = () => {

    }
    return (
        <>
            <h3>Create From</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={createStudentSchema}
                onSubmit={handleSubmit}
            >
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
                        <label htmlFor="password" className="form-label mb-8 h6">
                            Current Password
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
                    <button
                        type="submit"
                        className="btn btn-main rounded-pill w-100"
                    >
                        Submit
                    </button>
                </Form>
            </Formik>
        </>
    )
}
export default CreateStudent;