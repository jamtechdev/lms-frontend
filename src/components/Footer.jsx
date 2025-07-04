import React from "react";

const Footer = () => {
  return (
    <div className="dashboard-footer p-3">
      <div className="flex-between flex-wrap gap-16">
        <p className="text-gray-300 text-13 fw-normal mb-0">
          {" "}
          &copy; Copyright QTN Vault 2025, All Right Reserved
        </p>
        <div className="flex-align flex-wrap gap-16">
          <span className="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">
            License
          </span>
          <span className="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">
            Documentation
          </span>
          <span className="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">
            Support
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
