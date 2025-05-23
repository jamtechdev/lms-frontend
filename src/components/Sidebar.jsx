import React from 'react'

const Sidebar = () => {
    return (
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
    )
}

export default Sidebar