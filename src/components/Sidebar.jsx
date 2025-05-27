import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/images/logo/logo.png';

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <aside className="sidebar">
            <button type="button" className="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute">
                <i className="ph ph-x"></i>
            </button>
            <a href="/" className="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 pb-10">
                <img src={logo} alt="LMS" />
            </a>
            <div className="sidebar-menu-wrapper overflow-y-auto scroll-sm">
                <div className="p-20 pt-10">
                    <ul className="sidebar-menu">
                        <li className={`sidebar-menu__item ${path === '/dashboard' ? 'activePage' : ''}`}>
                            <a href="/dashboard" className="sidebar-menu__link">
                                <span className="icon"><i className="ph ph-squares-four"></i></span>
                                <span className="text">Dashboard</span>
                            </a>
                        </li>
                        <li className={`sidebar-menu__item ${path === '/questions' ? 'activePage' : ''}`}>
                            <a href="/questions" className="sidebar-menu__link">
                                <span className="icon"><i className="ph ph-clipboard-text"></i></span>
                                <span className="text">Questions</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;