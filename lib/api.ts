// Prefer environment override (NEXT_PUBLIC_API_URL). Default to the production
// backend so local dev doesn't accidentally call localhost when the backend
// isn't running.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://events.codewithseth.co.ke"

// Helper to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()
  // Backend returns { success: true, data: [...] } format
  if (data.success === false) {
    throw new Error(data.message || 'API request failed')
  }
  return data
}

export async function fetchProducts(params?: Record<string, any>) {
  const query = new URLSearchParams(params).toString()
  const response = await fetch(`${API_BASE}/api/v1/products?${query}`)
  return handleResponse(response)
}

export async function fetchProduct(id: string) {
  // Note: Backend has a bug where it compares string ID from URL params 
  // with numeric product.id using strict equality (===), which always fails.
  // Workaround: fetch all products and find by ID client-side
  try {
    const data = await fetchProducts({ limit: 1000 })
    const product = data.data.find((p: any) => String(p.id) === String(id) || p.slug === id)
    
    if (!product) {
      throw new Error('Product not found')
    }
    
    return { success: true, data: product }
  } catch (error) {
    throw error
  }
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE}/api/v1/categories`)
  return handleResponse(response)
}

export async function fetchCategoryProducts(slug: string, params?: Record<string, any>) {
  const query = new URLSearchParams(params).toString()
  const response = await fetch(`${API_BASE}/api/v1/categories/${slug}/products?${query}`)
  return handleResponse(response)
}

export async function searchProducts(query: string, limit = 20) {
  const response = await fetch(`${API_BASE}/api/v1/search?q=${query}&limit=${limit}`)
  return handleResponse(response)
}

export async function fetchBrands() {
  const response = await fetch(`${API_BASE}/api/v1/brands`)
  return handleResponse(response)
}
