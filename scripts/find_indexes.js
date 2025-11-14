#!/usr/bin/env node
/*
  Script: find_indexes.js
  Purpose: Fetch products from the external SPDSK API (or SPDSK_ITEMS_API env var),
           normalize them the same way server/src/routes/api-v1.ts does, and
           search for a list of product queries returning their indexes and basic info.

  Usage:
    SPDSK_ITEMS_API="https://..." node scripts/find_indexes.js

  Output: JSON printed to stdout with matches for each query.
*/

// If you need to load a .env file, run this script with your environment configured.
const API_URL = process.env.SPDSK_ITEMS_API || 'https://accordmedical.co.ke/api/get_spdk_items.php'

const queries = [
  'Fridge 315liters',
  'Electric delivery Ben',
  'Gyna couch',
  'Operating table',
  'Dental',
  'Blood bank',
  'Xray',
  'Dental x ray',
  'Electric crank Bed',
  'Electric dialysis chair',
  'Manual dialysis chair',
]

function normalizeProducts(apiData) {
  const data = apiData.data || []
  return data.map((product) => {
    const images = (product.images || []).map((img) => ({
      url: img.product_image || '',
      thumbnail: img.product_image_md || img.product_image || '',
    }))

    return {
      id: product.id,
      name: product.product_name,
      slug: product.product_slug || (product.product_name || '').toLowerCase().replace(/\s+/g, '-'),
      description: product.product_description || '',
      category: product.category || 'Uncategorized',
      brand: product.item_brand_manufacturer || 'Generic',
      price: product.product_price || '0.00',
      reduced_price: product.product_reduced_price || null,
      currency: 'KES',
      images,
      featured: product.featured === 1 || product.featured === '1',
      in_stock: true,
      created_at: product.created_at,
      updated_at: product.updated_at,
    }
  })
}

const http = require('http')
const https = require('https')

function doGet(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    const req = client.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        // try parse json, else return raw
        try {
          const obj = JSON.parse(data)
          resolve({ statusCode: res.statusCode, body: obj })
        } catch (e) {
          resolve({ statusCode: res.statusCode, body: data })
        }
      })
    })

    req.on('error', (err) => reject(err))
    req.end()
  })
}

async function run() {
  try {
    console.log(`Fetching products from ${API_URL} ...`)
    const resp = await doGet(API_URL)
    if (!resp || resp.statusCode < 200 || resp.statusCode >= 300) {
      console.error('HTTP error', resp && resp.statusCode)
      process.exitCode = 2
      return
    }

    const apiData = resp.body
    if (apiData && apiData.status && apiData.status !== 'success') {
      console.error('API returned error status:', apiData.status, apiData.message)
      process.exitCode = 3
      return
    }

    const products = normalizeProducts(apiData)

    const results = {}

    queries.forEach((q) => {
      const ql = q.toLowerCase().trim()
      const matches = []

      products.forEach((p, idx) => {
        const hay = [p.name, p.description, p.category, p.brand].join(' ').toLowerCase()
        if (hay.includes(ql)) {
          matches.push({ index: idx, id: p.id, name: p.name, category: p.category })
        }
      })

      // If no substring matches, try fuzzy token matching (all tokens present)
      if (matches.length === 0) {
        const tokens = ql.split(/\s+/).filter(Boolean)
        products.forEach((p, idx) => {
          const hay = [p.name, p.description, p.category, p.brand].join(' ').toLowerCase()
          const all = tokens.every((t) => hay.includes(t))
          if (all) matches.push({ index: idx, id: p.id, name: p.name, category: p.category })
        })
      }

      results[q] = matches
    })

    console.log(JSON.stringify({ total: products.length, results }, null, 2))
  } catch (err) {
    console.error('Failed to fetch products:', err && err.message ? err.message : err)
    process.exitCode = 1
  }
}

run()
