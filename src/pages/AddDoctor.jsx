import React from "react";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import { useDoctors } from "../utils/storage";

export default function AddDoctor() {
  const { addDoctor } = useDoctors();
  const navigate = useNavigate();

  const handleSave = (doctor) => {
    addDoctor(doctor);
    navigate("/admin"); // go back to dashboard
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <DoctorForm onSave={handleSave} />
    </div>
  );
}
