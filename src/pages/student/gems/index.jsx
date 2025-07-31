import { useState, useEffect } from "react";
import loader from "../../../assets/images/loader.gif";
import toast from "react-hot-toast";
import parentService from "../../../_services/parent.service";
import { useNavigate } from "react-router-dom";
import { getChildId } from "../../../_store/_reducers/auth";
import { useSelector } from "react-redux";

const StudentGems = () => {
  const [loading, setLoading] = useState(false);
  const [gemsData, setGemsData] = useState([]);
  const childId = useSelector(getChildId);
  const navigate = useNavigate();

  // Function to fetch gems history
  const fetchGems = async () => {
    setLoading(true);
    try {
      const response = await parentService.getGemHistory(childId);
      setGemsData(response.data || []);
    } catch (error) {
      toast.error("Error fetching gems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGems();
  }, []);

  // Format the source to capitalize each word and handle empty sources
  const formatSource = (source) => {
    if (!source) return "";
    return source
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="mt-3">
      {loading ? (
        <div className="text-center">
          <img src={loader} width={100} alt="Loading..." />
        </div>
      ) : gemsData.length > 0 ? (
        <div className="row">
          {gemsData.map((gem, index) => (
            <div className="col-md-4" key={index}>
              <div className="card shadow-sm mb-5">
                <div className="card-body">
                  <div className="gem-icon mb-3">
                    <i className="ph ph-sketch-logo"></i>
                  </div>
                  <h5 className="card-title mb-1">{gem.username}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-primary d-flex align-items-center gap-5">
                        <i className="ph ph-sketch-logo"></i>
                        {gem.total_gems}
                      </span>
                    </div>
                    <div>
                      <small className="text-muted">{gem.date}</small>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="card-text">
                      {/* Loop through gems_summary */}
                      {Object.entries(gem.gems_summary).map(([subject, topics], subjectIndex) => (
                        <div key={subjectIndex}>
                          <strong>
                            <i className="ph ph-book-open"></i>
                          </strong>{" "}
                          {subject}
                          <ul>
                            {Object.entries(topics).map(([topic, gems], topicIndex) => (
                              <li key={topicIndex}>
                                <strong>
                                  <i className="ph ph-book"></i>
                                </strong>{" "}
                                {topic}: {gems} Gems
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No gems found</p>
      )}
    </div>
  );
};

export default StudentGems;
