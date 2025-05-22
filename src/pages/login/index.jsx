import React, { useState } from 'react';
import logo from '../../assets/images/logo/logo.png';
import loginImage from '../../assets/images/auth-img1.png';

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <>
      <div className="preloader">
        <div className="loader"></div>
      </div>

      <div className="side-overlay"></div>
      <section className="auth d-flex">
        <div className="auth-left bg-main-50 flex-center p-24">
          <img src={loginImage} alt="login" />
        </div>
        <div className="auth-right py-40 px-24 flex-center flex-column">
          <div className="auth-right__inner mx-auto w-100">
            <a href="index.html" className="auth-right__logo">
              <img  alt="LMS" />
            </a>
            <h2 className="mb-8">Welcome to Back! 👋</h2>
            <p className="text-gray-600 text-15 mb-32">
              Please sign in to your account and start the adventure
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-24">
                <label htmlFor="fname" className="form-label mb-8 h6">
                  Email or Username
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control py-11 ps-40"
                    id="fname"
                    placeholder="Type your username"
                  />
                  <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                    <i className="ph ph-user"></i>
                  </span>
                </div>
              </div>

              <div className="mb-24">
                <label htmlFor="current-password" className="form-label mb-8 h6">
                  Current Password
                </label>
                <div className="position-relative">
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    className="form-control py-11 ps-40"
                    id="current-password"
                    placeholder="Enter Current Password"
                    defaultValue="password"
                  />
                  <span
                    className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph ${passwordShown ? 'ph-eye' : 'ph-eye-slash'
                      }`}
                    onClick={togglePasswordVisibility}
                  ></span>
                  <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                    <i className="ph ph-lock"></i>
                  </span>
                </div>
              </div>

              <div className="mb-32 flex-between flex-wrap gap-8">
                <div className="form-check mb-0 flex-shrink-0">
                  <input
                    className="form-check-input flex-shrink-0 rounded-4"
                    type="checkbox"
                    id="remember"
                  />
                  <label className="form-check-label text-15 flex-grow-1" htmlFor="remember">
                    Remember Me
                  </label>
                </div>
                <a
                  href="forgot-password.html"
                  className="text-main-600 hover-text-decoration-underline text-15 fw-medium"
                >
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="btn btn-main rounded-pill w-100">
                Sign In
              </button>
              <p className="mt-32 text-gray-600 text-center">
                New on our platform?{' '}
                <a
                  href="sign-up.html"
                  className="text-main-600 hover-text-decoration-underline"
                >
                  Create an account
                </a>
              </p>

              <div className="divider my-32 position-relative text-center">
                <span className="divider__text text-gray-600 text-13 fw-medium px-26 bg-white">
                  or
                </span>
              </div>
              <ul className="flex-align gap-10 flex-wrap justify-content-center">
                <li>
                  <a
                    href="https://www.facebook.com"
                    className="w-38 h-38 flex-center rounded-6 text-facebook-600 bg-facebook-50 hover-bg-facebook-600 hover-text-white text-lg"
                  >
                    <i className="ph ph-facebook-logo"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com"
                    className="w-38 h-38 flex-center rounded-6 text-twitter-600 bg-twitter-50 hover-bg-twitter-600 hover-text-white text-lg"
                  >
                    <i className="ph ph-twitter-logo"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com"
                    className="w-38 h-38 flex-center rounded-6 text-google-600 bg-google-50 hover-bg-google-600 hover-text-white text-lg"
                  >
                    <i className="ph ph-google-logo"></i>
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
