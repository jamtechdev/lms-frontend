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
              <div className="card shadow-sm mb-5">
                <div className="card-body">
                   <div className="gem-icon mb-3">
                  <i class="ph ph-sketch-logo"></i>
                </div>
                  <h5 className="card-title mb-1">{gem.username}</h5>

                  {/* Gem Details */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-primary d-flex align-items-center gap-5">
                        {/* Gem Icon SVG */}
                       <i class="ph ph-sketch-logo"></i>
                        {gem.gems}
                      </span>
                    </div>
                    <div>
                      <small className="text-muted">{new Date(gem.created_at).toLocaleDateString()}</small>
                    </div>
                  </div>

                  {/* Gem History Log Content */}
                  <div className="pt-2">
                    {/* <h6 className="card-subtitle mb-2 text-black">Gem History Details</h6> */}
                    <div className="card-text">
                      <strong><i class="ph ph-books"></i></strong> {gem.source}
                      <br />
                      <strong><i class="ph ph-book-open"></i></strong> {gem.source === "assignment" ? gem.assignment.subject.name : gem.subject.name}
                      <br />
                      {/* <strong>Gems Awarded:</strong> {gem.gems} */}
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
