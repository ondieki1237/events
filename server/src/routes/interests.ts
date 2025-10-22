import express from 'express'
import Interest from '../models/Interest'
import { requireAdmin } from '../middleware/auth'
import sendNotification from '../utils/email'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const items = await Interest.find().sort({ createdAt: -1 }).lean()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load interests' })
  }
})

router.post('/', async (req, res) => {
  try {
    const body = req.body
    const created = await Interest.create(body)

    // send notification email (best-effort)
    try {
      await sendNotification({
        subject: `New Interest from ${created.name}`,
        text: `${created.name} (${created.email}) expressed interest in ${created.dept || 'N/A'}`,
      })
    } catch (e) {
      console.warn('Failed to send notification email', e)
    }

    res.status(201).json(created)
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' })
  }
})

// admin protected delete example
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    await Interest.findByIdAndDelete(id)
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' })
  }
})

export default router
