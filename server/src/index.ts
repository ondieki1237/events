import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/auth'
import interestsRoutes from './routes/interests'
import feedbackRoutes from './routes/feedbacks'
import statsRoutes from './routes/stats'

dotenv.config({ path: './.env' })

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || ''

const app = express()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const RATE_WINDOW = Number(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000 // minutes -> ms
const RATE_MAX = Number(process.env.RATE_LIMIT_MAX || 100)

app.use(
  rateLimit({
    windowMs: RATE_WINDOW,
    max: RATE_MAX,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/interests', interestsRoutes)
app.use('/api/feedbacks', feedbackRoutes)
app.use('/api/stats', statsRoutes)

app.get('/', (req, res) => res.json({ ok: true, name: 'Events backend' }))

async function start() {
  try {
    if (!MONGODB_URI) {
      console.warn('MONGODB_URI not set; running without DB connection (read-only may fail).')
    } else {
      await mongoose.connect(MONGODB_URI)
      console.log('Connected to MongoDB')
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
