import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDoctors, getAppointments } from "../utils/storage";
import DoctorCard from "../components/DoctorCard";

export default function Admin() {
  const { doctors = [], updateDoctor, removeDoctor } = useDoctors();
  const [search, setSearch] = useState("");

  const appts = useMemo(() => {
    const raw = getAppointments();
    return Array.isArray(raw)
      ? [...raw].sort((a, b) => b.createdAt - a.createdAt)
      : [];
  }, []);

  function toggleAvail(id, available) {
    updateDoctor(id, { available: !available });
  }

  function remove(id) {
    if (!confirm("Remove this doctor?")) return;
    removeDoctor(id);
  }

  // Filter doctors by search term
  const filteredDoctors = doctors.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Hospital Dashboard</h2>
        <Link to="/hospital">
          <button className="btn primary">Hospital Portal</button>
        </Link>
      </header>

      {/* Appointment Requests */}
      <section className="panel">
        <h3 className="text-xl font-semibold text-white mb-2">
          Recent Appointment Requests
        </h3>
        {appts.length === 0 ? (
          <div className="text-gray-300">No appointments yet.</div>
        ) : (
          <table className="table w-full text-sm text-left">
            <thead>
              <tr>
                <th className="p-2">When</th>
                <th className="p-2">Doctor</th>
                <th className="p-2">Patient</th>
                <th className="p-2">Slot</th>
                <th className="p-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {appts.map((a) => (
                <tr key={a.id} className="border-t border-gray-700">
                  <td className="p-2">
                    {new Date(a.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2">{a.doctorName}</td>
                  <td className="p-2">{a.patient?.name}</td>
                  <td className="p-2">{a.slot}</td>
                  <td className="p-2">{a.patient?.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Doctors List */}
      <section className="panel">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">
            Doctors ({filteredDoctors.length})
          </h3>
          <div className="flex gap-3">
            {/* Search Box */}
            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
            />
            {/* Add Doctor */}
            <Link to="/admin/add-doctor">
              <button className="btn primary">+ Add Doctor</button>
            </Link>
          </div>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-gray-300">No doctors found.</div>
        ) : (
          <div className="doctor-grid grid gap-4 md:grid-cols-3">
            {filteredDoctors.map((d) => (
              <div key={d.id} className="relative">
                <DoctorCard d={d} />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className={`px-2 py-1 text-xs rounded ${
                      d.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                    onClick={() => toggleAvail(d.id, d.available)}
                  >
                    {d.available ? "Available" : "Unavailable"}
                  </button>
                  <button
                    onClick={() => remove(d.id)}
                    className="px-2 py-1 text-xs rounded bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
