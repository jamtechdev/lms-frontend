import React from "react";
import logo from "../../assets/images/logo/logo.png";
import about from "../../assets/images/about.jpg";
import feature from "../../assets/images/feature.jpg";
import landimg from "../../assets/images/auth-img3.png";
import { Link } from "react-router-dom";

function Landing() {
    return <>


        <div className="container-fluid bg-dark">
            <div className="row py-2 px-lg-5">
                <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
                    <div className="d-inline-flex align-items-center text-white">
                        <small><i className="fa fa-phone-alt mr-2"></i>+012 345 6789</small>
                        <small className="px-3">|</small>
                        <small><i className="fa fa-envelope mr-2"></i>info@example.com</small>
                    </div>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                        <a className="text-white px-2" href="#">
                            <i className="fab fa-facebook-f"></i>
                        </a>
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
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
                <Link to="/" className="navbar-brand ml-lg-3">
                    <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-book-reader mr-3"></i>Edukate</h1>
                </Link>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                    <div className="navbar-nav mx-auto py-0">
                        <Link to="/" className="nav-item nav-link active">Home</Link>
                        <Link to="#" className="nav-item nav-link">About</Link>
                        <Link to="#" className="nav-item nav-link">Courses</Link>
                        <Link to='#' className="nav-item nav-link">Contact</Link>
                    </div>
                    <Link to="/login" className="btn btn-primary py-2 px-4 d-none d-lg-block">Join Us</Link>
                </div>
            </nav>
        </div>

        <div className="jumbotron jumbotron-fluid position-relative overlay-bottom" style={{ minHeight: '649px' }}>
            <div className="container text-center my-5 py-5">
                <h1 className="text-white mt-4 mb-4">Learn From Home</h1>
                <h1 className="text-white display-1 mb-5">Education Courses</h1>
                {/* <div className="mx-auto mb-5" style={{ width: '100%', maxWidth: '600px' }}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-light bg-white text-body px-4 dropdown-toggle" type="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">Courses</button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Courses 1</a>
                            <a className="dropdown-item" href="#">Courses 2</a>
                            <a className="dropdown-item" href="#">Courses 3</a>
                        </div>
                    </div>
                    <input type="text" className="form-control border-light" placeholder="Keyword" style={{ padding: '30px 25px' }}/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary px-4 px-lg-5">Search</button>
                    </div>
                </div>
            </div> */}
            </div>
        </div>

        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-5 mb-5 mb-lg-0" style={{ height: '500px' }}>
                        <div className="position-relative h-100">
                            <img className="position-absolute w-100 h-100" src={about} />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="section-title position-relative mb-4">
                            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">About Us</h6>
                            <h1 className="display-4">First Choice For Online Education Anywhere</h1>
                        </div>
                        <p>Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor consetetur takimata eirmod, dolores takimata consetetur invidunt magna dolores aliquyam dolores dolore. Amet erat amet et magna</p>
                        <div className="row pt-3 mx-0">
                            <div className="col-3 px-0">
                                <div className="bg-success text-center p-4">
                                    <h1 className="text-white" data-toggle="counter-up">123</h1>
                                    <h6 className="text-uppercase text-white">Available<span className="d-block">Subjects</span></h6>
                                </div>
                            </div>
                            <div className="col-3 px-0">
                                <div className="bg-primary text-center p-4">
                                    <h1 className="text-white" data-toggle="counter-up">1234</h1>
                                    <h6 className="text-uppercase text-white">Online<span className="d-block">Courses</span></h6>
                                </div>
                            </div>
                            <div className="col-3 px-0">
                                <div className="bg-secondary text-center p-4">
                                    <h1 className="text-white" data-toggle="counter-up">123</h1>
                                    <h6 className="text-uppercase text-white">Skilled<span className="d-block">Instructors</span></h6>
                                </div>
                            </div>
                            <div className="col-3 px-0">
                                <div className="bg-warning text-center p-4">
                                    <h1 className="text-white" data-toggle="counter-up">1234</h1>
                                    <h6 className="text-uppercase text-white">Happy<span className="d-block">Students</span></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid bg-image" style={{ margin: '90px 0', marginBottom: '0px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 my-5 pt-5 pb-lg-5">
                        <div className="section-title position-relative mb-4">
                            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Why Choose Us?</h6>
                            <h1 className="display-4">Why You Should Start Learning with Us?</h1>
                        </div>
                        <p className="mb-4 pb-2">Aliquyam accusam clita nonumy ipsum sit sea clita ipsum clita, ipsum dolores amet voluptua duo dolores et sit ipsum rebum, sadipscing et erat eirmod diam kasd labore clita est. Diam sanctus gubergren sit rebum clita amet.</p>
                        <div className="d-flex mb-3">
                            <div className="btn-icon bg-primary mr-4">
                                <i className="fa fa-2x fa-graduation-cap text-white"></i>
                            </div>
                            <div className="mt-n1">
                                <h4>Skilled Instructors</h4>
                                <p>Labore rebum duo est Sit dolore eos sit tempor eos stet, vero vero clita magna kasd no nonumy et eos dolor magna ipsum.</p>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="btn-icon bg-secondary mr-4">
                                <i className="fa fa-2x fa-certificate text-white"></i>
                            </div>
                            <div className="mt-n1">
                                <h4>International Certificate</h4>
                                <p>Labore rebum duo est Sit dolore eos sit tempor eos stet, vero vero clita magna kasd no nonumy et eos dolor magna ipsum.</p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="btn-icon bg-warning mr-4">
                                <i className="fa fa-2x fa-book-reader text-white"></i>
                            </div>
                            <div className="mt-n1">
                                <h4>Online classNamees</h4>
                                <p className="m-0">Labore rebum duo est Sit dolore eos sit tempor eos stet, vero vero clita magna kasd no nonumy et eos dolor magna ipsum.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5" style={{ height: '500px' }}>
                        <div className="position-relative h-100">
                            <img className="position-absolute w-100 h-100 coverImage" src={feature} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid py-5 lightBg">
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-5 mb-5 mb-lg-0">
                        <div className="bg-light d-flex flex-column justify-content-center px-5" style={{ height: '450px' }}>
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
                            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">Need Help?</h6>
                            <h1 className="display-4">Send Us A Message</h1>
                        </div>
                        <div className="contact-form">
                            <form>
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <input type="text" className="form-control border-top-0 border-right-0 border-left-0 p-0" placeholder="Your Name" required="required" />
                                    </div>
                                    <div className="col-6 form-group">
                                        <input type="email" className="form-control border-top-0 border-right-0 border-left-0 p-0" placeholder="Your Email" required="required" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control border-top-0 border-right-0 border-left-0 p-0" placeholder="Subject" required="required" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control border-top-0 border-right-0 border-left-0 p-0" rows="5" placeholder="Message" required="required"></textarea>
                                </div>
                                <div>
                                    <button className="btn btn-primary py-3 px-5" type="submit">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid position-relative overlay-top bg-dark text-white-50 py-5 mt-90">
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-6 mb-5">
                        <Link to="#" className="navbar-brand">
                            <h1 className="mt-n2 text-uppercase text-white"><i className="fa fa-book-reader mr-3"></i>Edukate</h1>
                        </Link>
                        <p className="m-0">Accusam nonumy clita sed rebum kasd eirmod elitr. Ipsum ea lorem at et diam est, tempor rebum ipsum sit ea tempor stet et consetetur dolores. Justo stet diam ipsum lorem vero clita diam</p>
                    </div>
                    <div className="col-md-6 mb-5">
                        <h3 className="text-white mb-4">Newsletter</h3>
                        <div className="w-100">
                            <div className="input-group">
                                <input type="text" className="form-control border-light" style={{ padding: '30px' }} placeholder="Your Email Address" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary px-4">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-5">
                        <h3 className="text-white mb-4">Get In Touch</h3>
                        <p><i className="fa fa-map-marker-alt mr-2"></i>123 Street, New York, USA</p>
                        <p><i className="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                        <p><i className="fa fa-envelope mr-2"></i>info@example.com</p>
                        <div className="d-flex justify-content-start mt-4">
                            <Link to="#" className="text-white mr-4">
                                <i className="fab fa-2x fa-twitter"></i>
                            </Link>
                            <Link to="#" className="text-white mr-4">
                                <i className="fab fa-2x fa-facebook-f"></i>
                            </Link>
                            <Link to="#" className="text-white mr-4">
                                <i className="fab fa-2x fa-linkedin-in"></i>
                            </Link>
                            <Link to="#" className="text-white">
                                <i className="fab fa-2x fa-instagram"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <h3 className="text-white mb-4">Our Courses</h3>
                        <div className="d-flex flex-column justify-content-start">
                            <Link to="#" className="text-white-50 mb-2">
                                <i className="fa fa-angle-right mr-2"></i>Web Design
                            </Link>
                            <Link to="#" className="text-white-50 mb-2">
                                <i className="fa fa-angle-right mr-2"></i>Apps Design
                            </Link>
                            <Link to="#" className="text-white-50 mb-2">
                                <i className="fa fa-angle-right mr-2"></i>Marketing
                            </Link>
                            <Link to="#" className="text-white-50 mb-2">
                                <i className="fa fa-angle-right mr-2"></i>Research
                            </Link>
                            <Link to="#" className="text-white-50">
                                <i className="fa fa-angle-right mr-2"></i>SEO
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
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
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                        <p className="m-0">Copyright &copy; <Link to="#" className="text-white">Your Site Name</Link>. All Rights Reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-right">
                        <p className="m-0">Designed by <Link to="#" className="text-white">HTML Codex</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <Link to="#" className="btn btn-lg btn-primary rounded-0 btn-lg-square back-to-top">
            <i className="fa fa-angle-double-up"></i>
        </Link>
    </>;
}

export default Landing;
