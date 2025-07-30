import { useState, useEffect } from "react";
import loader from "../../../assets/images/loader.gif";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getChildId } from "../../../_store/_reducers/auth";
import { useSelector } from "react-redux";
import userService from "../../../_services/user.service";

const Prize = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const childId = useSelector(getChildId);
  const navigate = useNavigate();

  const fetchPrize = async () => {
    setLoading(true);
    try {
      const response = await userService.getViewPrize(childId);
      setData(response.data);
    } catch (error) {
      toast.error("No Prize Found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrize();
  }, []);

  return (
    <div className="prize-container">
      {loading ? (
        <div className="text-center mt-3">
          <img src={loader} alt="Loading..." />
        </div>
      ) : data.length > 0 ? (
        <div className="prize-grid">
          {data.map((item) => (
            <div className="prize-card" key={item.id}>
              <img src={item.image} alt={item.name} className="prize-image" />
              <h3 className="prize-title">{item.name}</h3>
              <p className="prize-description">{item.description}</p>
              <p className="prize-gems">
                <strong>Gems Required:</strong> {item.gems_required}
              </p>
              <button className="dashboard-button w-100" size="sm">
                Redeem Prize
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-prize">No Prizes Available</p>
      )}
    </div>
  );
};

export default Prize;
