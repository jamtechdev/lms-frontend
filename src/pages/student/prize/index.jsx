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
  const [showModal, setShowModal] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
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

  const handleRedeemClick = (prize) => {
    setSelectedPrize(prize);
    setShippingAddress("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPrize(null);
  };

  const handleSubmit = async () => {
    if (!shippingAddress.trim()) {
      toast.error("Please enter a shipping address.");
      return;
    }

    try {
      await userService.redeemRequest({
        prize_id: selectedPrize.id,
        child_id: childId,
        shipping_address: shippingAddress,
      });
      toast.success("Prize redeemed successfully!");
      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to redeem prize.");
    }
  };

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
              <button
                className="dashboard-button w-100"
                onClick={() => handleRedeemClick(item)}
              >
                Redeem Prize
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-prize">No Prizes Available</p>
      )}

      {showModal && selectedPrize && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Redeem Prize</h2>
            <p>
              <strong>Prize:</strong> {selectedPrize.name}
            </p>
            <label htmlFor="shippingAddress" className="shipping-label">
              Shipping Address:
            </label>
            <textarea
              className="shipping-textarea"
              rows="4"
              placeholder="Enter your shipping address..."
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
            <div className="modal-actions">
              <button className="dashboard-button" onClick={handleSubmit}>
                Confirm
              </button>
              <button
                className="dashboard-button cancel"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prize;
