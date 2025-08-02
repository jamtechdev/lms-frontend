import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import topicsService from "../../../../_services/topics.service";
import { useDispatch, useSelector } from "react-redux";
import { getSubject, setTopic } from "../../../../_store/_reducers/auth";
import maths from "../../../../assets/images/maths.png";

const Topics = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subject = useSelector(getSubject);
  const [topics, setTopics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTopics = async () => {
    setLoading(true);
    await topicsService
      .topicsBySubject(subject)
      .then((data) => {
        setTopics(data?.data);
      })
      .catch((error) => {
        console.error("Error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchTopics();
  }, [subject]);

  return (
    <>
      <div className="dashboard-body">
        <div className="row gy-4 shadowBox">
          {loading ? (
            <div className="col-12 text-center">
              <p>Loading Topics...</p>
            </div>
          ) : Array.isArray(topics) && topics.length > 0 ? (
            topics.map((topic, index) => (
              <div className="col-sm-3 col-lg-3 col-md-6" key={index}>
                <div
                  className="card"
                  onClick={() => {
                    dispatch(setTopic(topic?.id));
                    navigate("/student/question-type");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body">
                    <div className="flex-between gap-8 mb-10">
                      <div className="mt-10">
                        <span className="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl">
                          <i className="ph ph-graduation-cap"></i>
                        </span>
                        <h4 className="mb-2 mt-20">{topic?.name}</h4>
                      </div>
                      <img
                        src={maths}
                        className="subject_img"
                        alt={topic?.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No Topics available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Topics;
