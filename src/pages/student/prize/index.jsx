import { useState, useEffect } from "react";
import loader from "../../../assets/images/loader.gif";
import toast from "react-hot-toast";
import { getaddress, getChildId } from "../../../_store/_reducers/auth";
import { useSelector } from "react-redux";
import userService from "../../../_services/user.service";

const Prize = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [childGems, setChildGems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const childId = useSelector(getChildId);
  const shipping = useSelector(getaddress);
  const fetchPrize = async () => {
    setLoading(true);
    try {
      const response = await userService.getViewPrize(childId);
      setData(response.data);
      if (response.data.length > 0) {
        setChildGems(response.data[0].user_gems);
      }
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
    setShippingAddress(shipping || "");
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
      fetchPrize();
    } catch (error) {
      toast.error("Failed to redeem prize.");
    }
  };

  const renderPrizeCard = (item) => {
    const canRedeem = item.is_redeem;

    return (
      <div className="col-12 col-sm-6 col-md-4 mb-4" key={item.id}>
        <div className="card h-100 shadow-sm border-0 rounded-4">
          <span className="badge bg-warning text-dark mb-3 position-absolute end-0">
            💎 {item.gems_required} Gems
          </span>
          <img
            src={item.image}
            alt={item.name}
            className="card-img-top rounded-top"
            style={{ height: "180px", objectFit: "cover" }}
          />
          <div className="card-body text-center d-flex flex-column justify-content-between">
            <h5 className="card-title fw-semibold text-dark mb-1">
              {item.name}
            </h5>
            <p className="card-text text-muted small">{item.description}</p>
            <button
              className={`btn btn-sm w-100 ${
                canRedeem ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => handleRedeemClick(item)}
              disabled={!canRedeem}
            >
              {canRedeem ? "Redeem Prize" : "Not Enough Gems"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const redeemablePrizes = data.filter((item) => item.is_redeem);
  const notEnoughGemsPrizes = data.filter((item) => !item.is_redeem);

  return (
    <div className="container py-5">
      <h3 className="text-center fw-bold mb-4">
        🎉 Your Gems: <span className="text-primary">{childGems}💎</span>
      </h3>

      {loading ? (
        <div className="text-center">
          <img src={loader} alt="Loading..." className="my-5" />
        </div>
      ) : data.length > 0 ? (
        <>
          <div className="mb-5">
            <h4 className="mb-3">🎁 Redeemable Prizes</h4>
            {redeemablePrizes.length > 0 ? (
              <div className="row">{redeemablePrizes.map(renderPrizeCard)}</div>
            ) : (
              <p className="text-muted">No redeemable prizes available.</p>
            )}
          </div>

          <div>
            <h4 className="mb-3">🔒 Locked Prizes</h4>
            {notEnoughGemsPrizes.length > 0 ? (
              <div className="row">
                {notEnoughGemsPrizes.map(renderPrizeCard)}
              </div>
            ) : (
              <p className="text-muted">You can redeem all prizes!</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-muted">No Prizes Available</p>
      )}

      {/* Modal */}
      {showModal && selectedPrize && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title">🎁 Redeem Prize</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Prize:</strong> {selectedPrize.name}
                </p>
                <div className="mb-3">
                  <label htmlFor="shippingAddress" className="form-label small">
                    Shipping Address
                  </label>
                  <textarea
                    id="shippingAddress"
                    className="form-control"
                    rows="3"
                    placeholder="Enter your shipping address..."
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer border-0 d-flex flex-column gap-2">
                <button
                  className="btn btn-success w-100 btn-sm text-white"
                  onClick={handleSubmit}
                >
                  Confirm Redemption
                </button>
                <button
                  className="btn btn-outline-secondary w-100 btn-sm"
                  onClick={handleCloseModal}
                >
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
