import React from "react";
import logo from "../../assets/images/logo/logo.png";
import landimg from "../../assets/images/auth-img3.png";

function Landing() {
  return (
    <div className="landing-page">
      <nav className="landing-navbar">
        <a href="/" className="landing-logo">
          <img
            src={logo}
            alt="LMS"
            style={{ maxWidth: "150px", height: "auto" }}
          />
        </a>
        <ul className="landing-menu-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#features">About</a>
          </li>
          <li>
            <a href="#footer">Contact</a>
          </li>
        </ul>
        <div className="landing-auth-links">
          <a href="/login" className="btn btn-primary">
            Login
          </a>
        </div>
      </nav>

      <header className="landing-hero-section">
        <div className="landing-hero-text">
          <h1>Empower Learning for Kids</h1>
          <p>
            Fun, engaging, and interactive learning for young minds. Our
            platform offers personalized courses, progress tracking, and
            interactive lessons designed for kids.
          </p>
          <a href="/login" className="btn btn-primary large">
            Get Started
          </a>
        </div>
        <div className="landing-hero-image">
          <img src={landimg} alt="E-learning for kids" />
        </div>
      </header>

      <section id="features" className="landing-features">
        <div className="feature">
          <h3>Interactive Lessons</h3>
          <p>
            Engage your child with MCQs, quizzes, fill-in-the-blanks, and fun
            activities.
          </p>
        </div>
        <div className="feature">
          <h3>Parental Monitoring</h3>
          <p>
            Track your child's progress and customize their learning journey.
          </p>
        </div>
        <div className="feature">
          <h3>Safe & Secure</h3>
          <p>Our platform ensures a safe environment for kids learning.</p>
        </div>
        <div className="feature">
          <h3>Gem Rewards</h3>
          <p>
            Motivate learning with gem rewards for completing lessons and
            challenges.
          </p>
        </div>
      </section>

      <section className="landing-cta">
        <h2>Ready to Transform Learning?</h2>
        <p>
          Join thousands of parents and educators making learning fun and
          effective.
        </p>
        <a href="/signup" className="btn btn-primary large">
          Sign Up Now
        </a>
      </section>
      <footer id="footer" className="landing-footer">
        <p>© 2025 LMS. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
