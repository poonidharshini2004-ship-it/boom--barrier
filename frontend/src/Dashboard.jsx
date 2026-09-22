import { useEffect, useState } from "react";
import {
  Car,
  ArrowDownToLine,
  ArrowUpFromLine,
  CircleCheck,
  Activity,
} from "lucide-react";

import "./index.css";

function Dashboard() {
  const [data, setData] = useState({
    total_vehicles: 0,
    entries: 0,
    exits: 0,
    inside: 0,
    records: [],
  });

  const [loading, setLoading] = useState(true);

  // Load dashboard data from Django
  const loadDashboard = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8001/api/vehicles/dashboard/"
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();

      setData({
        total_vehicles: result.total_vehicles ?? 0,
        entries: result.entries ?? 0,
        exits: result.exits ?? 0,
        inside: result.inside ?? 0,
        records: Array.isArray(result.records) ? result.records : [],
      });
    } catch (error) {
      console.error("Dashboard API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load when page opens
  useEffect(() => {
    loadDashboard();

    // Refresh every 3 seconds
    const timer = setInterval(() => {
      loadDashboard();
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Welcome Back</h1>
          <p>Monitor your gate, vehicles and access activity</p>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p style={{ marginBottom: "20px" }}>
          Loading dashboard...
        </p>
      )}

      {/* STAT CARDS */}
      <div className="stats">

        {/* TOTAL VEHICLES */}
        <div className="stat-card">
          <div className="stat-icon blue">
            <Car size={24} />
          </div>

          <div>
            <p>Total Vehicles</p>
            <h2>{data.total_vehicles}</h2>
            <small>Authorized vehicles</small>
          </div>
        </div>

        {/* ENTRIES */}
        <div className="stat-card">
          <div className="stat-icon purple">
            <ArrowDownToLine size={24} />
          </div>

          <div>
            <p>Vehicle Entries</p>
            <h2>{data.entries}</h2>
            <small>Vehicles entered today</small>
          </div>
        </div>

        {/* EXITS */}
        <div className="stat-card">
          <div className="stat-icon orange">
            <ArrowUpFromLine size={24} />
          </div>

          <div>
            <p>Vehicle Exits</p>
            <h2>{data.exits}</h2>
            <small>Vehicles exited today</small>
          </div>
        </div>

        {/* INSIDE */}
        <div className="stat-card">
          <div className="stat-icon green">
            <CircleCheck size={24} />
          </div>

          <div>
            <p>Inside Premises</p>
            <h2>{data.inside}</h2>
            <small>Currently inside</small>
          </div>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="form-card">

        <div className="form-title">

          <div className="page-icon">
            <Activity size={24} />
          </div>

          <div>
            <h2>Recent Vehicle Activity</h2>
            <p>Latest entry and exit records</p>
          </div>

        </div>

        {/* TABLE */}
        <div className="plate-table">

          {/* HEADER */}
          <div className="plate-row entry-head">
            <span>Vehicle Number</span>
            <span>Type</span>
            <span>Movement</span>
            <span>Time</span>
            <span>Status</span>
          </div>

          {/* NO DATA */}
          {data.records.length === 0 ? (

            <div className="plate-row">
              <span>No records yet</span>
            </div>

          ) : (

            /* DATA */
            data.records.map((item, index) => (

              <div className="plate-row" key={index}>

                <strong>
                  {item.vehicle_number || "-"}
                </strong>

                <span>
                  {item.vehicle_type || "-"}
                </span>

                <span>
                  {item.movement || "-"}
                </span>

                <span>
                  {item.time || "-"}
                </span>

                <span className="badge success">

                  <CircleCheck size={13} />

                  {item.status || "Active"}

                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;