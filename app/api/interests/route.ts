import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo (replace with database in production)
const interests: Array<{
  id: string
  name: string
  email: string
  phone: string
  organization: string
  message: string
  dept: string
  products: string
  timestamp: string
}> = []

export async function GET() {
  return NextResponse.json(interests)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newInterest = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
    }

    interests.push(newInterest)

    return NextResponse.json(newInterest, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
