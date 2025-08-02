import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/logo/logo.png";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import parentService from "../../_services/parent.service";

const SignUp = () => {
  const dispatch = useDispatch();
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
  });

  const handlesignup = async (values, { resetForm }) => {
    try {
      const response = await parentService.signUp(values);
      toast.success(
        "Signup successful! Check your email to verify your account."
      );
      resetForm();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Signup failed. Please try again later."
      );
    }
  };

  return (
    <div>
      <div className="preloader">
        <div className="loader"></div>
      </div>
      <div className="side-overlay"></div>
      <section className="auth d-flex">
        <div className="auth-left bg-main-50 flex-center p-24 auth-bg-section"></div>
        <div className="auth-right py-40 px-24 flex-center flex-column auth-bg-color">
          <div className="auth-right__inner mx-auto w-100">
            <Link to="/" className="mb-3">
              <img width={150} src={logo} alt="QTN" />
            </Link>
            <h1 className="mb-8">Sign Up</h1>
            <p className="text-gray-600 text-15 mb-32">
              Please sign up to your account and start the adventure
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handlesignup}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-24">
                    <label htmlFor="first_name" className="form-label mb-8 h6">
                      First Name
                    </label>
                    <div className="position-relative">
                      <Field
                        name="first_name"
                        type="text"
                        id="first_name"
                        placeholder="Enter your first name"
                        className="form-control py-11 ps-40"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-user"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-danger text-14 mt-2"
                    />
                  </div>

                  <div className="mb-24">
                    <label htmlFor="last_name" className="form-label mb-8 h6">
                      Last Name
                    </label>
                    <div className="position-relative">
                      <Field
                        name="last_name"
                        type="text"
                        id="last_name"
                        placeholder="Enter your last name"
                        className="form-control py-11 ps-40"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-user"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-danger text-14 mt-2"
                    />
                  </div>

                  <div className="mb-24">
                    <label htmlFor="email" className="form-label mb-8 h6">
                      Email
                    </label>
                    <div className="position-relative">
                      <Field
                        name="email"
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="form-control py-11 ps-40"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-envelope"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger text-14 mt-2"
                    />
                  </div>

                  <div className="mb-24">
                    <label htmlFor="password" className="form-label mb-8 h6">
                      Password
                    </label>
                    <div className="position-relative">
                      <Field
                        name="password"
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="form-control py-11 ps-40"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-lock"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger text-14 mt-2"
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
                        name="password_confirmation"
                        type="password"
                        id="password_confirmation"
                        placeholder="Confirm your password"
                        className="form-control py-11 ps-40"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-lock"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="password_confirmation"
                      component="div"
                      className="text-danger text-14 mt-2"
                    />
                  </div>

                  <div className="mb-24">
                    <label htmlFor="phone" className="form-label mb-8 h6">
                      Phone
                    </label>
                    <div className="position-relative">
                      <Field
                        name="phone"
                        type="text"
                        id="phone"
                        placeholder="Enter your phone number"
                        className="form-control py-11 ps-40"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-phone"></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger text-14 mt-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="dashboard-button w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>

                  <p className="mt-32 text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-main-600 hover-text-decoration-underline"
                    >
                      Log In
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
