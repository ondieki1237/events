import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const router = express.Router()

const API_URL = process.env.SPDSK_ITEMS_API || 'https://accordmedical.co.ke/api/get_spdk_items.php'
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || 'https://accordmedical.co.ke/web/uploads/shop/'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  category: string
  brand: string
  price: string
  reduced_price: string | null
  currency: string
  images: Array<{
    url: string
    thumbnail: string
  }>
  featured: boolean
  in_stock: boolean
  created_at?: string
  updated_at?: string
}

async function fetchProductsFromAPI() {
  try {
    const response = await axios.get(API_URL)

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const apiData = response.data

    if (apiData.status !== 'success') {
      throw new Error(`API returned error: ${apiData.message || 'Unknown error'}`)
    }

    const products: Product[] = (apiData.data || []).map((product: any) => {
      const images = (product.images || []).map((img: any) => ({
        url: img.product_image || '',
        thumbnail: img.product_image_md || img.product_image || '',
      }))

      return {
        id: product.id,
        name: product.product_name,
        slug: product.product_slug || product.product_name.toLowerCase().replace(/\s+/g, '-'),
        description: product.product_description || '',
        category: product.category || 'Uncategorized',
        brand: product.item_brand_manufacturer || 'Generic',
        price: product.product_price || '0.00',
        reduced_price: product.product_reduced_price || null,
        currency: 'KES',
        images,
        featured: product.featured === 1 || product.featured === '1',
        in_stock: true, // Default to true, can be updated based on inventory
        created_at: product.created_at,
        updated_at: product.updated_at,
      }
    })

    return products
  } catch (err: any) {
    console.error('Error fetching products from SPDSK API:', err.message)
    throw err
  }
}

// GET /api/v1/products - List all products with optional filtering and sorting
router.get('/products', async (req, res) => {
  try {
    const {
      category,
      brand,
      featured,
      min_price,
      max_price,
      search,
      sort_by = 'name',
      sort_order = 'asc',
      page = '1',
      limit = '50',
    } = req.query

    let products = await fetchProductsFromAPI()

    // Apply filters
    if (category) {
      products = products.filter((p) => 
        p.category.toLowerCase() === (category as string).toLowerCase()
      )
    }

    if (brand) {
      products = products.filter((p) => 
        p.brand.toLowerCase().includes((brand as string).toLowerCase())
      )
    }

    if (featured === 'true') {
      products = products.filter((p) => p.featured)
    }

    if (min_price) {
      const minPrice = parseFloat(min_price as string)
      products = products.filter((p) => parseFloat(p.price) >= minPrice)
    }

    if (max_price) {
      const maxPrice = parseFloat(max_price as string)
      products = products.filter((p) => parseFloat(p.price) <= maxPrice)
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase()
      products = products.filter((p) => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      )
    }

    // Apply sorting
    products.sort((a, b) => {
      let aVal: any, bVal: any

      switch (sort_by) {
        case 'price':
          aVal = parseFloat(a.price)
          bVal = parseFloat(b.price)
          break
        case 'name':
          aVal = a.name.toLowerCase()
          bVal = b.name.toLowerCase()
          break
        case 'category':
          aVal = a.category.toLowerCase()
          bVal = b.category.toLowerCase()
          break
        default:
          aVal = a.name.toLowerCase()
          bVal = b.name.toLowerCase()
      }

      if (sort_order === 'desc') {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
      }
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    })

    // Pagination
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedProducts = products.slice(startIndex, endIndex)

    res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        total: products.length,
        page: pageNum,
        limit: limitNum,
        total_pages: Math.ceil(products.length / limitNum),
      },
    })
  } catch (err: any) {
    console.error('API v1 products fetch error:', err)
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch products', 
      message: err.message 
    })
  }
})

// GET /api/v1/products/:id - Get single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const products = await fetchProductsFromAPI()
    const product = products.find((p) => p.id === id)

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      })
    }

    res.json({
      success: true,
      data: product,
    })
  } catch (err: any) {
    console.error('API v1 product fetch error:', err)
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch product', 
      message: err.message 
    })
  }
})

// GET /api/v1/categories - List all categories with product counts
router.get('/categories', async (req, res) => {
  try {
    const products = await fetchProductsFromAPI()
    const categoryCounts: Record<string, { name: string; count: number; products: Product[] }> = {}

    products.forEach((product) => {
      const category = product.category || 'Uncategorized'
      if (!categoryCounts[category]) {
        categoryCounts[category] = {
          name: category,
          count: 0,
          products: [],
        }
      }
      categoryCounts[category].count++
      categoryCounts[category].products.push(product)
    })

    const categories = Object.values(categoryCounts)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((cat) => ({
        name: cat.name,
        count: cat.count,
        slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
      }))

    res.json({
      success: true,
      data: categories,
      total: categories.length,
    })
  } catch (err: any) {
    console.error('API v1 categories fetch error:', err)
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch categories', 
      message: err.message 
    })
  }
})

// GET /api/v1/categories/:slug/products - Get products by category
router.get('/categories/:slug/products', async (req, res) => {
  try {
    const { slug } = req.params
    const {
      sort_by = 'name',
      sort_order = 'asc',
      page = '1',
      limit = '50',
    } = req.query

    let products = await fetchProductsFromAPI()

    // Find category by slug
    const categoryName = slug.replace(/-/g, ' ')
    products = products.filter((p) => 
      p.category.toLowerCase() === categoryName.toLowerCase()
    )

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Category not found or has no products',
      })
    }

    // Apply sorting
    products.sort((a, b) => {
      let aVal: any, bVal: any

      switch (sort_by) {
        case 'price':
          aVal = parseFloat(a.price)
          bVal = parseFloat(b.price)
          break
        case 'name':
          aVal = a.name.toLowerCase()
          bVal = b.name.toLowerCase()
          break
        default:
          aVal = a.name.toLowerCase()
          bVal = b.name.toLowerCase()
      }

      if (sort_order === 'desc') {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
      }
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    })

    // Pagination
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedProducts = products.slice(startIndex, endIndex)

    res.json({
      success: true,
      data: paginatedProducts,
      category: {
        name: products[0].category,
        slug: slug,
      },
      pagination: {
        total: products.length,
        page: pageNum,
        limit: limitNum,
        total_pages: Math.ceil(products.length / limitNum),
      },
    })
  } catch (err: any) {
    console.error('API v1 category products fetch error:', err)
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch category products', 
      message: err.message 
    })
  }
})

// GET /api/v1/brands - List all brands
router.get('/brands', async (req, res) => {
  try {
    const products = await fetchProductsFromAPI()
    const brandSet = new Set<string>()

    products.forEach((product) => {
      if (product.brand && product.brand !== 'Generic') {
        brandSet.add(product.brand)
      }
    })

    const brands = Array.from(brandSet).sort()

    res.json({
      success: true,
      data: brands,
      total: brands.length,
    })
  } catch (err: any) {
    console.error('API v1 brands fetch error:', err)
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch brands', 
      message: err.message 
    })
  }
})

// GET /api/v1/search - Search products
router.get('/search', async (req, res) => {
  try {
    const { q, limit = '20' } = req.query

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      })
    }

    const products = await fetchProductsFromAPI()
    const searchTerm = (q as string).toLowerCase()

    const results = products.filter((p) => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
    ).slice(0, parseInt(limit as string))

    res.json({
      success: true,
      data: results,
      query: q,
      total: results.length,
    })
  } catch (err: any) {
    console.error('API v1 search error:', err)
    res.status(500).json({ 
      success: false, 
      error: 'Search failed', 
      message: err.message 
    })
  }
})

export default router
