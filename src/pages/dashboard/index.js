import React, { useState } from 'react';
import logo from '../../assets/images/logo/logo.png';
import userImage from '../../assets/images/thumbs/user-img.png';
import graph from '../../assets/images/graph1.png';

const Dashboard = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };
    return <>

        <div className="preloader">
            <div className="loader"></div>
        </div>
        <div className="side-overlay"></div>
        <aside className="sidebar">
            <button type="button" className="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"><i className="ph ph-x"></i></button>

            <a href="index.html" className="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 pb-10">
                <img alt="LMS" />
            </a>
            <div className="sidebar-menu-wrapper overflow-y-auto scroll-sm">
                <div className="p-20 pt-10">
                    <ul className="sidebar-menu">
                        <li className="sidebar-menu__item activePage">
                            <a href="javascript:void(0)" className="sidebar-menu__link">
                                <span className="icon"><i className="ph ph-squares-four"></i></span>
                                <span className="text">Dashboard</span>
                            </a>

                        </li>
                        <li className="sidebar-menu__item">
                            <a href="javascript:void(0)" className="sidebar-menu__link">
                                <span className="icon"><i className="ph ph-graduation-cap"></i></span>
                                <span className="text">Courses</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
        <div className="dashboard-main-wrapper">
            <div className="top-navbar flex-between gap-16">

                <div className="flex-align gap-16">

                    <button type="button" className="toggle-btn d-xl-none d-flex text-26 text-gray-500"><i className="ph ph-list"></i></button>


                    <form action="#" className="w-350 d-sm-block d-none">
                        <div className="position-relative">
                            <button type="submit" className="input-icon text-xl d-flex text-gray-100 pointer-event-none"><i className="ph ph-magnifying-glass"></i></button>
                            <input type="text" className="form-control ps-40 h-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15" placeholder="Search..." />
                        </div>
                    </form>
                </div>

                <div className="flex-align gap-16">
                    <div className="flex-align gap-8">
                        <div className="dropdown">
                            <button className="dropdown-btn shaking-animation text-gray-500 w-40 h-40 bg-main-50 hover-bg-main-100 transition-2 rounded-circle text-xl flex-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="position-relative">
                                    <i className="ph ph-bell"></i>
                                    <span className="alarm-notify position-absolute end-0"></span>
                                </span>
                            </button>
                            <div className="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                                <div className="card border border-gray-100 rounded-12 box-shadow-custom p-0 overflow-hidden">
                                    <div className="card-body p-0">
                                        <div className="py-8 px-24 bg-main-600">
                                            <div className="flex-between">
                                                <h5 className="text-xl fw-semibold text-white mb-0">Notifications</h5>
                                                <div className="flex-align gap-12">
                                                    <button type="button" className="bg-white rounded-6 text-sm px-8 py-2 hover-text-primary-600"> New </button>
                                                    <button type="button" className="close-dropdown hover-scale-1 text-xl text-white"><i className="ph ph-x"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-24 max-h-270 overflow-y-auto scroll-sm">
                                            <div className="d-flex align-items-start gap-12">
                                                <img src="assets/images/thumbs/notification-img1.png" alt="" className="w-48 h-48 rounded-circle object-fit-cover" />
                                                <div className="border-bottom border-gray-100 mb-24 pb-24">
                                                    <div className="flex-align gap-4">
                                                        <a href="#" className="fw-medium text-15 mb-0 text-gray-300 hover-text-main-600 text-line-2">Ashwin Bose is requesting access to Design File - Final Project. </a>

                                                        <div className="dropdown flex-shrink-0">
                                                            <button className="text-gray-200 rounded-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="ph ph-dots-three-outline"></i>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                                                                <div className="card border border-gray-100 rounded-12 box-shadow-custom">
                                                                    <div className="card-body p-12">
                                                                        <div className="max-h-200 overflow-y-auto scroll-sm pe-8">
                                                                            <ul>
                                                                                <li className="mb-0">
                                                                                    <a href="#" className="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                        <span className="text">Mark as read</span>
                                                                                    </a>
                                                                                </li>
                                                                                <li className="mb-0">
                                                                                    <a href="#" className="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                        <span className="text">Delete Notification</span>
                                                                                    </a>
                                                                                </li>
                                                                                <li className="mb-0">
                                                                                    <a href="#" className="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                        <span className="text">Report</span>
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-align gap-6 mt-8">
                                                        <img src="assets/images/icons/google-drive.png" alt="" />
                                                        <div className="flex-align gap-4">
                                                            <p className="text-gray-900 text-sm text-line-1">Design brief and ideas.txt</p>
                                                            <span className="text-xs text-gray-200 flex-shrink-0">2.2 MB</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-16 flex-align gap-8">
                                                        <button type="button" className="btn btn-main py-8 text-15 fw-normal px-16">Accept</button>
                                                        <button type="button" className="btn btn-outline-gray py-8 text-15 fw-normal px-16">Decline</button>
                                                    </div>
                                                    <span className="text-gray-200 text-13 mt-8">2 mins ago</span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-start gap-12">
                                                <img src="assets/images/thumbs/notification-img2.png" alt="" className="w-48 h-48 rounded-circle object-fit-cover" />
                                                <div className="">
                                                    <a href="#" className="fw-medium text-15 mb-0 text-gray-300 hover-text-main-600 text-line-2">Patrick added a comment on Design Assets - Smart Tags file:</a>
                                                    <span className="text-gray-200 text-13">2 mins ago</span>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" className="py-13 px-24 fw-bold text-center d-block text-primary-600 border-top border-gray-100 hover-text-decoration-underline"> View All </a>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="text-gray-500 w-40 h-40 bg-main-50 hover-bg-main-100 transition-2 rounded-circle text-xl flex-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="ph ph-globe"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                                <div className="card border border-gray-100 rounded-12 box-shadow-custom">
                                    <div className="card-body">
                                        <div className="max-h-270 overflow-y-auto scroll-sm pe-8">
                                            <div className="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                                                <label className="ps-0 form-check-label line-height-1 fw-medium text-secondary-light" for="arabic">
                                                    <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                        <img src="assets/images/thumbs/flag1.png" alt="" className="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0" />
                                                        <span className="text-15 fw-semibold mb-0">Arabic</span>
                                                    </span>
                                                </label>
                                                <input className="form-check-input" type="radio" name="language" id="arabic" />
                                            </div>
                                            <div className="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                                                <label className="ps-0 form-check-label line-height-1 fw-medium text-secondary-light" for="germany">
                                                    <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                        <img src="assets/images/thumbs/flag2.png" alt="" className="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0" />
                                                        <span className="text-15 fw-semibold mb-0">Germany</span>
                                                    </span>
                                                </label>
                                                <input className="form-check-input" type="radio" name="language" id="germany" />
                                            </div>
                                            <div className="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                                                <label className="ps-0 form-check-label line-height-1 fw-medium text-secondary-light" for="english">
                                                    <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                        <img src="assets/images/thumbs/flag3.png" alt="" className="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0" />
                                                        <span className="text-15 fw-semibold mb-0">English</span>
                                                    </span>
                                                </label>
                                                <input className="form-check-input" type="radio" name="language" id="english" />
                                            </div>
                                            <div className="form-check form-radio d-flex align-items-center justify-content-between ps-0">
                                                <label className="ps-0 form-check-label line-height-1 fw-medium text-secondary-light" for="spanish">
                                                    <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                        <img src="assets/images/thumbs/flag4.png" alt="" className="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0" />
                                                        <span className="text-15 fw-semibold mb-0">Spanish</span>
                                                    </span>
                                                </label>
                                                <input className="form-check-input" type="radio" name="language" id="spanish" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="dropdown">
                        <button className="users arrow-down-icon border border-gray-200 rounded-pill p-4 d-inline-block pe-40 position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="position-relative">
                                <img src={userImage} alt="Image" className="h-32 w-32 rounded-circle" />
                                <span className="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0"></span>
                            </span>
                        </button>
                        <div className="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                            <div className="card border border-gray-100 rounded-12 box-shadow-custom">
                                <div className="card-body">
                                    <div className="flex-align gap-8 mb-20 pb-20 border-bottom border-gray-100">
                                        <img src={userImage} alt="" className="w-54 h-54 rounded-circle" />
                                        <div className="">
                                            <h4 className="mb-0">Michel John</h4>
                                            <p className="fw-medium text-13 text-gray-200">examplemail@mail.com</p>
                                        </div>
                                    </div>
                                    <ul className="max-h-270 overflow-y-auto scroll-sm pe-4">
                                        <li className="mb-4">
                                            <a href="setting.html" className="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                <span className="text-2xl text-primary-600 d-flex"><i className="ph ph-gear"></i></span>
                                                <span className="text">Account Settings</span>
                                            </a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="pricing-plan.html" className="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                <span className="text-2xl text-primary-600 d-flex"><i className="ph ph-chart-bar"></i></span>
                                                <span className="text">Upgrade Plan</span>
                                            </a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="analytics.html" className="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                <span className="text-2xl text-primary-600 d-flex"><i className="ph ph-chart-line-up"></i></span>
                                                <span className="text">Daily Activity</span>
                                            </a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="message.html" className="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                <span className="text-2xl text-primary-600 d-flex"><i className="ph ph-chats-teardrop"></i></span>
                                                <span className="text">Inbox</span>
                                            </a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="email.html" className="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                <span className="text-2xl text-primary-600 d-flex"><i className="ph ph-envelope-simple"></i></span>
                                                <span className="text">Email</span>
                                            </a>
                                        </li>
                                        <li className="pt-8 border-top border-gray-100">
                                            <a href="sign-in.html" className="py-12 text-15 px-20 hover-bg-danger-50 text-gray-300 hover-text-danger-600 rounded-8 flex-align gap-8 fw-medium text-15">
                                                <span className="text-2xl text-danger-600 d-flex"><i className="ph ph-sign-out"></i></span>
                                                <span className="text">Log Out</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


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
    </>;
};
export default Dashboard;