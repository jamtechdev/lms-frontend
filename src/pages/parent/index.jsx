import graph from "../../assets/images/graph1.png";
import star from "../../assets/images/star-shape.png";

export default function ParentDashboard() {
  return (
    <>
      <div className="dashboard-body">
        <div className="row gy-4">
          <div className="col-xxl-8">
            <div className="card h-100">
              <div className="card-body grettings-box-two position-relative z-1 p-0">
                <div className="row align-items-center h-100">
                  <div className="col-lg-6">
                    <div className="grettings-box-two__content">
                      <h2 className="fw-medium mb-0 flex-align gap-10">
                        Hi,Parent{" "}
                        <img src="/assets/images/icons/wave-hand.png" alt="" />{" "}
                      </h2>
                      <h2 className="fw-medium mb-16">
                        What has your child learned today?
                      </h2>
                      <p className="text-15 text-gray-400">
                        Effortlessly track your child’s progress, view real-time
                        activity, and access daily reports all in one place.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 d-md-block d-none mt-auto">
                    <img src="assets/images/thumbs/gretting-thumb.png" alt="" />
                  </div>
                </div>
                <img
                  src={star}
                  className="position-absolute start-0 top-0 w-100 h-100 z-n1 object-fit-contain"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-xxl-4">
            <div className="row gy-4">
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="flex-between gap-8 mb-24">
                      <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-purple-600 text-white text-2xl">
                        <i className="ph ph-spinner"></i>
                      </span>
                      <img src={graph} className="rounded-circle" />
                    </div>
                    <h4 className="mb-2">25+</h4>
                    <span className="text-gray-300">Child Progress</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="flex-between gap-8 mb-24">
                      <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-warning-600 text-white text-2xl">
                        <i className="ph ph-users-four"></i>
                      </span>
                      <img src={graph} className="rounded-circle" />
                    </div>
                    <h4 className="mb-2">18k+</h4>
                    <span className="text-gray-300">Community Support</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="flex-between gap-8 mb-24">
                      <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-two-600 text-white text-2xl">
                        <i className="ph ph-certificate"></i>
                      </span>
                      <img src={graph} className="rounded-circle" />
                    </div>
                    <h4 className="mb-2">39+</h4>
                    <span className="text-gray-300">Earned Gems</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="flex-between gap-8 mb-24">
                      <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl">
                        <i className="ph ph-graduation-cap"></i>
                      </span>
                      <img src={graph} className="rounded-circle" />
                    </div>
                    <h4 className="mb-2">155+</h4>
                    <span className="text-gray-300">Completed Assignment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
