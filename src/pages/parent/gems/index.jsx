import { useState, useEffect } from "react";
import loader from "../../../assets/images/loader.gif";
import toast from "react-hot-toast";
import parentService from "../../../_services/parent.service";

const Gems = () => {
  const [loading, setLoading] = useState(false);
  const [gemsData, setGemsData] = useState([]);

  const fetchGems = async () => {
    setLoading(true);
    try {
      const response = await parentService.getGem();
      setGemsData(response.data || []); // Assuming response.data is the array
    } catch (error) {
      toast.error("Error fetching gems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGems();
  }, []);

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
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title">Gems for {gem.username}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-primary">
                        {/* Gem Icon SVG */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="me-2"
                        >
                          <path d="M12 2l2 6h6l-4 6 2 6-6-4-6 4 2-6-4-6h6z"></path>
                        </svg>
                        {gem.gems} Gems
                      </span>
                    </div>
                    <div>
                      <small className="text-muted">{new Date(gem.created_at).toLocaleDateString()}</small>
                    </div>
                  </div>

                  <hr />

                  {/* Conditional Content Based on Source */}
                  {gem.source === "question_bank" ? (
                    <div>
                      <h6 className="card-subtitle mb-2 text-muted">Question</h6>
                      <div
                        className="card-text"
                        dangerouslySetInnerHTML={{ __html: gem.question_content }}
                      ></div>
                      <div className="mt-2">
                        <strong>Subject: </strong>
                        {gem.subject.name}
                      </div>
                    </div>
                  ) : gem.source === "assignment" ? (
                    <div>
                      <h6 className="card-subtitle mb-2 text-muted">Assignment</h6>
                      <strong>Title: </strong>{gem.assignment.title}
                      <br />
                      <strong>Description: </strong>{gem.assignment.description}
                      <div className="mt-2">
                        <strong>Subject: </strong>
                        {gem.assignment.subject.name}
                      </div>
                    </div>
                  ) : (
                    <span>No details available</span>
                  )}
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
