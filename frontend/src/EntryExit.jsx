import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Car,
  CircleCheck,
} from "lucide-react";

function EntryExit() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [movement, setMovement] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleMovement = async (type) => {
    if (!vehicleNumber.trim()) {
      setMessage("Please enter vehicle number");
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8001/api/entry-exit/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicle_number: vehicleNumber.trim(),
            movement_type: type,
          }),
        }
      );

      const data = await response.json();

      setMovement(type);

      if (response.ok && data.success) {
        setMessage(data.message);
        setSuccess(true);
      } else {
        setMessage(data.error || data.message || "Something went wrong");
        setSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setMessage("Cannot connect to Django server");
      setSuccess(false);
    }
  };

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Entry / Exit</h1>
          <p>Monitor vehicle entry and exit activity</p>
        </div>
      </div>

      <div className="form-card">

        <div className="form-title">
          <div className="page-icon">
            <Car size={24} />
          </div>

          <div>
            <h2>Vehicle Movement</h2>
            <p>Enter vehicle number and select movement</p>
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

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "20px",
            }}
          >

            {/* ENTRY BUTTON */}
            <button
              type="button"
              onClick={() => handleMovement("Entry")}
              style={{
                padding: "12px 25px",
                background: "#2fa866",
                color: "white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ArrowDownToLine size={18} />
              Vehicle Entry
            </button>

            {/* EXIT BUTTON */}
            <button
              type="button"
              onClick={() => handleMovement("Exit")}
              style={{
                padding: "12px 25px",
                background: "#e28b25",
                color: "white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ArrowUpFromLine size={18} />
              Vehicle Exit
            </button>

          </div>

          {movement && (
            <p style={{ marginTop: "15px" }}>
              Selected movement: <b>{movement}</b>
            </p>
          )}

          {message && (
            <div
              style={{
                marginTop: "25px",
                padding: "14px",
                borderRadius: "8px",
                background: success ? "#e5f8ee" : "#ffe8e8",
                color: success ? "#27945b" : "#d33",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {success && <CircleCheck size={18} />}
              {message}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default EntryExit;