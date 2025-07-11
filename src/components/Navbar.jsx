import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo/logo.png";
import dashboard from "../assets/images/dashboard-icon/dashboard-icon-1.png";
import home from "../assets/images/dashboard-icon/dashboard-icon-6.png";
import assessment from "../assets/images/dashboard-icon/dashboard-icon-2.png";
import gems from "../assets/images/dashboard-icon/dashboard-icon-3.png";
import subscription from "../assets/images/dashboard-icon/dashboard-icon-4.png";
import userService from "../_services/user.service";
import { useDispatch, useSelector } from "react-redux";
import {
  getAvatar,
  getParentBackup,
  hasPermission,
  login,
  logout,
  setParentBackup,
} from "../_store/_reducers/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Container, Offcanvas, Navbar } from "react-bootstrap";
import MobileMenu from "./common/mobile-menu";

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation();
  const path = location.pathname;
  const permission = useSelector(hasPermission);
  const parentBackup = useSelector(getParentBackup);
  const childImage = useSelector(getAvatar);

  const handleLogout = async () => {
    try {
      await userService.logout();
      dispatch(logout());
      dispatch(setParentBackup(null));
      toast.success("Logout successful!");
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Logout failed, please try again"
      );
    }
  };
  const handleSwitchToParent = () => {
    if (!parentBackup) return;

    dispatch(
      login({
        token: parentBackup.token,
        first_name: parentBackup.first_name,
        last_name: parentBackup.last_name,
        student_type: parentBackup.student_type,
        level: parentBackup.level_id,
        role: parentBackup.role,
      })
    );
    navigate("/parent");
  };
  const parentSidebar = [
    {
      route: "/parent",
      label: "Home",
      iconImage: home,
    },

    {
      route: "/parent/students",
      label: "Children",
      iconImage: dashboard,
    },
    {
      route: "/parent/assessment",
      label: "Assessment History",
      iconImage: assessment,
    },
    { route: "/parent/gems", label: "Gems", iconImage: gems },
    {
      route: "/parent/subscription",
      label: "Subscription",
      iconImage: subscription,
    },
  ];

  return (
    <>
      <Navbar expand="xl" className="top-navbar p-3">
        <Container fluid className="p-0">
          <Link to="/" className="sidebar__logo">
            <img src={logo} alt="QTN" />
          </Link>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="sidebar-menu">
                {permission === "parent" &&
                  parentSidebar.map(({ route, label, iconImage }) => (
                    <li
                      key={route}
                      className={`sidebar-menu__item ${
                        path === route ? "activePage" : ""
                      }`}
                    >
                      <Link to={route} className="sidebar-menu__link">
                        <img
                          src={iconImage}
                          alt={label}
                          width="30"
                          height="30"
                        />
                        <span className="text">{label}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {permission === "child" && (
            <>
              <span className="position-relative">
                <img
                  src={childImage}
                  alt="Image"
                  className="h-32 w-32 rounded-circle"
                />
                <span className="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0"></span>
              </span>

              <button onClick={handleSwitchToParent} className="logout-btn">
                <span className="text-2xl text-primary-600 d-flex">
                  <i className="ph ph-user-switch"></i>
                </span>
                <span className="text">Switch to Parent</span>
              </button>
            </>
          )}
          {permission === "parent" && (
            <button onClick={handleLogout} className="logout-btn">
              <span className="text-2xl text-danger-600 d-flex">
                <i className="ph ph-sign-out"></i>
              </span>
              <span className="text">Log Out</span>
            </button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Nav;
