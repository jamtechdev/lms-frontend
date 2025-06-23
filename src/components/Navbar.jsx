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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    setIsMobileMenu(false);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, (location && location.pathname)]);

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
        <div className="flex-align gap-16">
          <button
            onClick={() => setIsMobileMenu(true)}
            type="button"
            className="toggle-btn d-xl-none d-flex text-26 text-gray-500"
          >
            <i className="ph ph-list"></i>
          </button>
        </div>
        <div className="flex-align gap-16" ref={dropdownRef}>
          <div className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
            <div className="dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`users arrow-down-icon border border-gray-200 rounded-pill p-2 d-inline-block pe-40 position-relative ${isDropdownOpen ? "show" : ""
                  }`}
                type="button"
                aria-expanded={isDropdownOpen}
                data-bs-toggle="dropdown"
              >
                <span className="position-relative">
                  <img
                    src={logo}
                    alt="Image"
                    className="h-32 w-32 rounded-circle"
                  />
                  <span className="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0"></span>
                </span>
              </button>
              <div
                className={`dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0 ${isDropdownOpen ? "show" : ""
                  }`}
              >
                <div className="card border border-gray-100 rounded-12 box-shadow-custom">
                  <div className="card-body py-1 px-3">
                    <ul className="max-h-270 overflow-y-auto scroll-sm pe-4">
                      <li className="pt-8">
                        <button
                          onClick={handleLogout}
                          className="py-12 text-15 px-10 hover-bg-danger-50 text-gray-300 hover-text-danger-600 rounded-8 flex-align gap-8 fw-medium text-15 w-full text-left"
                        >
                          <span className="text-2xl text-danger-600 d-flex">
                            <i className="ph ph-sign-out"></i>
                          </span>
                          <span className="text">Log Out</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isMobileMenu && <Offcanvas
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
        </Offcanvas>}
      </div>
    </>
  );
};

export default Navbar;
