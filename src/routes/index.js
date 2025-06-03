import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Login = lazy(() => import("../pages/login/index"));
const Landing = lazy(() => import("../pages/landing/index"));
const Signup = lazy(() => import("../pages/signup/index"));
const ForgotPassword = lazy(() => import("../pages/forgotpassword/index"));
const Dashboard = lazy(() => import("../pages/dashboard/index"));
const Questions = lazy(() => import("../pages/questions/index"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout isProtected={false} />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>

        <Route element={<AuthLayout isProtected={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questions" element={<Questions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
