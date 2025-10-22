# Events Backend (Node.js + Express)

This is a minimal backend scaffold for the "Accord Medical Events" frontend in the workspace.

Features:
- Express + TypeScript
- MongoDB via Mongoose
- Interest and Feedback models and endpoints
- Simple admin auth with JWT (login via env ADMIN_EMAIL / ADMIN_PASSWORD)
- Email notifications via Nodemailer using env settings
- Rate-limiting, helmet, cors

Quick start (development):

1. cd server
2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Copy your `.env` file into `server/.env` (already provided).
4. Start in dev:

```bash
pnpm dev
# or
npm run dev
```

API endpoints:
- POST /api/auth/login { email, password } -> { token }
- GET /api/interests
- POST /api/interests
- DELETE /api/interests/:id (requires Authorization: Bearer <token>)
- GET /api/feedbacks
- POST /api/feedbacks
- DELETE /api/feedbacks/:id (admin)
- GET /api/stats

Notes:
- Ensure `MONGODB_URI` in `server/.env` is reachable.
- The admin password in the `.env` is used as-is in this scaffold; for production store a hashed password and use secure auth.
