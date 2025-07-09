import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/logo/logo.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const initialValues = {
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchemas = [
    Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    Yup.object({
      otp: Yup.string().length(6, "OTP must be 6 digits").required("Required"),
    }),
    Yup.object({
      password: Yup.string()
        .min(6, "At least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
  ];

  const handleSubmit = (values, actions) => {
    if (step < 3) {
      setStep(step + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    } else {
      console.log("Final values submitted:", values);
    }
  };

  return (
    <div className="auth d-flex">
      <div className="preloader">
        <div className="loader"></div>
      </div>
      <div className="side-overlay"></div>
      <div className="auth-left bg-main-50 flex-center p-24 auth-bg-section"></div>
      <div className="auth-right py-40 px-24 flex-center flex-column auth-bg-color">
        <div className="auth-right__inner mx-auto w-100">
          <Link to="/" className="mb-3">
            <img width={150} src={logo} alt="QTN" />
          </Link>
          <h1 className="mb-8">Forgot Password?</h1>
          <p className="text-gray-600 text-15 mb-32">
            {step === 1 && "Enter your email to receive an OTP."}
            {step === 2 && "Enter the OTP sent to your email."}
            {step === 3 && "Set your new password."}
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[step - 1]}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {step === 1 && (
                  <div className="mb-24">
                    <label htmlFor="email" className="form-label mb-8 h6">
                      Email
                    </label>
                    <div className="position-relative">
                      <Field
                        type="email"
                        name="email"
                        className="form-control py-11 ps-40"
                        placeholder="Type your email address"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-envelope"></i>
                      </span>
                    </div>
                     <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger mt-2"
                      />
                  </div>
                )}

                {step === 2 && (
                  <div className="mb-24">
                    <label htmlFor="otp" className="form-label mb-8 h6">
                      OTP
                    </label>
                    <div className="position-relative">
                      <Field
                        type="text"
                        name="otp"
                        className="form-control py-11 ps-40"
                        placeholder="Enter 6-digit OTP"
                      />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                        <i className="ph ph-key"></i>
                      </span>
                    </div>
                     <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-danger mt-2"
                      />
                  </div>
                )}

                {step === 3 && (
                  <>
                    <div className="mb-24">
                      <label htmlFor="password" className="form-label mb-8 h6">
                        New Password
                      </label>
                      <div className="position-relative">
                        <Field
                          type="password"
                          name="password"
                          className="form-control py-11 ps-40"
                          placeholder="Enter new password"
                        />
                        <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                          <i className="ph ph-lock"></i>
                        </span>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>

                    <div className="mb-24">
                      <label
                        htmlFor="confirmPassword"
                        className="form-label mb-8 h6"
                      >
                        Confirm Password
                      </label>
                      <div className="position-relative">
                        <Field
                          type="password"
                          name="confirmPassword"
                          className="form-control py-11 ps-40"
                          placeholder="Re-enter new password"
                        />
                        <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                          <i className="ph ph-lock"></i>
                        </span>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="dashboard-button w-100"
                  disabled={isSubmitting}
                >
                  {step < 3 ? "Next" : "Reset Password"}
                </button>

                <Link
                  to="/login"
                  className="my-32 text-main-600 flex-align gap-8 justify-content-center"
                >
                  <i className="ph ph-arrow-left d-flex"></i> Back To Login
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
