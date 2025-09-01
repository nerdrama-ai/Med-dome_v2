import { useState, useEffect } from "react";

export default function DoctorForm({ onSave, doctor }) {
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    specialization: "",
    experienceYears: "",
    education: "",
    bio: "",
    available: true,
    phone: "",
    email: "",
    hospital: "",
    fee: "",
    rating: "",
    treatments: "",
    nextAvailable: "",
    address: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert treatments string → array
    const dataToSave = {
      ...formData,
      experienceYears: Number(formData.experienceYears),
      fee: Number(formData.fee),
      rating: Number(formData.rating),
      treatments: formData.treatments
        ? formData.treatments.split(",").map((t) => t.trim())
        : [],
    };
    onSave(dataToSave);

    // reset form
    setFormData({
      name: "",
      photo: "",
      specialization: "",
      experienceYears: "",
      education: "",
      bio: "",
      available: true,
      phone: "",
      email: "",
      hospital: "",
      fee: "",
      rating: "",
      treatments: "",
      nextAvailable: "",
      address: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-white mb-4">
        {doctor ? "Edit Doctor" : "Add New Doctor"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
        required
      />

      <input
        type="text"
        name="photo"
        placeholder="Photo URL"
        value={formData.photo}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
      />

      <input
        type="text"
        name="specialization"
        placeholder="Specialization"
        value={formData.specialization}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
        required
      />

      <input
        type="number"
        name="experienceYears"
        placeholder="Years of Experience"
        value={formData.experienceYears}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
        required
      />

      <input
        type="text"
        name="education"
        placeholder="Education / Qualifications"
        value={formData.education}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
      />

      <textarea
        name="bio"
        placeholder="Short Bio"
        value={formData.bio}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
        rows="3"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
      />

      <input
        type="text"
        name="hospital"
        placeholder="Hospital / Clinic"
        value={formData.hospital}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
      />

      <input
        type="number"
        name="fee"
        placeholder="Consultation Fee"
        value={formData.fee}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
      />

      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Rating (0-5)"
        value={formData.rating}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
      />

      <input
        type="text"
        name="treatments"
        placeholder="Treatments (comma separated)"
        value={formData.treatments}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
      />

      <input
        type="text"
        name="nextAvailable"
        placeholder="Next Available (e.g., Today 4:00 PM)"
        value={formData.nextAvailable}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
      />

      <input
        type="text"
        name="address"
        placeholder="Clinic Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white/20 text-white"
      />

      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleChange}
          className="accent-green-500"
        />
        Available in Hospital
      </label>

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold"
      >
        {doctor ? "Update Doctor" : "Add Doctor"}
      </button>
    </form>
  );
}
