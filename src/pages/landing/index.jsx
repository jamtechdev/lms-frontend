import React from "react";
import kids from "../../assets/images/about-section.gif";
import animated2 from "../../assets/images/animated2.gif";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";

function Landing() {
  return (
    <>
      <div className="container-fluid bg-theme">
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
          <div className="col-lg-6 text-center text-lg-right"></div>
        </div>
      </div>

      <div className="container-fluid py-2">
        <nav className="navbar navbar-expand-lg bg-white justify-content-between navbar-light py-0 px-0 py-lg-0 px-lg-3">
          <Link to="/" className="navbar-brand ml-lg-3">
            <h1 className="m-0 text-uppercase text-primary">
              <img width="150" src={logo} />
            </h1>
          </Link>
          <Link to="/login" className="dashboard-button">
            Join Us
          </Link>
        </nav>
      </div>

      <div
        className="jumbotron jumbotron-fluid position-relative overlay-bottom"
        style={{ minHeight: "820px" }}
      >
        <div className="container text-center my-5 py-5 py-lg-5 my-lg-5">
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
            <div className="col-lg-12">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-primary text-uppercase pb-2">
                  About Us
                </h6>
                <h1 className="display-4">
                  First Choice For Online Learning Anywhere
                </h1>
              </div>
            </div>
            <div className="col-lg-5 mb-5 mb-lg-0">
              <div className="position-relative h-100">
                <img className="w-100 h-100 object-fit-contain" src={kids} />
              </div>
            </div>
            <div className="col-lg-7">
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
            </div>
            <div className="col-lg-12">
              <div className="row pt-3 mx-0">
                <div className="col-lg-3 col-6 px-0">
                  <div className="p-lg-2 p-1">
                    <div className="bg-success text-center p-4">
                      <h2 className="text-white" data-toggle="counter-up">
                        4
                      </h2>
                      <h6 className="text-uppercase text-white font-weight-semi-bold">
                        Available<span className="d-block">Subjects</span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 px-0">
                  <div className="p-lg-2 p-1">
                    <div className="bg-primary text-center p-4">
                      <h2 className="text-white" data-toggle="counter-up">
                        2
                      </h2>
                      <h6 className="text-uppercase text-white font-weight-semi-bold">
                        Education<span className="d-block">Types</span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 px-0">
                  <div className="p-lg-2 p-1">
                    <div className="bg-secondary text-center p-4">
                      <h2 className="text-white" data-toggle="counter-up">
                        8
                      </h2>
                      <h6 className="text-uppercase text-white font-weight-semi-bold">
                        Questions<span className="d-block">Types</span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 px-0">
                  <div className="p-lg-2 p-1">
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
      </div>

      <div
        className="container-fluid bg-image"
        style={{ margin: "90px 0", marginBottom: "0px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 my-5 pt-5 pb-lg-5">
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
              <div className="row g-3">
                <div className="col-lg-4 col-12">
                  <div className="d-flex flex-column">
                    <div className="btn-icon bg-primary mb-4">
                      <i className="fa fa-2x fa-graduation-cap text-white"></i>
                    </div>
                    <div className="mt-n1">
                      <h4>Progress Tracking</h4>
                      <p>
                        Kids stay motivated with visual progress bars,
                        milestones, and achievement gems. Every accomplishment
                        is celebrated, building confidence along the way.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <div className="d-flex flex-column">
                    <div className="btn-icon bg-secondary mb-4">
                      <i className="fa fa-2x fa-certificate text-white"></i>
                    </div>
                    <div className="mt-n1">
                      <h4>Stay Connected</h4>
                      <p>
                        Parents can easily track their child’s learning journey
                        in real-time. Stay informed, offer support, and
                        celebrate success together.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <div className="d-flex flex-column">
                    <div className="btn-icon bg-warning mb-4">
                      <i className="fa fa-2x fa-book-reader text-white"></i>
                    </div>
                    <div className="mt-n1">
                      <h4>Learn Anywhere, Safely</h4>
                      <p className="m-0">
                        Access lessons on mobile, tablet, or desktop—whenever it
                        fits your day. Safe, private, and built for every child
                        to thrive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <h6 className="d-inline-block position-relative text-primary text-uppercase pb-2 font-weight-semi-bold">
                Need Help?
              </h6>
              <div className="bg-light d-flex flex-column justify-content-center p-4">
                <div className="d-flex align-items-center mb-5">
                  <div className="btn-icon bg-primary mr-4">
                    <i className="fa fa-2x fa-map-marker-alt text-white"></i>
                  </div>
                  <div className="mt-n1">
                    <h4>Our Location</h4>
                    <p className="m-0 text-black">123 Street, New York, USA</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-5">
                  <div className="btn-icon bg-secondary mr-4">
                    <i className="fa fa-2x fa-phone-alt text-white"></i>
                  </div>
                  <div className="mt-n1">
                    <h4>Call Us</h4>
                    <p className="m-0 text-black">+012 345 6789</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="btn-icon bg-warning mr-4">
                    <i className="fa fa-2x fa-envelope text-white"></i>
                  </div>
                  <div className="mt-n1">
                    <h4>Email Us</h4>
                    <p className="m-0 text-black">info@qtnvault.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <img src={animated2} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid position-relative overlay-top bg-theme-light text-black-50 py-5 mt-50">
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-md-5 mb-5">
              <Link to="#" className="navbar-brand">
                <h1 className="mt-n2 text-uppercase">
                  <img width="200" src={logo} />
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

            <div className="col-md-4 mb-5">
              <h3 className="text-black mb-4">Get In Touch</h3>
              <p>
                <i className="fa fa-map-marker-alt mr-2"></i>123 Street, New
                York, USA
              </p>
              <p>
                <i className="fa fa-phone-alt mr-2"></i>+012 345 67890
              </p>
              <p>
                <i className="fa fa-envelope mr-2"></i>info@qtnvault.com
              </p>
            </div>

            <div className="col-md-3 mb-5">
              <h3 className="text-black mb-4">Quick Links</h3>
              <div className="d-flex flex-column justify-content-start">
                <Link to="#" className="text-black-50 mb-2">
                  <i className="fa fa-angle-right mr-2"></i>Privacy Policy
                </Link>
                <Link to="#" className="text-black-50 mb-2">
                  <i className="fa fa-angle-right mr-2"></i>Terms & Condition
                </Link>
                <Link to="#" className="text-black-50 mb-2">
                  <i className="fa fa-angle-right mr-2"></i>Regular FAQs
                </Link>
                <Link to="#" className="text-black-50 mb-2">
                  <i className="fa fa-angle-right mr-2"></i>Help & Support
                </Link>
                <Link to="#" className="text-black-50">
                  <i className="fa fa-angle-right mr-2"></i>Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-theme text-white-50 border-top py-4">
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
              <div className="d-flex justify-content-lg-end justify-content-center mt-0">
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
    </>
  );
}

export default Landing;
