import { useState, useEffect } from "react";

const LS_KEYS = {
  DOCTORS: "carenow_doctors",
  APPTS: "carenow_appointments",
};

const seeds = [
  {
    id: "d1",
    name: "Dr. Ananya Rao",
    specialization: "Cardiologist",
    experienceYears: 12,
    photo:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=800&auto=format&fit=crop",
    phone: "+91 98765 43210",
    email: "ananya.rao@carenow.example",
    available: true,
    languages: ["English", "Hindi", "Kannada"],
    education: "MBBS (AIIMS), MD Cardiology (JIPMER)",
    hospital: "CareNow SuperSpeciality, Bengaluru",
    fee: 1200,
    rating: 4.8,
    bio: "Interventional cardiologist with a focus on preventive care, lipid management, and minimally invasive procedures.",
    treatments: ["ECG", "TMT", "Angiography", "Heart Failure Mgmt"],
    nextAvailable: "Today 4:00 PM",
    address: "12, MG Road, Bengaluru 560001",
  },
  {
    id: "d2",
    name: "Dr. Arjun Mehta",
    specialization: "Orthopedic Surgeon",
    experienceYears: 9,
    photo:
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=800&auto=format&fit=crop",
    phone: "+91 98000 11123",
    email: "arjun.mehta@carenow.example",
    available: false,
    languages: ["English", "Hindi", "Marathi"],
    education: "MBBS (KEM), MS Ortho (Seth GS)",
    hospital: "CareNow Ortho Center, Mumbai",
    fee: 900,
    rating: 4.6,
    bio: "Sports injuries, arthroscopy, and joint preservation with emphasis on early rehab.",
    treatments: ["Arthroscopy", "Fracture Fixation", "ACL Repair"],
    nextAvailable: "Tomorrow 11:30 AM",
    address: "301, Marine Drive, Mumbai 400002",
  },
  {
    id: "d3",
    name: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    experienceYears: 7,
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    phone: "+91 90001 22234",
    email: "priya.sharma@carenow.example",
    available: true,
    languages: ["English", "Hindi"],
    education: "MBBS (LHMC), MD Dermatology (PGIMER)",
    hospital: "CareNow Skin Clinic, Delhi",
    fee: 700,
    rating: 4.7,
    bio: "Medical & cosmetic dermatology with evidence-led protocols.",
    treatments: ["Acne Care", "Chemical Peels", "Laser", "PRP"],
    nextAvailable: "Today 5:15 PM",
    address: "22, Green Park, New Delhi 110016",
  },
];

// 🔹 Hook version (used in Admin.jsx)
export function useDoctors() {
  const [doctors, setDoctors] = useState(() => {
    const raw = localStorage.getItem(LS_KEYS.DOCTORS);
    if (!raw) {
      localStorage.setItem(LS_KEYS.DOCTORS, JSON.stringify(seeds));
      return seeds;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return seeds;
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEYS.DOCTORS, JSON.stringify(doctors));
  }, [doctors]);

  return [doctors, setDoctors];
}

// 🔹 Non-hook utilities (for flexibility)
export function getDoctors() {
  const raw = localStorage.getItem(LS_KEYS.DOCTORS);
  if (!raw) {
    localStorage.setItem(LS_KEYS.DOCTORS, JSON.stringify(seeds));
    return seeds;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return seeds;
  }
}

export function saveDoctors(list) {
  localStorage.setItem(LS_KEYS.DOCTORS, JSON.stringify(list));
}

export function getAppointments() {
  const raw = localStorage.getItem(LS_KEYS.APPTS);
  if (!raw) {
    localStorage.setItem(LS_KEYS.APPTS, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAppointments(list) {
  localStorage.setItem(LS_KEYS.APPTS, JSON.stringify(list));
}

export function upsertDoctor(doc) {
  const docs = getDoctors();
  const idx = docs.findIndex((d) => d.id === doc.id);
  if (idx >= 0) docs[idx] = doc;
  else
    docs.push({ ...doc, id: "d" + Math.random().toString(36).slice(2, 8) });
  saveDoctors(docs);
  return docs;
}

export function addAppointment(appt) {
  const appts = getAppointments();
  appts.push({
    id: "a" + Math.random().toString(36).slice(2, 8),
    createdAt: Date.now(),
    ...appt,
  });
  saveAppointments(appts);
  return appts;
}
