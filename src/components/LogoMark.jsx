import React from 'react'

export default function LogoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6ee7ff"/>
          <stop offset="100%" stopColor="#b7a1ff"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" stroke="url(#g1)" fill="rgba(255,255,255,0.06)"/>
      <path d="M32 14c8 0 16 6 16 16s-8 20-16 20-16-10-16-20 8-16 16-16z" stroke="url(#g1)" strokeWidth="2.5" fill="none"/>
      <path d="M24 32h16M32 24v16" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}
