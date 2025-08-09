import { useState, useEffect } from "react";
import loader from "../../../assets/images/loader.gif";
import toast from "react-hot-toast";
import parentService from "../../../_services/parent.service";

const Gems = () => {
  const [loading, setLoading] = useState(false);
  const [gemsData, setGemsData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [filterType, setFilterType] = useState("all");

  const fetchGems = async () => {
    setLoading(true);
    try {
      const response = await parentService.getGem();
      setGemsData(response.data || []);
      if (response.data && response.data.length > 0) {
        setSelectedUser(response.data[0].child_name);
      }
    } catch (error) {
      toast.error("Error fetching gems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGems();
  }, []);

  const handleTabSwitch = (user) => {
    setSelectedUser(user);
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);
    setFilterType(date ? "date" : "all");
  };

  const clearDateFilter = () => {
    setSelectedDate("");
    setFilterType("all");
  };

  const filterGemsByDate = (gems, targetDate) => {
    if (!targetDate || filterType === "all") return gems;

    const filtered = {};
    
    if (gems.question_bank) {
      filtered.question_bank = {};
      Object.entries(gems.question_bank).forEach(([subject, gemTypes]) => {
        filtered.question_bank[subject] = {};
        Object.entries(gemTypes).forEach(([gemType, gemsArray]) => {
          const filteredGems = gemsArray.filter(gem => gem.date_earned === targetDate);
          if (filteredGems.length > 0) {
            filtered.question_bank[subject][gemType] = filteredGems;
          }
        });
        if (Object.keys(filtered.question_bank[subject]).length === 0) {
          delete filtered.question_bank[subject];
        }
      });
    }

    if (gems.assignment) {
      filtered.assignment = {};
      Object.entries(gems.assignment).forEach(([subject, gemTypes]) => {
        filtered.assignment[subject] = {};
        Object.entries(gemTypes).forEach(([gemType, gemsArray]) => {
          const filteredGems = gemsArray.filter(gem => gem.date_earned === targetDate);
          if (filteredGems.length > 0) {
            filtered.assignment[subject][gemType] = filteredGems;
          }
        });
        if (Object.keys(filtered.assignment[subject]).length === 0) {
          delete filtered.assignment[subject];
        }
      });
    }

    return filtered;
  };

  const filteredData = gemsData.filter((child) => child.child_name === selectedUser);

  const getFilteredChildData = (child) => {
    if (!child) return null;
    
    const filteredGems = filterGemsByDate(child.gems_summary, selectedDate);
    
    let totalFilteredGems = 0;
    
    if (filteredGems.question_bank) {
      Object.values(filteredGems.question_bank).forEach(subjects => {
        Object.values(subjects).forEach(gemTypes => {
          gemTypes.forEach(gem => {
            totalFilteredGems += parseInt(gem.gems) || 0;
          });
        });
      });
    }
    
    if (filteredGems.assignment) {
      Object.values(filteredGems.assignment).forEach(subjects => {
        Object.values(subjects).forEach(gemTypes => {
          gemTypes.forEach(gem => {
            totalFilteredGems += parseInt(gem.gems) || 0;
          });
        });
      });
    }

    return {
      ...child,
      gems_summary: filteredGems,
      total_gems: totalFilteredGems
    };
  };

  const hasFilteredData = (child) => {
    if (!child || !child.gems_summary) return false;
    
    const filtered = filterGemsByDate(child.gems_summary, selectedDate);
    
    const hasQuestionBank = filtered.question_bank && Object.keys(filtered.question_bank).length > 0;
    const hasAssignment = filtered.assignment && Object.keys(filtered.assignment).length > 0;
    
    return hasQuestionBank || hasAssignment;
  };

  return (
    <div className=" mt-4">
      <h3 className="mt-0 text-center heading-secondary">Gems History</h3>
      <div className="btn-group mb-4 d-flex align-items-end justify-content-between" role="group" aria-label="User Tabs">
        <div className="tabs-content">

        {gemsData.map((child) => (
          <button
            key={child.child_id}
            onClick={() => handleTabSwitch(child.child_name)}
            className={`btn btn-outline-primary ${selectedUser === child.child_name ? "active" : ""}`}
          >
            {child.child_name}
          </button>
        ))}
        </div>
        <div>

         <label htmlFor="dateFilter" className="form-label">Select Date</label>
         <div className="d-flex align-item-center gap-3">
           <input
                type="date"
                id="dateFilter"
                className="form-control"
                value={selectedDate}
                onChange={(e) => handleDateFilter(e.target.value)}
              />
           <button 
                className="btn btn-secondary w-100" 
                onClick={clearDateFilter}
                disabled={!selectedDate}
              >
                Clear
              </button>
         </div>
             
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        filteredData.map((child) => {
          const filteredChild = getFilteredChildData(child);
          
          if (!hasFilteredData(child) && selectedDate) {
            return (
              <div key={child.child_id} className="alert alert-info">
                No gems found for {child.child_name} on {new Date(selectedDate).toLocaleDateString()}
              </div>
            );
          }

          return (
            <div key={child.child_id} className="card mb-4">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 gems-container mb-3">
                  <i className="ph ph-sketch-logo"></i>
                  <div className="content">
                    <h5 className="card-title">{child.child_name}</h5>
                    <p className="card-text">
                      <strong>Total Gems: </strong> {filteredChild.total_gems}
                    </p>
                  </div>
                </div>
                <div className="gems-summary">
                  {filteredChild.gems_summary.question_bank && Object.keys(filteredChild.gems_summary.question_bank).length > 0 && (
                    <div className="gems-category">
                      <h6 className="mt-3">Question Bank</h6>
                      {Object.entries(filteredChild.gems_summary.question_bank).map(
                        ([subject, gemTypes]) => (
                          <div key={subject} className="subject">
                            <h6>{subject}</h6>
                            <ul className="list-unstyled">
                              {Object.entries(gemTypes).map(([gemType, gems]) =>
                                gems.map((gem, index) => (
                                  <li key={index}>
                                    <strong>{gemType}</strong> - {gem.gems} Gems
                                    <br />
                                    <small className="text-muted">
                                      (Date Earned: {new Date(gem.date_earned).toLocaleDateString()})
                                    </small>
                                  </li>
                                ))
                              )}
                            </ul>
                            <hr className="divider" />
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {filteredChild.gems_summary.assignment && Object.keys(filteredChild.gems_summary.assignment).length > 0 && (
                    <div className="gems-category">
                      <h6 className="mt-3">Assignments</h6>
                      {Object.entries(filteredChild.gems_summary.assignment).map(
                        ([subject, gemTypes]) => (
                          <div key={subject} className="subject">
                            <h6>{subject}</h6>
                            <ul className="list-unstyled">
                              {Object.entries(gemTypes).map(([gemType, gems]) =>
                                gems.map((gem, index) => (
                                  <li key={index}>
                                    <strong>{gemType}</strong> - {gem.gems} Gems
                                    <br />
                                    <small className="text-muted">
                                      (Date Earned: {new Date(gem.date_earned).toLocaleDateString()})
                                    </small>
                                  </li>
                                ))
                              )}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  
                  {selectedDate && !hasFilteredData(child) && (
                    <div className="alert alert-warning">
                      No gems earned on {new Date(selectedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Gems;
