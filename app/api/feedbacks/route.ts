import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo (replace with database in production)
const feedbacks: Array<{
  id: string
  name: string
  email: string
  rating: string
  feedback: string
  timestamp: string
}> = []

export async function GET() {
  return NextResponse.json(feedbacks)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newFeedback = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
    }

    feedbacks.push(newFeedback)

    return NextResponse.json(newFeedback, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
