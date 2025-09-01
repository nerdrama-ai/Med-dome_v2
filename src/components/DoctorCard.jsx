import React from "react";
import { Link } from "react-router-dom";

export default function DoctorCard({ d }) {
  return (
    <div className="card">
      <div className="row">
        <img src={d.photo} alt={d.name} className="doctor-photo" />
        <div>
          <h3>{d.name}</h3>
          <div className="muted">
            {d.specialization} • {d.experienceYears} yrs exp
          </div>
          <div className="tags">
            <span className={"badge " + (d.available ? "ok" : "warn")}>
              <span className={"dot " + (d.available ? "ok" : "warn")}></span>
              {d.available ? "In Hospital" : "Away"}
            </span>
            <span className="badge">Fee ₹{d.fee}</span>
            <span className="badge">★ {d.rating}</span>
          </div>
        </div>
      </div>
      <div className="actions">
        <Link className="btn primary" to={`/doctor/${d.id}`}>
          View & Book
        </Link>
        <a className="btn" href={`tel:${d.phone.replace(/\s+/g, "")}`}>
          Call
        </a>
      </div>
    </div>
  );
}
