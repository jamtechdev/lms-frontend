import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import ParentLayout from "../layouts/ParentLayout";
import ParentDashboard from "../pages/parent";
import ProtectedRoute from "../layouts/ProtectedRoute";
import AccessDeniedPage from "../components/common/access-denied";
import StudentLayout from "../layouts/StudentLayout";
import StudentDashboard from "../pages/student";
import StudentList from "../pages/parent/students";
import CreateStudent from "../pages/parent/students/create";
import Subjects from "../pages/questions/Subjects";
import QuestionType from "../pages/questions/QuestionType";
import AllQuestions from "../pages/questions/Questions";
import EditStudent from "../pages/parent/students/edit";
import AssessmentHistory from "../pages/parent/assessment-history";
import Subscription from "../pages/parent/subscription";
import Gems from "../pages/parent/gems";

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
          <Route path="/not-access" element={<AccessDeniedPage />} />
        </Route>

        {/* <Route element={<AuthLayout isProtected={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questions" element={<Questions />} />
        </Route> */}
        {/* Parent Routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["child"]}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="questions" element={<Questions />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="selectQuestionType" element={<QuestionType />} />
          <Route path="allQuestions" element={<AllQuestions />} />          
        </Route>

        {/* Parent Routes */}
        <Route
          path="/parent/*"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ParentDashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="students/create" element={<CreateStudent />} />
          <Route path="students/:id" element={<EditStudent />} />
          <Route path="assessment" element={<AssessmentHistory />} />
          <Route path="gems" element={<Gems />} />
          <Route path="subscription" element={<Subscription />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
