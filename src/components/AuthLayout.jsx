import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getIsAuthenticated } from "../_store/_reducers/auth";

const AuthLayout = ({ isProtected }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isProtected && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
