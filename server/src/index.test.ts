// Minimal smoke test example - not wired to a runner here
// You can run real tests by adding jest or vitest.

import request from 'supertest'
import express from 'express'

const app = express()
app.get('/', (_, res) => res.json({ ok: true }))

export async function smoke() {
  const res = await request(app).get('/')
  console.log('smoke status', res.status)
}