import { useEffect, useState } from "react";
import { ScanLine, CircleCheck } from "lucide-react";

function NumberPlateRecords() {
  const [records, setRecords] = useState([]);

  const loadRecords = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8001/api/vehicles/dashboard/"
      );

      const data = await response.json();

      setRecords(data.records || []);
    } catch (error) {
      console.log("Error loading records:", error);
    }
  };

  useEffect(() => {
    loadRecords();

    const timer = setInterval(loadRecords, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Number Plate Records</h1>
          <p>View vehicle number plate records</p>
        </div>
      </div>

      <div className="form-card">

        <div className="form-title">

          <div className="page-icon">
            <ScanLine size={24} />
          </div>

          <div>
            <h2>Vehicle Records</h2>
            <p>Latest vehicle activity</p>
          </div>

        </div>

        <div className="plate-table">

          <div className="plate-row entry-head">
            <span>Vehicle Number</span>
            <span>Type</span>
            <span>Movement</span>
            <span>Time</span>
            <span>Status</span>
          </div>

          {records.length === 0 ? (

            <div className="plate-row">
              <span>No records found</span>
            </div>

          ) : (

            records.map((item, index) => (

              <div className="plate-row" key={index}>

                <strong>{item.vehicle_number}</strong>

                <span>{item.vehicle_type}</span>

                <span>{item.movement}</span>

                <span>{item.time}</span>

                <span className="badge success">
                  <CircleCheck size={13} />
                  {item.status}
                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default NumberPlateRecords;