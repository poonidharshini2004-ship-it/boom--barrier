import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Car,
  Clock,
  CircleCheck,
} from "lucide-react";

import "../index.css";

function EntryExit() {
  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>Entry / Exit</h1>
          <p>Monitor vehicle entry and exit activity</p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="stats">

        <div className="stat-card">
          <div className="stat-icon green">
            <ArrowDownToLine size={24} />
          </div>

          <div>
            <p>Today's Entries</p>
            <h2>86</h2>
            <small>Vehicles entered</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <ArrowUpFromLine size={24} />
          </div>

          <div>
            <p>Today's Exits</p>
            <h2>64</h2>
            <small>Vehicles exited</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Car size={24} />
          </div>

          <div>
            <p>Inside Premises</p>
            <h2>22</h2>
            <small>Currently inside</small>
          </div>
        </div>

      </div>

      {/* ENTRY / EXIT TABLE */}
      <div className="form-card">

        <div className="form-title">
          <div className="page-icon">
            <ArrowDownToLine size={24} />
          </div>

          <div>
            <h2>Vehicle Movement</h2>
            <p>Latest entry and exit records</p>
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

          <div className="plate-row">
            <strong>TN 69 AB 1234</strong>
            <span>Car</span>

            <span className="movement entry-movement">
              <ArrowDownToLine size={15} />
              Entry
            </span>

            <span>10:42 AM</span>

            <span className="badge success">
              <CircleCheck size={13} />
              Allowed
            </span>
          </div>

          <div className="plate-row">
            <strong>TN 57 CD 4567</strong>
            <span>Car</span>

            <span className="movement exit-movement">
              <ArrowUpFromLine size={15} />
              Exit
            </span>

            <span>10:28 AM</span>

            <span className="badge success">
              <CircleCheck size={13} />
              Allowed
            </span>
          </div>

          <div className="plate-row">
            <strong>TN 38 EF 7890</strong>
            <span>Bike</span>

            <span className="movement entry-movement">
              <ArrowDownToLine size={15} />
              Entry
            </span>

            <span>10:15 AM</span>

            <span className="badge success">
              <CircleCheck size={13} />
              Allowed
            </span>
          </div>

          <div className="plate-row">
            <strong>TN 72 GH 2345</strong>
            <span>Van</span>

            <span className="movement entry-movement">
              <ArrowDownToLine size={15} />
              Entry
            </span>

            <span>09:56 AM</span>

            <span className="badge warning">
              <Clock size={13} />
              Pending
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default EntryExit;