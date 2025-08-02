import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ParentLayout() {
  return (
    <div className="p-0">
      <div className="preloader">
        <div className="loader"></div>
      </div>
      <div className="side-overlay"></div>
      <div className="flex dashboard-container">
        <div className="dashboard-main-wrapper">
          <Navbar />
          <div className="dashboard-inner-content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
