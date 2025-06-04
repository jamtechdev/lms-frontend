import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getIsAuthenticated, hasPermission } from "../_store/_reducers/auth";

const AuthLayout = ({ isProtected }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const permission = useSelector(hasPermission);

  // if (isProtected && !isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  // if (!isProtected && isAuthenticated) {
  //   return <Navigate to="/dashboard" replace />;
  // }
  if (isAuthenticated && !isProtected) {
    if (permission === "child") return <Navigate to="/student" />;
    if (permission === "parent") return <Navigate to="/parent" />;
  }

  return <Outlet />;
};

export default AuthLayout;
