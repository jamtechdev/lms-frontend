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

import QuestionType from "../pages/student/questions/type";
import AllQuestions from "../pages/student/questions";
import EditStudent from "../pages/parent/students/edit";
import AssessmentHistory from "../pages/parent/assessment-history";
import Subscription from "../pages/parent/subscription";
import Gems from "../pages/parent/gems";
import Subject from "../pages/student/questions/Subjects";
import Topics from "../pages/student/questions/topic";
import NewStudentDashboard from "../pages/student/new-student-dashboad";
import NewParentDashboard from "../pages/parent/new-parent-dashboard";
import CreateAssignment from "../pages/parent/assessment-history/createassignment";
import UpdateAssignment from "../pages/parent/assessment-history/update";
import WeeklyAssignment from "../pages/assignment";


const Login = lazy(() => import("../pages/login/index"));
const Landing = lazy(() => import("../pages/landing/index"));
const Signup = lazy(() => import("../pages/signup/index"));
const ForgotPassword = lazy(() => import("../pages/forgotpassword/index"));
const Dashboard = lazy(() => import("../pages/dashboard/index"));
const Questions = lazy(() => import("../pages/student/questions/index"));

const NoPage = () => (
  <AccessDeniedPage />

);

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
          <Route path="*" element={<NoPage />} />
          <Route index element={<NewStudentDashboard />} />
          <Route path="questions" element={<Questions />} />
          <Route path="subjects" element={<Subject />} />
          <Route path="topics" element={<Topics />} />
          <Route path="question-type" element={<QuestionType />} />
          <Route path="all-questions" element={<AllQuestions />} />
          <Route path="week-assignment/:id" element={<WeeklyAssignment />} />
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
          <Route path="*" element={<NoPage />} />
          <Route index element={<NewParentDashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="students/create" element={<CreateStudent />} />
          <Route path="students/:id" element={<EditStudent />} />
          <Route path="assessment" element={<AssessmentHistory />} />
          <Route path="createassignment" element={<CreateAssignment />} />
          <Route path="assessment/update/:id" element={<UpdateAssignment />} />
          <Route path="gems" element={<Gems />} />
          <Route path="subscription" element={<Subscription />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
