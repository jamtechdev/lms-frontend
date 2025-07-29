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
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Score</th>
                <th>Gems</th>
              </tr>
            </thead>
            <tbody>
              {gemsData.map((gem) => (
                <tr key={gem.id}>
                  <td>{gem.username}</td>
                  <td>{gem.score}</td>
                  <td>{gem.gems}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No gems found</p>
      )}
    </div>
  );
};

export default Gems;
