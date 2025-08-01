import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/logo/logo.png";
import userService from "../../_services/user.service";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setParentBackup } from "../../_store/_reducers/auth";
import parentService from "../../_services/parent.service";
import { Modal } from "react-bootstrap";
import emailImage from "../../assets/images/email.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const togglePasswordVisibility = () => setPasswordShown((prev) => !prev);

  const parentInitialValues = { email: "", password: "" };

  const parentValidationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleParentSubmit = async (values) => {
    try {
      const response = await userService.login(values);
      const userData = response.data;
      dispatch(
        login({
          token: userData.token,
          first_name: userData.first_name,
          last_name: userData.last_name,
          student_type: userData.student_type,
          level: userData.level_id,
          role: userData?.role,
        })
      );
      dispatch(
        setParentBackup({
          token: userData.token,
          first_name: userData.first_name,
          last_name: userData.last_name,
          student_type: userData.student_type,
          level: userData.level_id,
          role: userData?.role,
        })
      );
      toast.success("Login successful!");
      navigate("/parent");
    } catch (err) {
      if (
        err?.response?.status === 401 &&
        err?.response?.data?.message?.toLowerCase().includes("not verified")
      ) {
        setUnverifiedEmail(values.email);
        setShowVerifyModal(true);
      } else {
        toast.error(
          err?.response?.data?.message || "Login failed, please try again"
        );
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      await parentService.resendVerify({ email: unverifiedEmail });
      toast.success("Verification email sent!");
    } catch (err) {
      toast.error("Failed to resend verification email.");
    }
  };

  return (
    <>
      <div className="preloader">
        <div className="loader"></div>
      </div>
      <div className="side-overlay"></div>
      <section className="auth d-flex">
        <div className="auth-left bg-main-50 flex-center p-24 auth-bg-section"></div>
        <div className="auth-right py-40 px-24 flex-center flex-column auth-bg-color">
          <div className="auth-right__inner mx-auto w-100 mt-5">
            <Link to="/" className="mb-3">
              <img width={150} src={logo} alt="QTN" />
            </Link>
            <h1 className="mb-8">Welcome Back!</h1>
            <p className="text-gray-600 text-15 mb-32">
              Please sign in to your account and start the adventure
            </p>

            <Formik
              initialValues={parentInitialValues}
              validationSchema={parentValidationSchema}
              onSubmit={handleParentSubmit}
            >
              <Form>
                <div className="mb-24">
                  <label htmlFor="email" className="form-label mb-8 h6">
                    Email or Username
                  </label>
                  <div className="position-relative">
                    <Field
                      id="email"
                      name="email"
                      type="text"
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
                    <span
                      className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph ${
                        passwordShown ? "ph-eye" : "ph-eye-slash"
                      }`}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    ></span>
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
                <div className="mb-32 flex-between flex-wrap gap-8">
                  <Link
                    to="/forgotpassword"
                    className="text-main-600 hover-text-decoration-underline text-15 fw-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button type="submit" className="dashboard-button w-100">
                  Sign In
                </button>
              </Form>
            </Formik>

            <p className="mt-32 text-gray-600 text-center">
              New on our platform?{" "}
              <Link
                to="/signup"
                className="text-main-600 hover-text-decoration-underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Modal
        show={showVerifyModal}
        onHide={() => setShowVerifyModal(false)}
        centered
        backdrop="static"
        dialogClassName="verify-modal"
        contentClassName="rounded-4 border-0 shadow-lg animate-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100 text-center text-primary fs-4 fw-bold">
            <i className="ph ph-warning-circle text-warning me-2 fs-3"></i>
            Email Not Verified
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center pt-2 px-4">
          <img
            src={emailImage}
            alt="Email Verification"
            className="w-50"
            loading="eager"
          />
          <p className="mb-0 fs-5 text-black">
            Please verify your email first. We’ve sent you a verification link.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex align-items-center justify-content-center w-100 gap-3 m-0">
            <button
              className="logout-btn w-50 justify-content-center "
              onClick={() => {
                setShowVerifyModal(false);
                setUnverifiedEmail("");
              }}
            >
              Back to Login
            </button>
            <button
              className="dashboard-button w-50"
              onClick={handleResendVerification}
            >
              Resend Email
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
