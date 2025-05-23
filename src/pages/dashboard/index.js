import React from 'react';
import graph from '../../assets/images/graph1.png';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
    return <>
        <div className="preloader">
            <div className="loader"></div>
        </div>
        <div className="side-overlay"></div>
        <div className='flex '>
            <Sidebar />
            <div className="dashboard-main-wrapper">
                <Navbar />
                <div className="dashboard-body">
                    <div className="row gy-4 shadowBox">
                        <div className="col-xxl-12">
                            <div className="row gy-4">
                                <div className="col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-24">
                                                <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                                <img src={graph} className="rounded-circle" />
                                            </div>
                                            <h4 className="mb-2">155+</h4>
                                            <span className="text-gray-300">Completed Courses</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-24">
                                                <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-two-600 text-white text-2xl"><i className="ph ph-graduation-cap"></i></span>
                                                <img src={graph} className="rounded-circle" />
                                            </div>
                                            <h4 className="mb-2">39+</h4>
                                            <span className="text-gray-300">Earned Certificate</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-24">
                                                <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-purple-600 text-white text-2xl"><i className="ph ph-certificate"></i></span>
                                                <img src={graph} className="rounded-circle" />
                                            </div>
                                            <h4 className="mb-2">25+</h4>
                                            <span className="text-gray-300">Course in Progress</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="flex-between gap-8 mb-24">
                                                <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-warning-600 text-white text-2xl"><i className="ph ph-users-four"></i></span>
                                                <img src={graph} className="rounded-circle" />
                                            </div>
                                            <h4 className="mb-2">18k+</h4>
                                            <span className="text-gray-300">Community Support</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-24">
                        <div className="row gy-4">
                            <div className="col-xxl-3 col-sm-6">
                                <div className="card h-100">
                                    <div className="card-header border-bottom border-gray-100 flex-between flex-wrap gap-8">
                                        <h5 className="mb-0">Progress Statistics</h5>
                                        <div className="dropdown flex-shrink-0">
                                            <button className="text-gray-400 text-xl d-flex rounded-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="ph ph-dots-three-outline"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                                                <div className="card border border-gray-100 rounded-12 box-shadow-custom">
                                                    <div className="card-body p-12">
                                                        <div className="max-h-200 overflow-y-auto scroll-sm pe-8">
                                                            <ul>
                                                                <li className="mb-0">
                                                                    <a href="students.html" className="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 w-100 rounded-8 fw-normal text-xs d-block text-start">
                                                                        <span className="text"> <i className="ph ph-user me-4"></i> View</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="">
                                            <span className="text-gray-200 text-lg mb-12 mt-10 d-block text-center">Total activity</span>
                                            <h1 className="text-48 fw-medium mb-12 text-center"> 65.2%</h1>
                                            <div className="flex-between flex-wrap">
                                                <div className="d-flex gap-8 mt-12 flex-column w-50-perc pe-8">
                                                    <div className="progress w-100 bg-main-100 rounded-pill h-4" role="progressbar" aria-label="Basic example" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar bg-main-600 rounded-pill"></div>
                                                    </div>
                                                    <span className="text-neutral-600 flex-shrink-0 text-13 fw-medium">32%</span>
                                                </div>
                                                <div className="d-flex gap-8 mt-12 flex-column w-50-perc ps-8">
                                                    <div className="progress w-100 bg-main-two-100 rounded-pill h-4" role="progressbar" aria-label="Basic example" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar bg-main-two-600 rounded-pill"></div>
                                                    </div>
                                                    <span className="text-neutral-600 flex-shrink-0 text-13 fw-medium">80%</span>
                                                </div>
                                            </div>
                                            <div className="mt-20">
                                                <div className="bg-primary-50 rounded-16 p-12 flex-between flex-wrap gap-8 mb-16">
                                                    <div className="flex-align gap-16">
                                                        <span className="w-48 h-48 rounded-8 flex-center text-xl bg-primary-600 text-white"><i className="ph ph-calendar-dots"></i></span>
                                                        <h2 className="mb-0 fw-medium text-primary-600">25</h2>
                                                    </div>
                                                    <span className="px-16 py-4 rounded-pill bg-white border border-primary-600 text-primary-600 fw-medium">In Progress</span>
                                                </div>
                                                <div className="bg-success-50 rounded-16 p-12 flex-between flex-wrap gap-8 mb-0">
                                                    <div className="flex-align gap-16">
                                                        <span className="w-48 h-48 rounded-8 flex-center text-xl bg-success-600 text-white"><i className="ph ph-calendar-dots"></i></span>
                                                        <h2 className="mb-0 fw-medium text-success-600">12</h2>
                                                    </div>
                                                    <span className="px-16 py-4 rounded-pill bg-white border border-success-600 text-success-600 fw-medium">Completed</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-sm-6">
                                <div className="card h-100">
                                    <div className="card-header border-bottom border-gray-100 flex-between gap-8 flex-wrap">
                                        <h5 className="mb-0">Most Activity</h5>
                                        <div className="dropdown flex-shrink-0">
                                            <button className="text-gray-400 text-xl d-flex rounded-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="ph ph-dots-three-outline"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                                                <div className="card border border-gray-100 rounded-12 box-shadow-custom">
                                                    <div className="card-body p-12">
                                                        <div className="max-h-200 overflow-y-auto scroll-sm pe-8">
                                                            <ul>
                                                                <li className="mb-0">
                                                                    <a href="students.html" className="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 w-100 rounded-8 fw-normal text-xs d-block text-start">
                                                                        <span className="text"> <i className="ph ph-user me-4"></i> View</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex-center mb-20">
                                            <div id="activityDonutChart" className="w-auto d-inline-block"></div>
                                        </div>
                                        <div className="flex-between gap-8 flex-wrap mt-20">
                                            <div className="flex-align flex-column">
                                                <span className="w-12 h-12 bg-white border border-3 border-main-600 rounded-circle"></span>
                                                <span className="text-13 my-4 text-main-600">Mentoring</span>
                                                <h6 className="mb-0">65.2%</h6>
                                            </div>
                                            <div className="flex-align flex-column">
                                                <span className="w-12 h-12 bg-white border border-3 border-main-two-600 rounded-circle"></span>
                                                <span className="text-13 my-4 text-main-two-600">Organization</span>
                                                <h6 className="mb-0">25.0%</h6>
                                            </div>
                                            <div className="flex-align flex-column">
                                                <span className="w-12 h-12 bg-white border border-3 border-danger-600 rounded-circle"></span>
                                                <span className="text-13 my-4 text-danger-600">Planning</span>
                                                <h6 className="mb-0">9.8%</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-footer">
                    <div className="flex-between flex-wrap gap-16">
                        <p className="text-gray-300 text-13 fw-normal"> &copy; Copyright LMS 2025, All Right Reserverd</p>
                        <div className="flex-align flex-wrap gap-16">
                            <a href="#" className="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">License</a>
                            <a href="#" className="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">Documentation</a>
                            <a href="#" className="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
};
export default Dashboard;