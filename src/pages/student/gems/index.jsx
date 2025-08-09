import { useState, useEffect } from "react";
import loader from "../../../assets/images/loader.gif";
import toast from "react-hot-toast";
import parentService from "../../../_services/parent.service";
import { getChildId } from "../../../_store/_reducers/auth";
import { useSelector } from "react-redux";

const StudentGems = () => {
  const [loading, setLoading] = useState(false);
  const [gemsData, setGemsData] = useState([]); // Store all gems data
  const [filteredGems, setFilteredGems] = useState([]); // Store filtered gems
  const [selectedDate, setSelectedDate] = useState(""); // Store selected date
  const childId = useSelector(getChildId);

  // Fetch Gems data
  const fetchGems = async () => {
    setLoading(true);
    try {
      const response = await parentService.getGemHistory(childId);
      const data = response.data || [];
      setGemsData(data); // Set all data
      // Set all attempts as default (flattened from all gems)
      setFilteredGems(data.flatMap((gem) => gem.attempts || []));
    } catch (error) {
      toast.error("Error fetching gems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGems();
  }, [childId]);

  // Format source string (capitalize each word)
  const formatSource = (source) => {
    if (!source) {
      return ""; // Return empty string if source is undefined or null
    }
    return source
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Handle date picker change
  const handleDateSelect = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);

    if (selected) {
      // Filter gems by the selected date
      const filtered = gemsData
        .flatMap((gem) => gem.attempts) // Flatten the attempts array
        .filter((attempt) => attempt.date_earned === selected); // Filter by date_earned
      setFilteredGems(filtered);
    } else {
      // Show all attempts if no date is selected
      setFilteredGems(gemsData.flatMap((gem) => gem.attempts)); // Show all by default
    }
  };

  // Get unique dates for filtering
  const getUniqueDates = () => {
    const dates = gemsData.flatMap((gem) =>
      gem.attempts.map((attempt) => attempt.date_earned)
    );
    return [...new Set(dates)];
  };

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">Gems Award History</h2>

      {loading ? (
        <div className="text-center">
          <img src={loader} width={100} alt="Loading..." />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            {/* Display User Information */}
            {gemsData.length > 0 && (
              <div className="card shadow-sm w-100">
                <div className="card-body d-flex align-items-start">
                  <div className="w-100">
                    <h5 className="card-title mb-3">
                      {gemsData[0].child_name}
                    </h5>
                    <p className="mb-2">
                      <strong>Total Gems: </strong>
                      <i className="ph ph-sketch-logo"></i>
                      {gemsData[0].total_gems}
                    </p>
                  </div>
                  <div className="w-50">
                    <label htmlFor="date-picker" className="form-label">
                      Filter by Date:
                    </label>
                    <input
                      type="date"
                      id="date-picker"
                      className="form-control"
                      value={selectedDate}
                      onChange={handleDateSelect}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Date Picker for Filter */}
          </div>

          {/* Display attempts (filtered by selected date) */}
          {filteredGems.length > 0 ? (
            filteredGems.map((attempt, attemptIndex) => (
              <div key={attemptIndex} className="card shadow-sm mb-4 w-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <strong className="badge bg-info mr-2">
                      {attempt.label}
                    </strong>
                    <strong className="badge bg-danger mr-2">
                      <i className="ph ph-sketch-logo"></i>
                      {attempt.gems} Gems
                    </strong>
                    <strong className="badge bg-warning">
                      {formatSource(attempt.source)}{" "}
                      {/* Format source if needed */}
                    </strong>
                  </div>
                  <div className="mb-2">
                    <strong>Date Earned: </strong>
                    {attempt.date_earned}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">
              No attempts recorded for the selected date
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default StudentGems;
