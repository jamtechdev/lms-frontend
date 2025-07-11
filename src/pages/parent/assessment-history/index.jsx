import { Link } from "react-router-dom";
import studentImg from "../../../assets/images/student-img1.png";
import ResponsivePagination from "react-responsive-pagination";
const AssessmentHistory = () => {
  return (
    <>
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
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
                Assignments
              </span>
            </li>
          </ul>
        </div>

        {/* <div className="flex-align gap-8 justify-content-start flex-wrap">
            <div className="position-relative text-gray-500 flex-align gap-4 text-13">
              <span className="text-inherit">Sort by: </span>
              <div className="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-20 focus-border-main-600 bg-white">
                <span className="text-lg">
                  <i className="ph ph-funnel-simple"></i>
                </span>
                <select className="form-control ps-8 pe-20 py-16 border-0 text-inherit rounded-4 text-center">
                  <option value="1" selected>
                    Popular
                  </option>
                  <option value="1">Latest</option>
                  <option value="1">Trending</option>
                  <option value="1">Matches</option>
                </select>
              </div>
            </div>
            <div className="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-20 focus-border-main-600 bg-white">
              <span className="text-lg">
                <i className="ph ph-layout"></i>
              </span>
              <select
                className="form-control ps-8 pe-20 py-16 border-0 text-inherit rounded-4 text-center"
                id="exportOptions"
              >
                <option value="" selected disabled>
                  Export
                </option>
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
              </select>
            </div>
          </div> */}
      </div>

      <div className="table-responsive">
         <table id="assignmentTable" className="table table-striped">
        <thead>
          <tr>
            <th className="h6 text-white-300">Students</th>
            <th className="h6 text-white-300">Lesson</th>
            <th className="h6 text-white-300">Deadline</th>
            <th className="h6 text-white-300">Sent</th>
            <th className="h6 text-white-300">Status</th>
            <th className="h6 text-white-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Jane Cooper
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Web & Mobile Design
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Nov 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Nov 18, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-teal-50 text-teal-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-teal-600 rounded-circle flex-shrink-0"></span>
                Send
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Albert Flores
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Graphics Design
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Dec 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Feb 18, 2025
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-warning-50 text-warning-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-warning-600 rounded-circle flex-shrink-0"></span>
                Checking
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Leslie Alexander
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">Figma</span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Feb 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Nov 18, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-purple-50 text-purple-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-purple-600 rounded-circle flex-shrink-0"></span>
                Assigned
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Guy Hawkins
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Creating Web Design
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                June 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                June 21, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-danger-50 text-danger-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-danger-600 rounded-circle flex-shrink-0"></span>
                Decline
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Jacob Jones
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Complete Wordpress Course
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                June 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                July 18, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-green-50 text-green-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-green-600 rounded-circle flex-shrink-0"></span>
                Accepted
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Guy Hawkins
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Webflow Essentials Course
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Aug 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Sep 18, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                Active
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Jacob Jones
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Beginners Guide to Design
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Sep 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Sep 22, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-pink-50 text-pink-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-pink-600 rounded-circle flex-shrink-0"></span>
                Not Submitted
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Albert Flores
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                AngularJS Crash Course{" "}
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Oct 19, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Nov 18, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                Active
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Jenny Wilson
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Complete Wordpress Course
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Sep 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Dec 18, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                Active
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Sunny Maria
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Responsive Web Design
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Nov 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Oct 18, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                Active
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Eleanor Pena
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Theme Development
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Oct 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Dec 20, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                Active
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex-align gap-8 justify-content-start">
                <img
                  src={studentImg}
                  alt=""
                  className="w-40 h-40 rounded-circle"
                />
                <span className="h6 mb-0 fw-medium text-black">
                  Albert Flores
                </span>
              </div>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Complete Python Bootcamp
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Nov 18, 2024
              </span>
            </td>
            <td>
              <span className="h6 mb-0 fw-medium text-black">
                Dec 18, 2024
              </span>
            </td>
            <td>
              <span className="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                <span className="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                Active
              </span>
            </td>
            <td>
              <Link
                to="#"
                className="dashboard-button width-fit mx-auto"
              >
                View More
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className="flex-between flex-wrap">
        <span className="text-gray-900">Showing 1 to 10 of 12 entries</span>
        <ul className="pagination flex-align flex-wrap">
          <li className="page-item active">
            <Link
              className="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium"
              to="#"
            >
              1
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium"
              to="#"
            >
              2
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium"
              to="#"
            >
              3
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium"
              to="#"
            >
              ...
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium"
              to="#"
            >
              8
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium"
              to="#"
            >
              9
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium"
              to="#"
            >
              10
            </Link>
          </li>
        </ul>
      </div>
      
    </>
  );
};
export default AssessmentHistory;
