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
                  <h5 className="card-title">Gem History for {gem.username}</h5>

                  {/* Gem Details */}
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

                  {/* Gem History Log Content */}
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Gem History Details</h6>
                    <div className="card-text">
                      <strong>Source:</strong> {gem.source === "assignment" ? gem.assignment.title : "Question Bank"}
                      <br />
                      <strong>Subject:</strong> {gem.source === "assignment" ? gem.assignment.subject.name : gem.subject.name}
                      <br />
                      <strong>Gems Awarded:</strong> {gem.gems}
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
