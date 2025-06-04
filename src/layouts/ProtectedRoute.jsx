import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated, hasPermission } from "../_store/_reducers/auth";

export default function ProtectedRoute({ children, allowedRoles }) {
    const isAuthenticated = useSelector(getIsAuthenticated);
    const permission = useSelector(hasPermission);

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!allowedRoles.includes(permission)) return <Navigate to="/not-access" />;
    return children;
    // also make for parent role and student role
}