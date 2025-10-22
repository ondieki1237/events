import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router = express.Router()

// Very small auth: compare with ADMIN_EMAIL and ADMIN_PASSWORD stored in env
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Admin credentials not configured' })
  }

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  // In this seed implementation we compare directly; for production, store hashed password.
  // If you prefer hashed env password, adjust accordingly.
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const secret = process.env.JWT_SECRET || 'change_this_secret'
  const expiresIn = process.env.JWT_EXPIRE || '7d'

  const token = jwt.sign({ email }, secret, { expiresIn })

  return res.json({ token })
})

export default router
