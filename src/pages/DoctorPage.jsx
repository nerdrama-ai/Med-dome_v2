import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDoctors, addAppointment } from '../utils/storage.js'

export default function DoctorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doc = useMemo(() => getDoctors().find(x => x.id === id), [id])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [slot, setSlot] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('')

  if (!doc) return <div className="panel">Doctor not found.</div>

  function requestAppointment(e){
    e.preventDefault()
    if (!name || !phone || !slot) { setStatus('Please fill Name, Phone and Slot'); return }
    addAppointment({ doctorId: doc.id, doctorName: doc.name, slot, patient: { name, phone, email, notes }})
    setStatus('success')
    setTimeout(() => navigate('/'), 1200)
  }

  const slots = [
    'Today 4:00 PM', 'Today 4:30 PM', 'Today 5:15 PM',
    'Tomorrow 10:00 AM', 'Tomorrow 11:30 AM', 'Tomorrow 3:00 PM'
  ]

  return (
    <div className="detail">
      <aside className="panel">
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <img src={doc.photo} alt={doc.name} style={{width:88, height:88, borderRadius:16, objectFit:'cover', border:'1px solid var(--border)'}}/>
          <div>
            <h2 style={{margin:'0 0 4px 0'}}>{doc.name}</h2>
            <div className="muted">{doc.specialization} • {doc.experienceYears} yrs</div>
            <div className="section">
              <span className={'tag'}><span className={'dot ' + (doc.available ? 'ok' : 'warn')}></span>{doc.available ? 'In Hospital' : 'Away'}</span>
              <span className="tag">Fee ₹{doc.fee}</span>
              <span className="tag">★ {doc.rating}</span>
            </div>
          </div>
        </div>

        <div className="section">
          <h4>Quick Actions</h4>
          <div className="actions">
            <a className="btn primary" href={`tel:${doc.phone.replace(/\s+/g,'')}`}>Call</a>
            <a className="btn" href={`mailto:${doc.email}`}>Email</a>
          </div>
        </div>

        <div className="section">
          <h4>Next Availability</h4>
          <div className="small">{doc.nextAvailable}</div>
        </div>

        <div className="section">
          <h4>Practice Location</h4>
          <div className="small">{doc.hospital}</div>
          <div className="small">{doc.address}</div>
        </div>
      </aside>

      <section className="panel">
        <h3>About Doctor</h3>
        <p className="small">{doc.bio}</p>

        <div className="section">
          <h4>Credentials</h4>
          <div className="kv">
            <div>Education</div><div><strong>{doc.education}</strong></div>
            <div>Languages</div><div><strong>{(doc.languages||[]).join(', ')}</strong></div>
            <div>Experience</div><div><strong>{doc.experienceYears} years</strong></div>
            <div>Consultation Fee</div><div><strong>₹{doc.fee}</strong></div>
          </div>
        </div>

        <div className="section">
          <h4>Treatments</h4>
          {(doc.treatments||[]).map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className="section">
          <h4>Request Appointment</h4>
          <form className="form" onSubmit={requestAppointment}>
            <div className="form-row">
              <div>
                <label>Full Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Patient name" />
              </div>
              <div>
                <label>Phone</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91 ..." />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label>Email (optional)</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label>Preferred Slot</label>
                <select value={slot} onChange={e=>setSlot(e.target.value)}>
                  <option value="">Select a slot</option>
                  {slots.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label>Notes (symptoms, history)</label>
              <textarea rows={3} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Short description..." />
            </div>
            <div className="form-actions">
              <button className="btn primary" type="submit">Submit Request</button>
              <button className="btn" type="button" onClick={()=>{setName('');setPhone('');setEmail('');setSlot('');setNotes(''); setStatus('')}}>Reset</button>
            </div>
            {status === 'success' ? <div className="success">Request sent ✓ You will be contacted shortly.</div> : status ? <div className="error">{status}</div> : null}
          </form>
        </div>

        <div className="section">
          <h4>Clinic Schedule (sample)</h4>
          <table className="table">
            <thead><tr><th>Day</th><th>Timing</th><th>Mode</th></tr></thead>
            <tbody>
              <tr><td>Mon</td><td>10:00–13:00, 16:00–19:00</td><td>In-person</td></tr>
              <tr><td>Tue</td><td>10:00–13:00</td><td>In-person</td></tr>
              <tr><td>Wed</td><td>Teleconsults 17:00–19:00</td><td>Online</td></tr>
              <tr><td>Thu</td><td>Off</td><td>-</td></tr>
              <tr><td>Fri</td><td>10:00–13:00, 16:00–19:00</td><td>In-person</td></tr>
              <tr><td>Sat</td><td>10:00–14:00</td><td>In-person</td></tr>
              <tr><td>Sun</td><td>Emergency only</td><td>On call</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
