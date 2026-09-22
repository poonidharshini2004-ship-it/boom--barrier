import { useState } from "react";
import { Construction, CircleCheck } from "lucide-react";

function BarrierStatus() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [status, setStatus] = useState("CLOSED");
  const [message, setMessage] = useState("");

  const checkVehicle = async () => {
    if (!vehicleNumber.trim()) {
      setMessage("Please enter vehicle number");
      setStatus("CLOSED");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8001/api/vehicles/check/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicle_number: vehicleNumber,
          }),
        }
      );

      const data = await response.json();

      setStatus(data.barrier);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
      setStatus("CLOSED");
      setMessage("Cannot connect to Django server");
    }
  };

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Barrier Status</h1>
          <p>Check vehicle access and barrier status</p>
        </div>
      </div>

      <div className="form-card">

        <div className="form-title">
          <div className="page-icon">
            <Construction size={24} />
          </div>

          <div>
            <h2>Gate Barrier</h2>
            <p>Vehicle access control</p>
          </div>
        </div>

        <div style={{ maxWidth: "600px" }}>

          <label>Vehicle Number</label>

          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="Example: TN 12 AB 1234"
          />

          <button
            type="button"
            onClick={checkVehicle}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              background: "#586bdc",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            Check Vehicle
          </button>

          <div
            style={{
              marginTop: "30px",
              padding: "25px",
              borderRadius: "12px",
              background: status === "OPEN" ? "#e5f8ee" : "#ffe8e8",
              textAlign: "center",
            }}
          >

            <Construction
              size={45}
              style={{
                color: status === "OPEN" ? "#27945b" : "#d33",
                marginBottom: "10px",
              }}
            />

            <h2
              style={{
                color: status === "OPEN" ? "#27945b" : "#d33",
              }}
            >
              BARRIER {status}
            </h2>

            {message && (
              <p style={{ marginTop: "8px" }}>
                {message}
              </p>
            )}

            {status === "OPEN" && (
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  color: "#27945b",
                }}
              >
                <CircleCheck size={16} />
                Access Allowed
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default BarrierStatus;