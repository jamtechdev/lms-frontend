import React from "react";
import kids from "../../assets/images/kids.png";
import study from "../../assets/images/study.png";
import animated2 from "../../assets/images/animated2.gif";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row py-2 px-lg-5">
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center text-white">
              <small>
                <i className="fa fa-phone-alt mr-2"></i>+012 QTN 6789
              </small>
              <small className="px-3">|</small>
              <small>
                <i className="fa fa-envelope mr-2"></i>QTN@gmail.com
              </small>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            {/* <div className="d-inline-flex align-items-center">
              <Link className="text-white px-2" to="https://www.facebook.com/">
                <i className="fab fa-facebook-f"></i>
            </Link>
              <a className="text-white px-2" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-white px-2" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-white px-2" href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="text-white pl-2" href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </div> */}
          </div>
        </div>
      </div>

      <div className="container-fluid p-3">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
          <Link to="/" className="navbar-brand ml-lg-3">
            <h1 className="m-0 text-uppercase text-primary">
              <i className="fa fa-book-reader mr-3"></i>QTN Vault
            </h1>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between px-lg-3"
            id="navbarCollapse"
          >
            <div className="navbar-nav mx-auto py-0">
              {/* <Link to="/" className="nav-item nav-link active">
                Home
              </Link>
              <Link to="#" className="nav-item nav-link">
                About
              </Link>
              <Link to="#" className="nav-item nav-link">
                Courses
              </Link>
              <Link to="#" className="nav-item nav-link">
                Contact
              </Link> */}
            </div>
            <Link
              to="/login"
              className="btn btn-primary py-2 px-4 d-none d-lg-block"
            >
              Join Us
            </Link>
          </div>
        </nav>
      </div>

      <div
        className="jumbotron jumbotron-fluid position-relative overlay-bottom"
        style={{ minHeight: "820px" }}
      >
        <div className="container text-center my-5 py-5">
          <h1 className="text-white display-1 mb-5">Learn from Home</h1>
          <h1 className="text-white mt-4 mb-4">
            Interactive learning for kids with fun lessons, progress tracking,
            and parent tools.
          </h1>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-5 mb-5 mb-lg-0" style={{ height: "500px" }}>
              <div className="position-relative h-100">
                <img className="position-absolute w-100 h-100 object-fit-contain" src={kids} />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-primary text-uppercase pb-2">
                  About Us
                </h6>
                <h1 className="display-4">
                  First Choice For Online Learning Anywhere
                </h1>
              </div>
              <p>
                QTN Vault is an engaging online learning platform thoughtfully
                designed for children. It features a kid-friendly interface with
                large icons and playful visuals, making navigation easy and
                enjoyable. Lessons come to life through interactive activities
                such as multiple-choice questions, true/false, rearranging,
                linking, underlining the correct answer, editing, comprehension,
                and grammar cloze exercises—keeping kids motivated and curious.
                Built-in progress tracking includes visual indicators,
                milestones, and achievement badges to celebrate every step of
                the learning journey. Parents can monitor progress and provide
                support through dedicated dashboards. The platform is fully
                compatible with mobile, tablet, and desktop devices, ensuring
                flexible access anytime, anywhere. With strong privacy
                protections and accessibility features, Learn from Home is a
                safe, inclusive space where every child can thrive.
              </p>
              <div className="row pt-3 mx-0">
                <div className="col-3 px-0">
                  <div className="bg-success text-center p-4">
                    <h2 className="text-white" data-toggle="counter-up">
                      4
                    </h2>
                    <h6 className="text-uppercase text-white font-weight-semi-bold">
                      Available<span className="d-block">Subjects</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-primary text-center p-4">
                    <h2 className="text-white" data-toggle="counter-up">
                      2
                    </h2>
                    <h6 className="text-uppercase text-white font-weight-semi-bold">
                      Education<span className="d-block">Types</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-secondary text-center p-4">
                    <h2 className="text-white" data-toggle="counter-up">
                      8
                    </h2>
                    <h6 className="text-uppercase text-white font-weight-semi-bold">
                      Questions<span className="d-block">Types</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-warning text-center p-4">
                    <h2 className="text-white" data-toggle="counter-up">
                      295
                    </h2>
                    <h6 className="text-uppercase text-white font-weight-semi-bold">
                      Happy<span className="d-block">Kids</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid bg-image"
        style={{ margin: "90px 0", marginBottom: "0px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7 my-5 pt-5 pb-lg-5">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-primary text-uppercase pb-2">
                  Why Choose Us?
                </h6>
                <h1 className="display-4">
                  Why You Should Start Learning with Us?
                </h1>
              </div>
              <p className="mb-4 pb-2">
                Because learning should feel like an adventure! At Learn from
                Home, we turn everyday lessons into exciting journeys with
                colorful visuals, playful designs, and easy-to-use navigation
                made just for kids. Our interactive activities—like
                drag-and-drop, true or false, editing games, comprehension
                challenges, and grammar puzzles—keep children curious and coming
                back for more. Every step forward is celebrated with progress
                bars, achievement badges, and fun milestones that make learning
                feel like a game. Parents can stay connected and supportive
                through dedicated dashboards, while kids enjoy safe, flexible
                learning on any device—phone, tablet, or computer. With strong
                privacy protections and inclusive features, Learn from Home
                isn’t just a platform—it’s a place where confidence grows,
                creativity thrives, and every child shines.
              </p>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-primary mr-4">
                  <i className="fa fa-2x fa-graduation-cap text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Progress Tracking</h4>
                  <p>
                    Kids stay motivated with visual progress bars, milestones,
                    and achievement gems. Every accomplishment is celebrated,
                    building confidence along the way.
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-secondary mr-4">
                  <i className="fa fa-2x fa-certificate text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Stay Connected</h4>
                  <p>
                    Parents can easily track their child’s learning journey in
                    real-time. Stay informed, offer support, and celebrate
                    success together.
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="btn-icon bg-warning mr-4">
                  <i className="fa fa-2x fa-book-reader text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Learn Anywhere, Safely</h4>
                  <p className="m-0">
                    Access lessons on mobile, tablet, or desktop—whenever it
                    fits your day. Safe, private, and built for every child to
                    thrive.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5" style={{ height: "500px" }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100 object-fit-contain"
                  src={study}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 lightBg">
        <div className="container py-5">

          <div className="row align-items-center">

            <div className="col-lg-5 mb-5 mb-lg-0">
              <h6 className="d-inline-block position-relative text-primary text-uppercase pb-2 font-weight-semi-bold">
                Need Help?
              </h6>
              <div
                className="bg-light d-flex flex-column justify-content-center px-5"
                style={{ height: "450px" }}
              >
                <div className="d-flex align-items-center mb-5">
                  <div className="btn-icon bg-primary mr-4">
                    <i className="fa fa-2x fa-map-marker-alt text-white"></i>
                  </div>
                  <div className="mt-n1">
                    <h4>Our Location</h4>
                    <p className="m-0">123 Street, New York, USA</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-5">
                  <div className="btn-icon bg-secondary mr-4">
                    <i className="fa fa-2x fa-phone-alt text-white"></i>
                  </div>
                  <div className="mt-n1">
                    <h4>Call Us</h4>
                    <p className="m-0">+012 345 6789</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="btn-icon bg-warning mr-4">
                    <i className="fa fa-2x fa-envelope text-white"></i>
                  </div>
                  <div className="mt-n1">
                    <h4>Email Us</h4>
                    <p className="m-0">info@example.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="section-title position-relative mb-4">
                <h2 className="display-4">Send Us A Message</h2>
                <img src={animated2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid position-relative overlay-top bg-dark text-white-50 py-5 mt-50">
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-md-5 mb-5">
              <Link to="#" className="navbar-brand">
                <h1 className="mt-n2 text-uppercase text-white">
                  <i className="fa fa-book-reader mr-3"></i>QTN Vault
                </h1>
              </Link>
              <p className="m-0">
                Learning at Learn from Home isn’t just about lessons—it’s about
                adventure, progress, and connection. Kids explore at their own
                pace with fun activities and earn gems as they grow. Parents
                stay effortlessly in the loop with smart dashboards. Safe,
                flexible, and built for today’s young learners—anytime,
                anywhere.
              </p>
            </div>
            {/* <div className="col-md-6 mb-5">
              <h3 className="text-white mb-4">Newsletter</h3>
              <div className="w-100">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-light"
                    style={{ padding: "30px" }}
                    placeholder="Your Email Address"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary px-4">Sign Up</button>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="col-md-4 mb-5">
              <h3 className="text-white mb-4">Get In Touch</h3>
              <p>
                <i className="fa fa-map-marker-alt mr-2"></i>123 Street, New
                York, USA
              </p>
              <p>
                <i className="fa fa-phone-alt mr-2"></i>+012 345 67890
              </p>
              <p>
                <i className="fa fa-envelope mr-2"></i>info@example.com
              </p>
              
            </div>

            <div className="col-md-3 mb-5">
              <h3 className="text-white mb-4">Quick Links</h3>
              <div className="d-flex flex-column justify-content-start">
                <Link to="#" className="text-white-50 mb-2">
                  <i className="fa fa-angle-right mr-2"></i>Privacy Policy
                </Link>
                <Link to="#" className="text-white-50 mb-2">
                  <i className="fa fa-angle-right mr-2"></i>Terms & Condition
                </Link>
                <Link to="#" className="text-white-50 mb-2">
                  <i className="fa fa-angle-right mr-2"></i>Regular FAQs
                </Link>
                <Link to="#" className="text-white-50 mb-2">
                  <i className="fa fa-angle-right mr-2"></i>Help & Support
                </Link>
                <Link to="#" className="text-white-50">
                  <i className="fa fa-angle-right mr-2"></i>Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-white-50 border-top py-4">
        <div className="container px-0">
          <div className="row">
            <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
              <p className="m-0">
                Copyright &copy;{" "}
                <Link to="#" className="text-white">
                  QTN Vault
                </Link>
                . All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-right">
              <div className="d-flex justify-content-end mt-0">
                <Link to="https://x.com" className="text-white mr-4">
                  <i className="fab fa-1x fa-twitter"></i>
                </Link>
                <Link to="https://www.facebook.com" className="text-white mr-4">
                  <i className="fab fa-1x fa-facebook-f"></i>
                </Link>
                <Link to="https://in.linkedin.com" className="text-white mr-4">
                  <i className="fab fa-1x fa-linkedin-in"></i>
                </Link>
                <Link to="https://www.instagram.com" className="text-white">
                  <i className="fab fa-1x fa-instagram"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Link
        to="/"
        className="btn btn-lg btn-primary rounded-0 btn-lg-square back-to-top"
      >
        <i className="fa fa-angle-double-up"></i>
      </Link> */}
    </>
  );
}

export default Landing;
