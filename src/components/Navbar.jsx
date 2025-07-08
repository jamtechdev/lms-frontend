import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo/logo.png";
import dashboard from "../assets/images/dashboard-icon/dashboard-icon-1.png";
import userService from "../_services/user.service";
import { useDispatch } from "react-redux";
import { logout } from "../_store/_reducers/auth";
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

  const handleLogout = async () => {
    try {
      await userService.logout();
      dispatch(logout());
      toast.success("Logout successful!");
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Logout failed, please try again"
      );
    }
  };

  const parentSidebar = [
    
    {
      route: "/parent/students",
      label: "Children",
      iconImage: dashboard,
    },
    {
      route: "/parent/assessment",
      label: "Assessment History",
      iconImage: "https://cdn-icons-png.flaticon.com/512/15175/15175912.png",
    },
    { route: "/parent/gems", label: "Gems", iconImage: "https://cdn-icons-png.flaticon.com/512/6577/6577837.png" },
    {
      route: "/parent/subscription",
      label: "Subscription",
      iconImage: "https://cdn-icons-png.flaticon.com/512/11264/11264808.png",
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
                {parentSidebar.map(({ route, label, iconImage }) => (
                  <li
                    key={route}
                    className={`sidebar-menu__item ${
                      path === route ? "activePage" : ""
                    }`}
                  >
                    <Link to={route} className="sidebar-menu__link">
                      <img src={iconImage} alt={label} width="30" height="30" />
                      <span className="text">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <span className="text-2xl text-danger-600 d-flex">
              <i className="ph ph-sign-out"></i>
            </span>
            <span className="text">Log Out</span>
          </button>
        </Container>
      </Navbar>
    </>
  );
};

export default Nav;
