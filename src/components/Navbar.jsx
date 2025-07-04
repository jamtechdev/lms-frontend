import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo/logos.png";
import userService from "../_services/user.service";
import { useDispatch } from "react-redux";
import { logout } from "../_store/_reducers/auth";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Offcanvas } from "react-bootstrap";
import MobileMenu from "./common/mobile-menu";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenu(false);
  }, [location]);

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

  return (
    <>
      <div className="top-navbar flex-between gap-16 p-2">
        {/* Mobile Menu Button */}
        <div className="flex-align gap-16">
          <button
            onClick={() => setIsMobileMenu(true)}
            type="button"
            className="toggle-btn d-xl-none d-flex text-26 text-gray-500"
          >
            <i className="ph ph-list"></i>
          </button>
        </div>

        {/* Profile Dropdown */}
        <button
          onClick={handleLogout}
          className="py-2 text-15 px-10 hover-bg-danger-50 text-gray-300 hover-text-danger-600 rounded-8 flex-align gap-8 fw-medium text-15 w-full text-left logout-btn"
        >
          <span className="text-2xl text-danger-600 d-flex">
            <i className="ph ph-sign-out"></i>
          </span>
          <span className="text">Log Out</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <Offcanvas
        show={isMobileMenu}
        onHide={() => setIsMobileMenu(false)}
        placement="start"
        className="bg-white"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MobileMenu />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;
