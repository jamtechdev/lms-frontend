import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { hasPermission } from "../../_store/_reducers/auth";

const MobileMenu = (props) => {
    const permission = useSelector(hasPermission);
    const location = useLocation();
    const path = location.pathname;
    const parentSidebar = [
        { route: "/parent", label: "Dashboard", iconClass: "ph ph-squares-four" },
        { route: "/parent/students", label: "Children", iconClass: "ph ph-clipboard-text", },
        { route: "/parent/assessment", label: "Assessment History", iconClass: "ph ph-clipboard-text", },
        { route: "/parent/gems", label: "Gems", iconClass: "ph ph-clipboard-text" },
        { route: "/parent/subscription", label: "Subscription", iconClass: "ph ph-clipboard-text", },
    ];
    const studentSidebar = [
        { route: "/student", label: "Dashboard", iconClass: "ph ph-squares-four" },
        { route: "/student/subjects", label: "Practice", iconClass: "ph ph-clipboard-text", },
    ];
    return (
        <div>
            <ul className="sidebar-menu">
                {permission === "child" && (
                    <ul className="sidebar-menu">
                        {studentSidebar.map(({ route, label, iconClass }) => (
                            <li
                                key={route}
                                className={`sidebar-menu__item ${path === route ? "activePage" : ""
                                    }`}
                            >
                                <Link to={route} className="sidebar-menu__link">
                                    <span className="icon">
                                        {" "}
                                        <i className={iconClass}></i>
                                    </span>
                                    <span className="text">{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                {permission === "parent" && (
                    <ul className="sidebar-menu">
                        {parentSidebar.map(({ route, label, iconClass }) => (
                            <li
                                key={route}
                                className={`sidebar-menu__item ${path === route ? "activePage" : ""
                                    }`}
                            >
                                <Link to={route} className="sidebar-menu__link">
                                    <span className="icon">
                                        {" "}
                                        <i className={iconClass}></i>
                                    </span>
                                    <span className="text">{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </ul>
        </div>
    )
}
export default MobileMenu;