import React, { useEffect, useState } from "react";
import maths from "../../../../assets/images/maths.png";
import { useDispatch, useSelector } from "react-redux";
import { getLevel, setSubject } from "../../../../_store/_reducers/auth";
import userService from "../../../../_services/user.service";
import { useNavigate } from "react-router-dom";

const Subject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const level = useSelector(getLevel);

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

  return (
    <>
      <div className="dashboard-body">
        {!selectedSubject && (
          <div className="row gy-4 shadowBox">
            {loading ? (
              <div className="col-12 text-center">
                <p>Loading subjects...</p>
              </div>
            ) : Array.isArray(subjects) && subjects.length > 0 ? (
              subjects.map((subject) => (
                <div className="col-sm-3 col-lg-3 col-md-6" key={subject.id}>
                  <div
                    className="card"
                    onClick={() => {
                      setSelectedSubject(subject.id);
                      dispatch(setSubject(subject.id));
                      navigate("/student/topics");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body">
                      <div className="flex-between gap-8 mb-10">
                        <div className="mt-10">
                          <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl">
                            <i className="ph ph-graduation-cap"></i>
                          </span>
                          <h4 className="mb-2 mt-20">{subject.subject_name}</h4>
                        </div>
                        <img
                          src={maths}
                          className="subject_img"
                          alt={subject.subject_name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No subjects available.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Subject;
