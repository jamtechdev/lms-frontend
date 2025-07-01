import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { useSelector } from "react-redux";
import { getLevel, hasPermission } from "../_store/_reducers/auth";
import { Accordion, Card } from "react-bootstrap";
import { userService } from "../_services";
import topicsService from "../_services/topics.service";

const Sidebar = () => {
  const permission = useSelector(hasPermission);
  const level = useSelector(getLevel);
  const location = useLocation();
  const path = location.pathname;
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [expandedKey, setExpandedKey] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await userService.getSubject(level);
        setSubjects(response.data);
      } catch (err) {
        console.log(err?.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (level) {
      fetchSubjects();
    }
  }, [level]);
  console.log();
  const topicsBySubject = async (subject) => {
    const isCurrentlyExpanded = expandedKey === subject?.subject_name;

    if (isCurrentlyExpanded) {
      setExpandedKey(null);
      setTopics([]);
    } else {
      setTopicsLoading(true);
      try {
        const data = await topicsService.topicsBySubject(subject?.id);
        setTopics(data?.data);
        setExpandedKey(subject?.subject_name);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setTopicsLoading(false);
      }
    }
  };

  const questionTypes = [
    { key: "mcq", label: "MCQ" },
    { key: "true_false", label: "True/False" },
    { key: "linking", label: "Linking" },
    { key: "rearranging", label: "Rearranging" },
    { key: "open_cloze_with_options", label: "Open Close With Options" },
    {
      key: "open_cloze_with_dropdown_options",
      label: "Open Close With Dropdown",
    },
    { key: "comprehension", label: "Comprehension" },
    { key: "editing", label: "Editing" },
    { key: "fill_in_the_blank", label: "Fill in the blank" },
  ];

  const parentSidebar = [
    { route: "/parent", label: "Dashboard", iconClass: "ph ph-squares-four" },
    {
      route: "/parent/students",
      label: "Children",
      iconClass: "ph ph-clipboard-text",
    },
    {
      route: "/parent/assessment",
      label: "Assessment History",
      iconClass: "ph ph-clipboard-text",
    },
    { route: "/parent/gems", label: "Gems", iconClass: "ph ph-clipboard-text" },
    {
      route: "/parent/subscription",
      label: "Subscription",
      iconClass: "ph ph-clipboard-text",
    },
  ];

  return (
    <aside className="sidebar">
      <button
        type="button"
        className="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"
      >
        <i className="ph ph-x"></i>
      </button>

      <Link
        to="/"
        className="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 pb-10"
      >
        <img src={logo} alt="QTN" />
      </Link>

      <div className="sidebar-menu-wrapper overflow-y-auto scroll-sm pt-3">
        <div className="p-20 pt-10">
          {permission === "child" && (
            <ul className="sidebar-menu">
              <li
                className={`sidebar-menu__item ${
                  path === "/student" ? "activePage" : ""
                }`}
              >
                <Link to={"/student"} className="sidebar-menu__link">
                  <span className="icon">
                    <i className="ph ph-squares-four"></i>
                  </span>
                  <span className="text">Dashboard</span>
                </Link>
              </li>
              {subjects?.map((subject, index) => (
                <Accordion
                  activeKey={
                    expandedKey === subject?.subject_name
                      ? subject?.subject_name
                      : null
                  }
                  key={subject?.subject_name + index}
                >
                  <Accordion.Item eventKey={subject?.subject_name}>
                    <Accordion.Header onClick={() => topicsBySubject(subject)}>
                      {subject?.subject_name}
                    </Accordion.Header>
                    <Accordion.Body className="subjects">
                      {topicsLoading ? (
                        <p>Loading...</p>
                      ) : topics?.length > 0 ? (
                        topics.map((topic, index) => (
                          <Accordion key={index}>
                            <Accordion.Item eventKey={topic?.name}>
                              <Accordion.Header>{topic?.name}</Accordion.Header>
                              {questionTypes?.map((type, index) => (
                                <Accordion.Body key={index}>
                                  <Link
                                    to={`/student/all-questions?sub=${subject?.id}&topic=${topic?.id}&type=${type?.key}`}
                                  >
                                    {type?.label}
                                  </Link>
                                </Accordion.Body>
                              ))}
                            </Accordion.Item>
                          </Accordion>
                        ))
                      ) : (
                        <p>No Topics available</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
            </ul>
          )}

          {permission === "parent" && (
            <ul className="sidebar-menu">
              {parentSidebar.map(({ route, label, iconClass }) => (
                <li
                  key={route}
                  className={`sidebar-menu__item ${
                    path === route ? "activePage" : ""
                  }`}
                >
                  <Link to={route} className="sidebar-menu__link">
                    <span className="icon">
                      <i className={iconClass}></i>
                    </span>
                    <span className="text">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
