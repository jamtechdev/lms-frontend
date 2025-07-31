import React, { useRef, useState } from "react";
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
  getChildId,
  getParentBackup,
  hasPermission,
  login,
  logout,
  setParentBackup,
} from "../_store/_reducers/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Container, Offcanvas, Navbar, Modal } from "react-bootstrap";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const childId = useSelector(getChildId);
  const permission = useSelector(hasPermission);
  const parentBackup = useSelector(getParentBackup);
  const childImage = useSelector(getAvatar);

  const handleClose = () => {
    setShow(false);
    setPin(["", "", "", "", "", ""]);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handlePinChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (newPin.every((digit) => digit !== "")) {
      handleStudentSubmit(newPin.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleStudentSubmit = async (pinCode) => {
    try {
      const values = {
        lock_code: pinCode,
        child_id: childId,
      };
      const response = await userService.loginStudent(values);
      if (!parentBackup) return;
      dispatch(
        login({
          token: parentBackup.token,
          first_name: parentBackup.first_name,
          last_name: parentBackup.last_name,
          student_type: parentBackup.student_type,
          level: parentBackup.level_id,
          role: parentBackup.role,
          child_id: parentBackup.child_id,
        })
      );
      toast.success("Switched to parent dashboard");
      navigate("/parent");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to switch, please try again"
      );
    } finally {
      handleClose();
    }
  };

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

  const parentSidebar = [
    { route: "/parent", label: "Home", iconImage: home },
    { route: "/parent/students", label: "Children", iconImage: dashboard },
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
          {permission === "parent" && (
            <>
              <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
              <Navbar.Offcanvas
                id="offcanvasNavbar-expand-lg"
                aria-labelledby="offcanvasNavbarLabel-expand-lg"
                placement="end"
              >
                <Offcanvas.Header closeButton />
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
            </>
          )}
          {permission === "child" && (
            <div className="d-flex align-items-center gap-5">
              {path === "/student" && (
                <button onClick={handleShow} className="logout-btn">
                  <span className="text-2xl text-primary-600 d-flex">
                    <i className="ph ph-user-switch"></i>
                  </span>
                  <span className="text">Switch to Parent</span>
                </button>
              )}
              {(path === "/student/all-questions" ||
                path.startsWith("/student/week-assignment")) && (
                <button
                  className="logout-btn d-flex align-items-center justify-content-center gap-2"
                  onClick={() => navigate("/student")}
                >
                  <i className="ph ph-arrow-left"></i>
                  Back
                </button>
              )}
              {(path === "/student/gems" || path === "/student/prize") && (
                <>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <button
                      className="dashboard-button"
                      onClick={() => navigate("log")}
                    >
                      Track your price
                    </button>
                  </div>
                  <button
                    className="logout-btn d-flex align-items-center justify-content-center gap-2"
                    onClick={() => navigate("/student")}
                  >
                    <i className="ph ph-arrow-left"></i>
                    Back
                  </button>
                </>
              )}
              {path === "/student/prize/log" && (
                <>
                  <button
                    className="logout-btn d-flex align-items-center justify-content-center gap-2"
                    onClick={() => navigate("/student")}
                  >
                    <i className="ph ph-arrow-left"></i>
                    Back
                  </button>
                </>
              )}
              <span className="position-relative avatar-image">
                <img
                  src={childImage}
                  alt="Avatar"
                  className="h-32 w-32 rounded-circle"
                />
                <span className="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0"></span>
              </span>
            </div>
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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="pb-0">
          <h2 className="modal-title text-center w-100">Enter Lock Code</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            A 6-digit PIN is required for this action.
            <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control text-center"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={{ width: "50px", fontSize: "1.5rem" }}
                />
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex align-items-center justify-content-center w-100 gap-3 m-0">
            <button
              className="logout-btn w-100 justify-content-center"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="dashboard-button w-100"
              onClick={() => handleStudentSubmit(pin.join(""))}
              disabled={pin.some((digit) => digit === "")}
            >
              Confirm
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Nav;
