import React from 'react';
import logo from '../../assets/images/logo/logo.png';
import forgotImage from '../../assets/images/auth-img3.png';
import { Link } from 'react-router-dom';
const ForgotPassword = () => {
  return (
    <div className="auth d-flex">

      <div className="preloader">
        <div className="loader"></div>
      </div>
      <div className="side-overlay"></div>
      <div className="auth-left bg-main-50 flex-center p-24">
        <img src={forgotImage} alt="Auth Visual" />
      </div>
      <div className="auth-right py-40 px-24 flex-center flex-column">
        <div className="auth-right__inner mx-auto w-100">
          <a href="/" className="auth-right__logo">
            <img src={logo} alt="LMS" />
          </a>
          <h2 className="mb-8">Forgot Password?</h2>
          <p className="text-gray-600 text-15 mb-32">
            Lost your password? Please enter your email address. You will receive a link to create a new password via email.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-24">
              <label htmlFor="email" className="form-label mb-8 h6">Email</label>
              <div className="position-relative">
                <input
                  type="email"
                  className="form-control py-11 ps-40"
                  id="email"
                  placeholder="Type your email address"
                />
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-envelope"></i>
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-main rounded-pill w-100">
              Send Reset Link
            </button>
            <Link to="/" className="my-32 text-main-600 flex-align gap-8 justify-content-center">
              <i className="ph ph-arrow-left d-flex"></i> Back To Login
            </Link>
            <ul className="flex-align gap-10 flex-wrap justify-content-center">
              <li>
                <a href="https://www.facebook.com" className="w-38 h-38 flex-center rounded-6 text-facebook-600 bg-facebook-50 hover-bg-facebook-600 hover-text-white text-lg">
                  <i className="ph ph-facebook-logo"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" className="w-38 h-38 flex-center rounded-6 text-twitter-600 bg-twitter-50 hover-bg-twitter-600 hover-text-white text-lg">
                  <i className="ph ph-twitter-logo"></i>
                </a>
              </li>
              <li>
                <a href="https://www.google.com" className="w-38 h-38 flex-center rounded-6 text-google-600 bg-google-50 hover-bg-google-600 hover-text-white text-lg">
                  <i className="ph ph-google-logo"></i>
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
