import { useState, useEffect } from "react";
import loader from "../../../assets/images/loader.gif";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getChildId } from "../../../_store/_reducers/auth";
import { useSelector } from "react-redux";
import parentService from "../../../_services/parent.service";

const Gems = () => {
  const [loading, setLoading] = useState(false);
  const [gemsData, setGemsData] = useState([]);
  const childId = useSelector(getChildId);
  const navigate = useNavigate();

  // Fetch gems data from the service
  const fetchGems = async () => {
    setLoading(true);
    try {
      const response = await parentService.getGem();
      setGemsData(response.data || []); // Set the fetched gems data
    } catch (error) {
      toast.error("Error fetching gems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGems();
  }, []);

  // Helper function to format the source (e.g., 'question_bank' -> 'Question Bank')
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
                      <small className="text-muted">
                        {new Date(gem.date).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="card-text">
                      {/* Loop through gems_summary to show grouped data */}
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

export default Gems;
