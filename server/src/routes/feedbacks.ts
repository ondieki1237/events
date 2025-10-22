import express from 'express'
import Feedback from '../models/Feedback'
import { requireAdmin } from '../middleware/auth'
import sendNotification from '../utils/email'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const items = await Feedback.find().sort({ createdAt: -1 }).lean()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load feedback' })
  }
})

router.post('/', async (req, res) => {
  try {
    const body = req.body
    const created = await Feedback.create(body)

    try {
      await sendNotification({
        subject: `New Feedback from ${created.name}`,
        text: `${created.name} (${created.email}) rated ${created.rating}/5`,
      })
    } catch (e) {
      console.warn('Failed to send notification email', e)
    }

    res.status(201).json(created)
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' })
  }
})

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    await Feedback.findByIdAndDelete(id)
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' })
  }
})

export default router
