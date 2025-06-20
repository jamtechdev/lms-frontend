import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ParentLayout() {
    return (
        <div className="p-0">
            <div className="preloader">
                <div className="loader"></div>
            </div>
            <div className="side-overlay"></div>
            <div className='flex '>
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
