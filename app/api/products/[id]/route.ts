import { NextResponse } from "next/server"

// Backend API URL - adjust based on your server setup
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5500'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id

    // Fetch all products from backend
    const response = await fetch(`${BACKEND_URL}/api/products`, {
      cache: 'no-store', // Disable caching for fresh data
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products from backend')
    }

    const data = await response.json()

    // Find the product by ID from all categories
    let product = null
    if (data.data && Array.isArray(data.data)) {
      for (const category of data.data) {
        if (category.products && Array.isArray(category.products)) {
          const found = category.products.find((p: any) => p.id.toString() === productId)
          if (found) {
            product = found
            break
          }
        }
      }
    }

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
