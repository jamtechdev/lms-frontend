import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets/images/logo/logo.png';
import loginImage from '../../assets/images/auth-img1.png';
import userService from '../../_services/user.service';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../_store/_reducers/auth';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [activeTab, setActiveTab] = useState('parent');

  const togglePasswordVisibility = () => setPasswordShown(prev => !prev);

  const parentInitialValues = { email: '', password: '' };
  const studentInitialValues = { lock_code: '' };

  const parentValidationSchema = Yup.object({
    email: Yup.string().email('Enter a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const studentValidationSchema = Yup.object({
    lock_code: Yup.string().required('Lock code is required'),
  });

  const handleParentSubmit = async (values) => {
    try {
      const response = await userService.login(values);
      const userData = response.data.data;
      dispatch(login({
        token: userData.token,
        first_name: userData.first_name,
        last_name: userData.last_name,
        student_type: userData.student_type
      }));
      toast.success('Login successful!');
      navigate("dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed, please try again');
    }
  };

  const handleStudentSubmit = async (values) => {
    try {
      const response = await userService.loginStudent(values);
      const userData = response.data.data;
      dispatch(login({
        token: userData.token,
        first_name: userData.first_name,
        last_name: userData.last_name,
        student_type: userData.student_type
      }));
      toast.success('Student login successful!');
      navigate("dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Student login failed, please try again');
    }
  };

  return (
    <>
      <div className="preloader"><div className="loader"></div></div>
      <div className="side-overlay"></div>
      <section className="auth d-flex">
        <div className="auth-left bg-main-50 flex-center p-24">
          <img src={loginImage} alt="login" />
        </div>
        <div className="auth-right py-40 px-24 flex-center flex-column">
          <div className="auth-right__inner mx-auto w-100">
            <a href="/" className="auth-right__logo">
              <img src={logo} alt="LMS" />
            </a>
            <h2 className="mb-8">Welcome Back! 👋</h2>
            <p className="text-gray-600 text-15 mb-32">
              Please sign in to your account and start the adventure
            </p>
            <div className="tabs mb-24">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'parent' ? 'active' : ''}`}
                onClick={() => setActiveTab('parent')}
              >
                Parent
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'student' ? 'active' : ''}`}
                onClick={() => setActiveTab('student')}
              >
                Student
              </button>
            </div>
            {activeTab === 'parent' ? (
              <Formik
                initialValues={parentInitialValues}
                validationSchema={parentValidationSchema}
                onSubmit={handleParentSubmit}
              >
                <Form>
                  <div className="mb-24">
                    <label htmlFor="email" className="form-label mb-8 h6">Email or Username</label>
                    <div className="position-relative">
                      <Field id="email" name="email" type="text" className="form-control py-11 ps-40" placeholder="Type your email" />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex"><i className="ph ph-user"></i></span>
                    </div>
                    <ErrorMessage name="email" component="div" className="text-danger text-13" />
                  </div>
                  <div className="mb-24">
                    <label htmlFor="password" className="form-label mb-8 h6">Current Password</label>
                    <div className="position-relative">
                      <Field id="password" name="password" type={passwordShown ? 'text' : 'password'} className="form-control py-11 ps-40" placeholder="Enter Current Password" />
                      <span className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph ${passwordShown ? 'ph-eye' : 'ph-eye-slash'}`} onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}></span>
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex"><i className="ph ph-lock"></i></span>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-danger text-13" />
                  </div>
                  <div className="mb-32 flex-between flex-wrap gap-8">
                    <Link to="/forgotpassword" className="text-main-600 hover-text-decoration-underline text-15 fw-medium">Forgot Password?</Link>
                  </div>
                  <button type="submit" className="btn btn-main rounded-pill w-100">Sign In</button>
                </Form>
              </Formik>
            ) : (
              <Formik
                initialValues={studentInitialValues}
                validationSchema={studentValidationSchema}
                onSubmit={handleStudentSubmit}
              >
                <Form>
                  <div className="mb-24">
                    <label htmlFor="lock_code" className="form-label mb-8 h6">Enter Lock Code</label>
                    <div className="position-relative">
                      <Field id="lock_code" name="lock_code" type="text" className="form-control py-11 ps-40" placeholder="Enter your lock code" />
                      <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex"><i className="ph ph-key"></i></span>
                    </div>
                    <ErrorMessage name="lock_code" component="div" className="text-danger text-13" />
                  </div>
                  <button type="submit" className="btn btn-main rounded-pill w-100">Sign In</button>
                </Form>
              </Formik>
            )}

            <p className="mt-32 text-gray-600 text-center">
              New on our platform?{' '}
              <Link to="/signup" className="text-main-600 hover-text-decoration-underline">
                Create an account
              </Link>
            </p>
            <div className="divider my-32 position-relative text-center">
              <span className="divider__text text-gray-600 text-13 fw-medium px-26 bg-white">or</span>
            </div>
            <ul className="flex-align gap-10 flex-wrap justify-content-center">
              <li><a href="https://www.facebook.com" className="w-38 h-38 flex-center rounded-6 text-facebook-600 bg-facebook-50 hover-bg-facebook-600 hover-text-white text-lg"><i className="ph ph-facebook-logo"></i></a></li>
              <li><a href="https://www.twitter.com" className="w-38 h-38 flex-center rounded-6 text-twitter-600 bg-twitter-50 hover-bg-twitter-600 hover-text-white text-lg"><i className="ph ph-twitter-logo"></i></a></li>
              <li><a href="https://www.google.com" className="w-38 h-38 flex-center rounded-6 text-google-600 bg-google-50 hover-bg-google-600 hover-text-white text-lg"><i className="ph ph-google-logo"></i></a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
