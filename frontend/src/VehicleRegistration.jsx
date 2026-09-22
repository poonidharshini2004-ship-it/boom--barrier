import { useState } from "react";
import { Car, CircleCheck } from "lucide-react";

function VehicleRegistration() {
  const [form, setForm] = useState({
    vehicle_number: "",
    vehicle_type: "Car",
    owner_name: "",
    phone_number: "",
    department: "",
    access_type: "Permanent",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8001/api/vehicles/add/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("Vehicle registered successfully!");

        setForm({
          vehicle_number: "",
          vehicle_type: "Car",
          owner_name: "",
          phone_number: "",
          department: "",
          access_type: "Permanent",
        });
      } else {
        setMessage("Registration failed");
      }
    } catch (error) {
      console.log(error);
      setMessage("Cannot connect to Django server");
    }
  };

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Vehicle Registration</h1>
          <p>Register an authorized vehicle</p>
        </div>
      </div>

      <div className="form-card">

        <div className="form-title">
          <div className="page-icon">
            <Car size={24} />
          </div>

          <div>
            <h2>Vehicle Details</h2>
            <p>Enter vehicle information below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}>

            <div>
              <label>Vehicle Number</label>
              <input
                type="text"
                name="vehicle_number"
                value={form.vehicle_number}
                onChange={handleChange}
                placeholder="TN 12 AB 1234"
                required
              />
            </div>

            <div>
              <label>Vehicle Type</label>
              <select
                name="vehicle_type"
                value={form.vehicle_type}
                onChange={handleChange}
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Bus">Bus</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div>
              <label>Owner Name</label>
              <input
                type="text"
                name="owner_name"
                value={form.owner_name}
                onChange={handleChange}
                placeholder="Enter owner name"
                required
              />
            </div>

            <div>
              <label>Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Enter department"
                required
              />
            </div>

            <div>
              <label>Access Type</label>
              <select
                name="access_type"
                value={form.access_type}
                onChange={handleChange}
              >
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            style={{
              marginTop: "25px",
              padding: "12px 25px",
              background: "#586bdc",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            Register Vehicle
          </button>

        </form>

        {message && (
          <div style={{
            marginTop: "20px",
            padding: "12px",
            background: "#e5f8ee",
            color: "#27945b",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <CircleCheck size={18} />
            {message}
          </div>
        )}

      </div>

    </div>
  );
}

export default VehicleRegistration;