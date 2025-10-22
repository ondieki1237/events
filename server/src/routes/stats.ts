import express from 'express'
import Interest from '../models/Interest'
import Feedback from '../models/Feedback'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const totalInterests = await Interest.countDocuments()
    const totalFeedbacks = await Feedback.countDocuments()
    const agg = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ])

    const averageRating = agg[0]?.avgRating ?? 0

    res.json({ totalInterests, totalFeedbacks, averageRating })
  } catch (err) {
    res.status(500).json({ error: 'Failed to compute stats' })
  }
})

export default router
