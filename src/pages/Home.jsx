import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDoctors } from '../utils/storage.js'
import DoctorCard from '../components/DoctorCard.jsx'

export default function Home() {
  const [q, setQ] = useState('')
  const docs = useMemo(() => getDoctors(), [])

  const filtered = docs.filter(d => {
    const s = (d.name + ' ' + d.specialization + ' ' + (d.languages||[]).join(' ')).toLowerCase()
    return s.includes(q.toLowerCase())
  })

  return (
    <div>
      <div className="section" style={{display:'flex', gap:12, alignItems:'center', marginBottom: 10}}>
        <h2 style={{margin:0}}>Find Doctors</h2>
        <span className="small">Showing {filtered.length} of {docs.length}</span>
      </div>
      <input className="search" placeholder="Search by name, specialty or language..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid" style={{marginTop:16}}>
        {filtered.map(d => <DoctorCard key={d.id} d={d} />)}
      </div>
    </div>
  )
}
