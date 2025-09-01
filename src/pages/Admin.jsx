import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDoctors, getAppointments } from "../utils/storage";
import DoctorCard from "../components/DoctorCard";

export default function Admin() {
  const { doctors = [], updateDoctor } = useDoctors();

  // Doctor search
  const [doctorSearch, setDoctorSearch] = useState("");

  // Appointment search & filters
  const [apptSearch, setApptSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch & sort appointments
  const appts = useMemo(() => {
    const raw = getAppointments();
    return Array.isArray(raw)
      ? [...raw].sort((a, b) => b.createdAt - a.createdAt)
      : [];
  }, []);

  // Doctor availability toggle
  function toggleAvail(id, available) {
    updateDoctor(id, { available: !available });
  }

  // Doctor search filter
  const filteredDoctors = doctors.filter(
    (d) =>
      d.name?.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  // Appointment filters
  const filteredAppts = useMemo(() => {
    return appts.filter((a) => {
      const matchesSearch =
        a.doctorName?.toLowerCase().includes(apptSearch.toLowerCase()) ||
        a.patient?.name?.toLowerCase().includes(apptSearch.toLowerCase()) ||
        a.patient?.phone?.toLowerCase().includes(apptSearch.toLowerCase());

      const matchesDate = selectedDate
        ? new Date(a.createdAt).toISOString().slice(0, 10) === selectedDate
        : true;

      return matchesSearch && matchesDate;
    });
  }, [appts, apptSearch, selectedDate]);

  // Update appointment status
  function updateAppointmentStatus(id, status) {
    const updated = appts.map((appt) =>
      appt.id === id ? { ...appt, status } : appt
    );
    localStorage.setItem("appointments", JSON.stringify(updated));
  }

  return (
    <div className="p-6 space-y-10 bg-gray-950 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          🏥 Hospital Dashboard
        </h2>
        <Link to="/hospital">
          <button className="btn primary px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg transition-all duration-300">
            Hospital Portal
          </button>
        </Link>
      </header>

      {/* ================== Appointments Section ================== */}
      <section className="panel bg-gray-900 rounded-2xl p-6 shadow-lg space-y-6">
        {/* Header + Controls */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h3 className="text-2xl font-semibold text-white">
            Appointment Requests ({appts.length})
          </h3>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Futuristic Search */}
            <input
              type="text"
              placeholder="🔍 Search by doctor, patient, or phone..."
              value={apptSearch}
              onChange={(e) => setApptSearch(e.target.value)}
              className="px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700
                         focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 w-full md:w-72"
            />

            {/* Date Filter */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-800 text-white border border-gray-700
                         focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
            />
          </div>
        </div>

        {/* Appointment Table */}
        {filteredAppts.length === 0 ? (
          <div className="text-gray-400 text-center py-8 text-lg">
            No appointments match your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-sm text-left border border-gray-800 rounded-xl overflow-hidden">
              <thead className="bg-gray-800 text-gray-300 uppercase tracking-wide text-xs">
                <tr>
                  <th className="p-3">When</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Slot</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppts.map((a) => (
                  <tr
                    key={a.id}
                    className="border-t border-gray-700 hover:bg-gray-800/60 transition-all"
                  >
                    <td className="p-3">{new Date(a.createdAt).toLocaleString()}</td>
                    <td className="p-3">{a.doctorName}</td>
                    <td className="p-3">{a.patient?.name}</td>
                    <td className="p-3">{a.slot}</td>
                    <td className="p-3">{a.patient?.phone}</td>
                    <td className="p-3">
                      <select
                        value={a.status || "pending"}
                        onChange={(e) =>
                          updateAppointmentStatus(a.id, e.target.value)
                        }
                        className="px-3 py-1 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm
                                   focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="completed">✅ Completed</option>
                        <option value="cancelled">❌ Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ================== Doctors Section ================== */}
      <section className="panel bg-gray-900 rounded-2xl p-6 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h3 className="text-2xl font-semibold text-white">
            Doctors Roster ({filteredDoctors.length})
          </h3>

          {/* Futuristic Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="🔍 Search by name or specialization..."
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700
                         focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
            />
          </div>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-gray-400 text-center py-8 text-lg">
            No doctors match your search.
          </div>
        ) : (
          <div className="doctor-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((d) => (
              <div
                key={d.id}
                className="relative bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-cyan-500/40 
                           transition-all duration-300"
              >
                {/* Doctor Profile Card */}
                <DoctorCard d={d} />

                {/* Status Toggle */}
                <div className="absolute top-5 right-5">
                  <button
                    onClick={() => toggleAvail(d.id, d.available)}
                    className={`px-3 py-1 text-sm rounded-full font-medium shadow-md transition-all duration-300
                      ${d.available ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                  >
                    {d.available ? "Available" : "Unavailable"}
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
