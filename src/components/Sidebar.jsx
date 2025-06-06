import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { useSelector } from "react-redux";
import { hasPermission } from "../_store/_reducers/auth";

const Sidebar = () => {
  const permission = useSelector(hasPermission);
  const location = useLocation();
  const path = location.pathname;

  const parentSidebar = [
    { route: "/parent", label: "Dashboard", iconClass: "ph ph-squares-four" },
    { route: "/parent/students", label: "Children", iconClass: "ph ph-clipboard-text" },
    { route: "/parent/assessment", label: "Assessment History", iconClass: "ph ph-clipboard-text" },
    { route: "/parent/gems", label: "Gems", iconClass: "ph ph-clipboard-text" },
    { route: "/parent/subscription", label: "Subscription", iconClass: "ph ph-clipboard-text" },
  ];
  const studentSidebar = [
    { route: "/student", label: "Dashboard", iconClass: "ph ph-squares-four" },
    {
      route: "/student/questions",
      label: "Questions",
      iconClass: "ph ph-clipboard-text",
    },
    {
      route: "/student/subjects",
      label: "Practice",
      iconClass: "ph ph-clipboard-text",
    },
  ];
  return (
    <aside className="sidebar">
      <button
        type="button"
        className="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"
      >
        <i className="ph ph-x"></i>
      </button>
      <Link
        to="/"
        className="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 pb-10"
      >
        <img src={logo} alt="LMS" />
      </Link>
      <div className="sidebar-menu-wrapper overflow-y-auto scroll-sm">
        <div className="p-20 pt-10">
          {permission === "child" && (
            <ul className="sidebar-menu">
              {studentSidebar.map(({ route, label, iconClass }) => (
                <li
                  key={route}
                  className={`sidebar-menu__item ${path === route ? "activePage" : ""
                    }`}
                >
                  <Link to={route} className="sidebar-menu__link">
                    <span className="icon">
                      {" "}
                      <i className={iconClass}></i>
                    </span>
                    <span className="text">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {permission === "parent" && (
            <ul className="sidebar-menu">
              {parentSidebar.map(({ route, label, iconClass }) => (
                <li
                  key={route}
                  className={`sidebar-menu__item ${path === route ? "activePage" : ""
                    }`}
                >
                  <Link to={route} className="sidebar-menu__link">
                    <span className="icon">
                      {" "}
                      <i className={iconClass}></i>
                    </span>
                    <span className="text">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
