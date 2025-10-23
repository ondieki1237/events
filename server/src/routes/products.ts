import express from 'express'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const router = express.Router()

// Helper: fetch using WooCommerce REST API if keys provided
async function fetchFromWoo() {
  const consumer = process.env.WC_CONSUMER_KEY
  const secret = process.env.WC_CONSUMER_SECRET
  if (!consumer || !secret) return null

  // get categories
  const catRes = await axios.get('https://accordmedical.co.ke/wp-json/wc/v3/products/categories', {
    auth: { username: consumer, password: secret },
  })

  const categories = catRes.data as any[]

    const grouped: Array<{ id: number; name: string; products: any[] }> = []

  // Fetch all products per category using pagination (per_page up to 100)
  for (const cat of categories) {
    const perPage = 100
    let page = 1
    const allProds: any[] = []

    while (true) {
      const prRes = await axios.get(
        `https://accordmedical.co.ke/wp-json/wc/v3/products?category=${cat.id}&per_page=${perPage}&page=${page}`,
        {
          auth: { username: consumer, password: secret },
        },
      )

      const pageItems = (prRes.data ?? []) as any[]
      if (!pageItems || pageItems.length === 0) break

      // normalize to `image_url`
      const prods = pageItems.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image_url: p.images?.[0]?.src || null,
        description: p.short_description || p.description || '',
      }))

      allProds.push(...prods)

      // if we received less than perPage, it's the last page
      if (pageItems.length < perPage) break
      page += 1
    }

    grouped.push({ id: cat.id, name: cat.name, products: allProds })
  }

  return grouped
}

router.get('/', async (req, res) => {
  try {
    // Prefer WooCommerce API if credentials are present
    const woo = await fetchFromWoo()
    if (woo) return res.json({ data: woo })

    // Fallback to direct MySQL query
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 3306),
    })

    const limit = Number(process.env.DB_PRODUCT_LIMIT || 1000)

    const [rows] = await connection.execute(`
      SELECT 
        p.ID,
        p.post_title AS product_name,
        MAX(CASE WHEN pm.meta_key = '_price' THEN pm.meta_value END) AS price,
        MAX(CASE WHEN pm.meta_key = '_regular_price' THEN pm.meta_value END) AS regular_price,
        MAX(CASE WHEN pm.meta_key = '_sale_price' THEN pm.meta_value END) AS sale_price,
        im.guid AS image_url
      FROM wpc2_posts p
      LEFT JOIN wpc2_postmeta pm ON p.ID = pm.post_id
      LEFT JOIN wpc2_postmeta pm2 ON p.ID = pm2.post_id AND pm2.meta_key = '_thumbnail_id'
      LEFT JOIN wpc2_posts im ON im.ID = pm2.meta_value
      WHERE p.post_type = 'product' AND p.post_status = 'publish'
      GROUP BY p.ID
      LIMIT ${limit};
    `)

    await connection.end()

    res.json({ data: rows })
  } catch (err) {
    console.error('products fetch error', err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

export default router
