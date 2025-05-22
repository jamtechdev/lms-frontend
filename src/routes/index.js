import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../pages/login/index"));
const Signup = lazy(() => import("../pages/signup/index"));
const ForgotPassword = lazy(() => import("../pages/forgotpassword/index"));
const Dashboard = lazy(() => import("../pages/dashboard/index"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
