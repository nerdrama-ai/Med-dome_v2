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
    <div className="p-8 space-y-12 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen text-white">
      {/* Futuristic Header */}
      <header className="flex justify-between items-center border-b border-gray-800 pb-6">
        <h2 className="text-3xl font-bold tracking-wide text-cyan-400 drop-shadow-md">
          ⚡ Admin Control Center
        </h2>
        <Link to="/hospital">
          <button className="px-5 py-2 rounded-xl bg-cyan-500/90 hover:bg-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300">
            🌐 Hospital Portal
          </button>
        </Link>
      </header>

      {/* ================== Appointments Section ================== */}
<section className="panel bg-gray-900 rounded-2xl p-6 shadow-lg space-y-6">
  {/* Header + Controls */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
    <h3 className="text-2xl font-semibold text-white">
      Appointment Requests ({filteredAppts.length})
    </h3>

    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
      {/* Futuristic Search */}
      <input
        type="text"
        placeholder="🔍 Search doctor, patient, or phone..."
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

      {/* Status Filter */}
      <select
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-3 py-2 rounded-xl bg-gray-800 text-white border border-gray-700
                   focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
      >
        <option value="">All Statuses</option>
        <option value="pending">⏳ Pending</option>
        <option value="completed">✅ Completed</option>
        <option value="cancelled">❌ Cancelled</option>
      </select>
    </div>
  </div>

  {/* Appointment Table */}
  {filteredAppts.length === 0 ? (
    <div className="text-gray-400 text-center py-8 text-lg">
      No appointments match your filters.
    </div>
  ) : (
    <div className="overflow-x-auto rounded-xl border border-gray-800">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-800/80 text-gray-300 uppercase tracking-wide text-xs">
          <tr>
            <th className="p-4">When</th>
            <th className="p-4">Doctor</th>
            <th className="p-4">Patient</th>
            <th className="p-4">Slot</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppts.map((a) => (
            <tr
              key={a.id}
              className="border-t border-gray-700 hover:bg-gray-800/60 transition-all"
            >
              <td className="p-4">{new Date(a.createdAt).toLocaleString()}</td>
              <td className="p-4">{a.doctorName}</td>
              <td className="p-4">{a.patient?.name}</td>
              <td className="p-4">{a.slot}</td>
              <td className="p-4">{a.patient?.phone}</td>
              <td className="p-4">
                <select
                  value={a.status || "pending"}
                  onChange={(e) => updateAppointmentStatus(a.id, e.target.value)}
                  className={`px-3 py-1 rounded-full font-medium text-sm shadow-md transition-all
                    ${
                      a.status === "completed"
                        ? "bg-green-600 text-white"
                        : a.status === "cancelled"
                        ? "bg-red-600 text-white"
                        : "bg-amber-500 text-black"
                    }`}
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
      {/* ================== Doctors Roster ================== */}
<section className="panel bg-gray-900 rounded-2xl p-6 shadow-lg space-y-6">
  {/* Header + Search */}
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

  {/* Doctors Grid */}
  {filteredDoctors.length === 0 ? (
    <div className="text-gray-400 text-center py-8 text-lg">
      No doctors match your search.
    </div>
  ) : (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredDoctors.map((d) => (
        <div
          key={d.id}
          className="relative group bg-gray-800/80 rounded-2xl border border-gray-700 
                     shadow-lg p-6 hover:shadow-cyan-500/40 hover:border-cyan-400 
                     transition-all duration-300 flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 
                          flex items-center justify-center text-2xl font-bold text-white 
                          shadow-lg group-hover:scale-105 transform transition-all duration-300 mb-4">
            {d.name?.charAt(0) || "D"}
          </div>

          {/* Doctor Info */}
          <h4 className="text-lg font-semibold text-white">{d.name}</h4>
          <p className="text-sm text-gray-400">{d.specialization}</p>

          {/* Contact / Meta Info */}
          {d.email && (
            <p className="text-xs text-gray-500 mt-1">{d.email}</p>
          )}
          {d.phone && (
            <p className="text-xs text-gray-500">{d.phone}</p>
          )}

          {/* Availability Toggle */}
          <div className="mt-5">
            <button
              onClick={() => toggleAvail(d.id, d.available)}
              className={`px-4 py-1.5 rounded-full font-medium text-sm shadow-md transition-all
                ${d.available 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "bg-red-600 hover:bg-red-700 text-white"}`}
            >
              {d.available ? "✅ Available" : "❌ Unavailable"}
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
