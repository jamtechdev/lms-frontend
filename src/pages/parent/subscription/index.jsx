import { Link } from "react-router-dom";

const Subscription = () => {
  return (
    <>
      <div>
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4 mb-0">
            <li>
              <Link
                to="/"
                className="text-gray-200 fw-normal text-15 hover-text-main-600"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">
                Pricing Plan
              </span>
            </li>
          </ul>
        </div>

        <div className="card mt-24">
          <div className="card-header border-bottom">
            <h2 className="mb-0">Pricing Breakdown</h2>
            <p className="text-gray-600 text-15">
              Creating a detailed pricing plan for your course requries
              considering various factors.
            </p>
          </div>
          <div className="card-body">
            <div className="row gy-4">
              <div className="col-md-4 col-sm-6">
                <div className="plan-item rounded-16 border border-gray-100 transition-2 position-relative">
                  <span className="text-2xl d-flex mb-16 text-main-600">
                    <i className="ph ph-package"></i>
                  </span>
                  <h3 className="mb-4">Basic Plan</h3>
                  <span className="text-gray-600">
                    Perfect plan for students
                  </span>
                  <h2 className="h1 fw-medium text-main mb-32 mt-16 pb-32 border-bottom border-gray-100 d-flex gap-4">
                    $50 <span className="text-md text-gray-600">/year</span>
                  </h2>
                  <ul>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Intro video the course
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Interactive quizes
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Course curriculum
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Community supports
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Certificate of completion
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Sample lesson showcasing
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Access to course community
                    </li>
                  </ul>
                  <Link
                    to="#"
                    className="dashboard-button"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="plan-item rounded-16 border border-gray-100 transition-2 position-relative active">
                  <span className="plan-badge py-4 px-16 bg-main-600 text-white position-absolute inset-inline-end-0 inset-block-start-0 mt-8 text-15">
                    Recommended
                  </span>
                  <span className="text-2xl d-flex mb-16 text-main-600">
                    <i className="ph ph-planet"></i>
                  </span>
                  <h3 className="mb-4">Standard Plan</h3>
                  <span className="text-gray-600">
                    For users who want to do more
                  </span>
                  <h2 className="h1 fw-medium text-main mb-32 mt-16 pb-32 border-bottom border-gray-100 d-flex gap-4">
                    $129 <span className="text-md text-gray-600">/year</span>
                  </h2>

                  <ul>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Intro video the course
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Interactive quizes
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Course curriculum
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Community supports
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Certificate of completion
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Sample lesson showcasing
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Access to course community
                    </li>
                  </ul>
                  <Link
                    to="#"
                    className="dashboard-button"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="plan-item rounded-16 border border-gray-100 transition-2 position-relative">
                  <span className="text-2xl d-flex mb-16 text-main-600">
                    <i className="ph ph-trophy"></i>
                  </span>
                  <h3 className="mb-4">Premium Plan</h3>
                  <span className="text-gray-600">
                    Your entire friends in one place
                  </span>
                  <h2 className="h1 fw-medium text-main mb-32 mt-16 pb-32 border-bottom border-gray-100 d-flex gap-4">
                    $280 <span className="text-md text-gray-600">/year</span>
                  </h2>

                  <ul>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Intro video the course
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Interactive quizes
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Course curriculum
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Community supports
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Certificate of completion
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4 mb-20">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Sample lesson showcasing
                    </li>
                    <li className="flex-align gap-8 text-gray-600 mb-lg-4">
                      <span className="text-24 d-flex text-main-600">
                        <i className="ph ph-check-circle"></i>
                      </span>
                      Access to course community
                    </li>
                  </ul>
                  <Link
                    to="#"
                    className="dashboard-button"
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label mb-8 h6 mt-32 fontBold">
                  Terms & Policy
                </label>

                <ul className="list-inside mt-3">
                  <li className="text-gray-600 mb-2">
                    1. Set up multiple pricing levels with different features
                    and functionalities to maximize revenue
                  </li>
                  <li className="text-gray-600 mb-2">
                    2. Continuously test different price points and discounts to
                    find the sweet spot that resonates with your target audience
                  </li>
                  <li className="text-gray-600 mb-2">
                    3. Price your course based on the perceived value it
                    provides to students, considering factors
                  </li>
                </ul>

                {/* <button
                  type="button"
                  className="btn btn-primary text-sm btn-sm px-24 rounded-pill py-12 d-flex align-items-center gap-2 mt-24"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="ph ph-plus me-4"></i>
                  Add New Plan
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Subscription;
