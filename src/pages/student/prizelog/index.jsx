import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import userServices from "../../../_services/user.service";
import { getChildId } from "../../../_store/_reducers/auth";
import { useSelector } from "react-redux";
import loader from "../../../assets/images/loader.gif";

const STATUS_COLORS = {
  pending: "warning",
  processing: "info",
  shipped: "primary",
  completed: "success",
  canceled: "secondary",
};

const toBadge = (status) => {
  const key = String(status || "").toLowerCase();
  return (
    <span className={`badge bg-${STATUS_COLORS[key] || "secondary"}`}>
      {key || "-"}
    </span>
  );
};

const fmt = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleString();
};

const normalize = (logs = []) => {
  // Group by redemption_request_id
  const map = new Map();
  for (const log of logs) {
    const req = log?.redemption_request || {};
    const reqId = req?.id || log?.redemption_request_id || log?.id; // fallback guard
    if (!map.has(reqId)) {
      map.set(reqId, {
        requestId: reqId,
        status: req?.status,
        gems_used: req?.gems_used,
        tracking_code: req?.tracking_code,
        logistic_partner: req?.logistic_partner,
        shipping_address: req?.shipping_address,
        created_at: req?.created_at,
        updated_at: req?.updated_at,
        prize: req?.prize || null,
        user: log?.user || null,
        logs: [],
      });
    }
    map.get(reqId).logs.push(log);
  }

  // Sort logs per request by created_at asc (timeline)
  const requests = [...map.values()].map((r) => ({
    ...r,
    logs: r.logs.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    ),
    latest_at:
      r.logs.length > 0
        ? r.logs[r.logs.length - 1].created_at
        : r.updated_at || r.created_at,
  }));

  // Sort requests by latest activity desc
  requests.sort((a, b) => new Date(b.latest_at) - new Date(a.latest_at));
  return requests;
};

const TrackRequests = () => {
  const [loading, setLoading] = useState(false);
  const [allLogs, setAllLogs] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const childId = useSelector(getChildId);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // IMPORTANT: this endpoint should return RedemptionLogResource collection (with user + redemptionRequest)
      const res = await userServices.getLogs(childId);
      setAllLogs(res?.data ?? []);
    } catch (e) {
      toast.error("Error fetching logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (childId) fetchLogs();
    // re-fetch when child changes
  }, [childId]);

  const requests = useMemo(() => normalize(allLogs), [allLogs]);

  const filtered = useMemo(() => {
    let list = requests;
    if (statusFilter !== "all") {
      list = list.filter(
        (r) => String(r.status).toLowerCase() === statusFilter
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((r) => {
        const prizeName = r.prize?.name || r.prize?.title || "";
        const tracking = r.tracking_code || "";
        const lp = r.logistic_partner || "";
        const user = r.user
          ? `${r.user.first_name ?? ""} ${r.user.last_name ?? ""}`
          : "";
        return (
          prizeName.toLowerCase().includes(q) ||
          String(r.requestId).toLowerCase().includes(q) ||
          tracking.toLowerCase().includes(q) ||
          lp.toLowerCase().includes(q) ||
          user.toLowerCase().includes(q)
        );
      });
    }
    return list;
  }, [requests, query, statusFilter]);

  return (
    <div className="mt-4">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <h3 className="mb-0">Track Requests</h3>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search prize, tracking, user, request ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ minWidth: 260 }}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <img src={loader} width={100} alt="Loading..." />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted my-5">No requests found.</p>
      ) : (
        <div className="row g-3">
          {filtered.map((r) => (
            <div className="col-12" key={r.requestId}>
              <div className="card shadow-sm">
                <div className="card-body">
                  {/* Header */}
                  <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center gap-2">
                        <h5 className="mb-0">Request #{r.requestId}</h5>
                        {toBadge(r.status)}
                      </div>
                      <small className="text-muted">
                        Latest activity: {fmt(r.latest_at)} • Created:{" "}
                        {fmt(r.created_at)}
                      </small>
                    </div>
                    <div className="text-end">
                      <div className="fw-semibold">
                        {r.prize?.name || r.prize?.title || "Prize"}
                        {r.prize?.sku ? (
                          <span className="text-muted"> • {r.prize.sku}</span>
                        ) : null}
                      </div>
                      <small className="text-muted">
                        Gems used: <strong>{r.gems_used ?? "-"}</strong>
                      </small>
                    </div>
                  </div>

                  {/* Quick fields */}
                  <div className="row mt-3 gy-2">
                    <div className="col-md-3">
                      <div className="small text-muted">Tracking</div>
                      {r.tracking_code ? (
                        <div className="fw-semibold">{r.tracking_code}</div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                      {r.logistic_partner ? (
                        <small className="text-muted">
                          {r.logistic_partner}
                        </small>
                      ) : null}
                    </div>
                    <div className="col-md-5">
                      <div className="small text-muted">Shipping</div>
                      {r.shipping_address ? (
                        <div className="fw-semibold">
                          {typeof r.shipping_address === "string" ? (
                            <span>{r.shipping_address}</span>
                          ) : (
                            <>
                              {r.shipping_address.name && (
                                <>
                                  {r.shipping_address.name}
                                  <br />
                                </>
                              )}
                              {r.shipping_address.address1 && (
                                <>
                                  {r.shipping_address.address1}
                                  <br />
                                </>
                              )}
                              {r.shipping_address.address2 && (
                                <>
                                  {r.shipping_address.address2}
                                  <br />
                                </>
                              )}
                              {(r.shipping_address.city ||
                                r.shipping_address.state ||
                                r.shipping_address.zip) && (
                                <>
                                  {r.shipping_address.city || ""}
                                  {r.shipping_address.city &&
                                  r.shipping_address.state
                                    ? ", "
                                    : ""}
                                  {r.shipping_address.state || ""}{" "}
                                  {r.shipping_address.zip || ""}
                                  <br />
                                </>
                              )}
                              {r.shipping_address.country || ""}
                              {r.shipping_address.phone && (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    {r.shipping_address.phone}
                                  </small>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <div className="small text-muted">User</div>
                      <div className="fw-semibold">
                        {r.user
                          ? `${r.user.first_name ?? ""} ${
                              r.user.last_name ?? ""
                            }`.trim() || r.user.email
                          : "-"}
                      </div>
                      {r.user?.email && (
                        <small className="text-muted">{r.user.email}</small>
                      )}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-4">
                    <div className="small text-muted mb-2">Status timeline</div>
                    <ul className="list-group">
                      {r.logs.map((log) => (
                        <li key={log.id} className="list-group-item">
                          <div className="d-flex justify-content-between flex-wrap gap-2">
                            <div>
                              <div className="fw-semibold">
                                {log.action || "Status Update"} •{" "}
                                {toBadge(log.new_status)}
                              </div>
                              <div className="text-muted small">
                                {log.old_status ? (
                                  <>
                                    Changed from{" "}
                                    <strong>{log.old_status}</strong> →{" "}
                                    <strong>{log.new_status}</strong>
                                  </>
                                ) : (
                                  <>
                                    Set to{" "}
                                    <strong>{log.new_status || "-"}</strong>
                                  </>
                                )}
                                {log.new_tracking_code ? (
                                  <>
                                    {" "}
                                    • Tracking:{" "}
                                    <strong>{log.new_tracking_code}</strong>
                                  </>
                                ) : null}
                                {log.new_logistic_partner ? (
                                  <>
                                    {" "}
                                    • Carrier:{" "}
                                    <strong>{log.new_logistic_partner}</strong>
                                  </>
                                ) : null}
                              </div>
                              {log.notes && (
                                <div className="mt-1">{log.notes}</div>
                              )}
                            </div>
                            {/* Timeline item footer (who changed) */}
                            <div className="text-end">
                              <div className="small text-muted">
                                {fmt(log.created_at)}
                              </div>
                              {log.changed_by_user ? (
                                <div className="small">
                                  by {log.changed_by_user.first_name ?? ""}{" "}
                                  {log.changed_by_user.last_name ?? ""}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackRequests;
