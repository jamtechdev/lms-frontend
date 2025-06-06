import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function StudentLayout() {
  return (
    <div className="p-4">
      <div className="preloader">
        <div className="loader"></div>
      </div>
      <div className="side-overlay"></div>
      <div className="flex ">
        <Sidebar />
        <div className="dashboard-main-wrapper">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}
