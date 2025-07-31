import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import userServices from "../../../_services/user.service";
import { getChildId } from "../../../_store/_reducers/auth";
import { useSelector } from "react-redux";
import loader from "../../../assets/images/loader.gif";

const Logs = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const child_id = useSelector(getChildId);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await userServices.getLogs(child_id);
      setLogs(response.data);
    } catch (error) {
      toast.error("Error fetching logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Redemption Logs</h3>

      {loading ? (
        <div className="text-center">
          <img src={loader} width={100} alt="Loading..." />
        </div>
      ) : logs.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Gems Awarded</th>
                <th>Total Gems</th>
                <th>Redeemed At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log.id}>
                  <td>{index + 1}</td>
                  <td>{log.username}</td>
                  <td>{log.gems_awarded}</td>
                  <td>{log.total_gems}</td>
                  <td>{log.redeemed_at}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        log.status === "pending" ? "warning" : "success"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">No logs available.</p>
      )}
    </div>
  );
};

export default Logs;
