# CareNow — Appointment Booking (React + Vite)

A futuristic-looking, two-sided appointment booking SPA:
- Patient-facing: browse doctors, view details, request appointment, call.
- Hospital-facing: add/edit/remove doctors, toggle availability, review appointment requests.
- Data is stored in **localStorage** (no backend required).

## Quick Start

```bash
# 1) Install dependencies
npm i

# 2) Run locally
npm run dev

# 3) Build for Vercel
npm run build
# push the repo to GitHub; connect it on Vercel — framework: Vite
```

### Routes
- `/` — Homepage with doctor cards and availability indicator
- `/doctor/:id` — Rich doctor profile with "Request Appointment" and "Call"
- `/hospital` — Hospital portal (admin) with a form to manage doctors

All data is persisted in localStorage under keys:
- `carenow_doctors`
- `carenow_appointments`

## Notes
- Seed data is provided on first load.
- You can customise styling in `src/styles.css`.
