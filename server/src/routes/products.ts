import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const router = express.Router()

const API_URL = process.env.SPDSK_ITEMS_API || 'https://accordmedical.co.ke/api/get_spdk_items.php'
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || 'https://accordmedical.co.ke/web/uploads/shop/'

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

    // Process products: images already have full URLs from the API
    const products = (apiData.data || []).map((product: any) => {
      const images = (product.images || []).map((img: any) => ({
        product_image: img.product_image || '',
        product_image_md: img.product_image_md || '',
      }))

      return {
        id: product.id,
        name: product.product_name,
        slug: product.product_slug,
        type: product.product_type,
        description: product.product_description || '',
        price: product.product_price || '0.00',
        reduced_price: product.product_reduced_price,
        category: product.category || 'Uncategorized',
        brand: product.item_brand_manufacturer,
        images,
        // Use the first image as primary image_url for frontend compatibility
        image_url: images.length > 0 ? images[0].product_image : null,
        featured: product.featured === 1 || product.featured === '1',
      }
    })

    return products
  } catch (err: any) {
    console.error('Error fetching products from SPDSK API:', err.message)
    throw err
  }
}

router.get('/', async (req, res) => {
  try {
    const products = await fetchProductsFromAPI()

    // Group products by category name
    const grouped: Record<string, any[]> = {}

    for (const product of products) {
      const category = product.category || 'Uncategorized'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(product)
    }

    // Convert to array format expected by frontend
    // Sort categories alphabetically for consistent ordering
    const categoryArray = Object.keys(grouped)
      .sort()
      .map((categoryName, index) => ({
        id: index + 1,
        name: categoryName,
        products: grouped[categoryName],
      }))

    res.json({ data: categoryArray })
  } catch (err: any) {
    console.error('products fetch error', err)
    res.status(500).json({ error: 'Failed to fetch products', message: err.message })
  }
})

export default router
