import { Link, useLocation } from "react-router-dom";


const MobileMenu = (props) => {
    const location = useLocation();
    const path = location.pathname;
    const studentSidebar = [
        { route: "/student", label: "Dashboard", iconClass: "ph ph-squares-four" },
        { route: "/student/new-student-dashboard", label: "New Dashboard", iconClass: "ph ph-squares-four" },
        {
            route: "/student/subjects",
            label: "Practice",
            iconClass: "ph ph-clipboard-text",
        },
    ];
    return (
        <div>
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
        </div>
    )
}
export default MobileMenu;