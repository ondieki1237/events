import { NextResponse } from "next/server"

// This would connect to your database in production
export async function GET() {
  // For demo purposes, return mock stats
  const stats = {
    totalInterests: 0,
    totalFeedbacks: 0,
    averageRating: 0,
  }

  return NextResponse.json(stats)
}
