import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLevel, hasPermission } from "../../_store/_reducers/auth";
import { useEffect, useState } from "react";
import { userService } from "../../_services";
import topicsService from "../../_services/topics.service";

const MobileMenu = (props) => {
  const permission = useSelector(hasPermission);
  const location = useLocation();
  const path = location.pathname;
  const level = useSelector(getLevel);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [topicsLoading, setTopicsLoading] = useState(false);

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

  const studentSidebar = [
    { route: "/student", label: "Dashboard", iconClass: "ph ph-squares-four" },
    {
      route: "/student/subjects",
      label: "Practice",
      iconClass: "ph ph-clipboard-text",
    },
  ];

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await userService.getSubject(level);
        setSubjects(response.data);
      } catch (err) {
        console.error(
          err?.response?.data?.message || "Error fetching subjects"
        );
      }
    };

    if (permission === "child" && level) {
      fetchSubjects();
    }
  }, [level, permission]);

  const fetchTopics = async (subject) => {
    const isExpanded = expandedSubject === subject?.subject_name;

    if (isExpanded) {
      setExpandedSubject(null);
      setTopics([]);
    } else {
      setTopicsLoading(true);
      try {
        const response = await topicsService.topicsBySubject(subject?.id);
        setTopics(response.data);
        setExpandedSubject(subject?.subject_name);
        setExpandedTopic(null);
      } catch (err) {
        console.error("Error fetching topics", err);
      } finally {
        setTopicsLoading(false);
      }
    }
  };

  const toggleTopic = (topicId) => {
    setExpandedTopic((prev) => (prev === topicId ? null : topicId));
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

  return (
    <div>
      <ul className="sidebar-menu">
        {permission === "child" && (
          <>
            <li
              className={`sidebar-menu__item ${
                path === "/student" ? "activePage" : ""
              }`}
            >
              <Link to="/student" className="sidebar-menu__link">
                <span className="icon">
                  <i className="ph ph-squares-four"></i>
                </span>
                <span className="text">Dashboard</span>
              </Link>
            </li>

            {subjects.map((subject) => (
              <li key={subject.id}>
                <div
                  onClick={() => fetchTopics(subject)}
                  className="sidebar-menu__link d-flex justify-content-between cursor-pointer"
                >
                  <span>{subject.subject_name}</span>
                  <span>
                    {expandedSubject === subject.subject_name ? "-" : "+"}
                  </span>
                </div>

                {expandedSubject === subject.subject_name && (
                  <ul className="ps-3">
                    {topicsLoading ? (
                      <li>Loading...</li>
                    ) : topics.length > 0 ? (
                      topics.map((topic) => (
                        <li key={topic.id}>
                          <div
                            onClick={() => toggleTopic(topic.id)}
                            className="sidebar-menu__link d-flex justify-content-between cursor-pointer"
                          >
                            <span>{topic.name}</span>
                            <span>
                              {expandedTopic === topic.id ? "-" : "+"}
                            </span>
                          </div>

                          {expandedTopic === topic.id && (
                            <ul className="ps-3">
                              {questionTypes.map((type, i) => (
                                <li key={i}>
                                  <Link
                                    to={`/student/all-questions?sub=${subject.id}&topic=${topic.id}&type=${type.key}`}
                                    className="sidebar-menu__link"
                                  >
                                    {type.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))
                    ) : (
                      <li>No topics available</li>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </>
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
  );
};
export default MobileMenu;
