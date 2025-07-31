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
    <div className="container mt-5">
      {loading ? (
        <div className="text-center">
          <img src={loader} alt="Loading..." className="my-5" />
        </div>
      ) : data.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.map((item) => (
            <div className="col" key={item.id}>
              <div className="card shadow-lg border-0 rounded-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top img-fluid"
                  style={{
                    height: "250px",
                    objectFit: "cover", 
                    borderRadius: "10px",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-dark">{item.name}</h5>
                  <p className="card-text text-muted">{item.description}</p>
                  <p className="card-text">
                    <strong>Gems Required:</strong> {item.gems_required}
                  </p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleRedeemClick(item)}
                  >
                    Redeem Prize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No Prizes Available</p>
      )}

      {showModal && selectedPrize && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="redeemModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="redeemModalLabel">Redeem Prize</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Prize:</strong> {selectedPrize.name}
                </p>
                <div className="mb-3">
                  <label htmlFor="shippingAddress" className="form-label">
                    Shipping Address
                  </label>
                  <textarea
                    id="shippingAddress"
                    className="form-control"
                    rows="4"
                    placeholder="Enter your shipping address..."
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSubmit}>
                  Confirm
                </button>
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prize;
