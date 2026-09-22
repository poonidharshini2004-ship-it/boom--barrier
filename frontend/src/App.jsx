import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import {
  LayoutDashboard,
  Car,
  ScanLine,
  ArrowLeftRight,
  Construction,
} from "lucide-react";

import Dashboard from "./Dashboard";
import VehicleRegistration from "./VehicleRegistration";
import NumberPlateRecords from "./NumberPlateRecords";
import EntryExit from "./EntryExit";
import BarrierStatus from "./BarrierStatus";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <aside className="sidebar">

          <div className="logo">
            <Construction size={28} />
            <span>BOOM BARRIER</span>
          </div>

          <nav>

            <Link to="/">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>

            <Link to="/vehicles">
              <Car size={20} />
              <span>Vehicle Registration</span>
            </Link>

            <Link to="/plates">
              <ScanLine size={20} />
              <span>Number Plate Records</span>
            </Link>

            <Link to="/entry-exit">
              <ArrowLeftRight size={20} />
              <span>Entry / Exit</span>
            </Link>

            <Link to="/barrier">
              <Construction size={20} />
              <span>Barrier Status</span>
            </Link>

          </nav>

        </aside>

        <main className="main-content">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route
              path="/vehicles"
              element={<VehicleRegistration />}
            />

            <Route
              path="/plates"
              element={<NumberPlateRecords />}
            />

            <Route
              path="/entry-exit"
              element={<EntryExit />}
            />

            <Route
              path="/barrier"
              element={<BarrierStatus />}
            />

          </Routes>

        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;