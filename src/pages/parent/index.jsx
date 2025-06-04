import { Outlet, Link } from "react-router-dom";

export default function ParentDashboard() {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Parent Home Page</h2>
            
            <Outlet />
        </div>
    );
}