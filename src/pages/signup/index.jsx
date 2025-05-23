import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.png';
import signupImage from '../../assets/images/auth-img2.png';

const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };
    return (
        <div>
            <div className="preloader">
                <div className="loader"></div>
            </div>
            <div className="side-overlay"></div>
            <section className="auth d-flex">
                <div className="auth-left bg-main-50 flex-center p-24">
                    <img src={signupImage} alt="Auth Visual" />
                </div>
                <div className="auth-right py-40 px-24 flex-center flex-column">
                    <div className="auth-right__inner mx-auto w-100">
                        <Link to="/" className="auth-right__logo">
                            <img alt="LMS" />
                        </Link>
                        <h2 className="mb-8">Sign Up</h2>
                        <p className="text-gray-600 text-15 mb-32">
                            Please sign up to your account and start the adventure
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-24">
                                <label htmlFor="username" className="form-label mb-8 h6">
                                    Username
                                </label>
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control py-11 ps-40"
                                        id="username"
                                        placeholder="Type your username"
                                    />
                                    <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                                        <i className="ph ph-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="mb-24">
                                <label htmlFor="email" className="form-label mb-8 h6">
                                    Email
                                </label>
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
                            <div className="mb-24">
                                <label htmlFor="current-password" className="form-label mb-8 h6">
                                    Current Password
                                </label>
                                <div className="position-relative">
                                    <input
                                        type="password"
                                        className="form-control py-11 ps-40"
                                        id="current-password"
                                        placeholder="Enter Current Password"
                                        defaultValue="password"
                                    />
                                    <span
                                        className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph ph-eye-slash"
                                        id="#current-password"
                                    ></span>
                                    <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                                        <i className="ph ph-lock"></i>
                                    </span>
                                </div>
                                <span className="text-gray-900 text-15 mt-4">
                                    Must be at least 8 characters
                                </span>
                            </div>
                            <div className="mb-32 flex-between flex-wrap gap-8">
                                <Link
                                    to="/forgotpassword"
                                    className="text-main-600 hover-text-decoration-underline text-15 fw-medium"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <button type="submit" className="btn btn-main rounded-pill w-100">
                                Sign Up
                            </button>
                            <p className="mt-32 text-gray-600 text-center">
                                Already have an account?
                                <Link
                                    to="/"
                                    className="text-main-600 hover-text-decoration-underline"
                                >
                                    {' '}
                                    Log In
                                </Link>
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
        </div>
    );
};

export default SignUp;
