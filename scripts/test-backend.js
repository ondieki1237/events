#!/usr/bin/env node
/**
 * Backend Connection Test Script
 * 
 * Tests the connection to the backend API and verifies endpoints
 * Usage: node scripts/test-backend.js
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://events.codewithseth.co.ke'

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(color, symbol, message) {
  console.log(`${color}${symbol}${colors.reset} ${message}`)
}

async function testEndpoint(name, url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    
    if (response.ok && data.success !== false) {
      log(colors.green, '✓', `${name}: OK`)
      return { success: true, data }
    } else {
      log(colors.red, '✗', `${name}: Failed (${response.status})`)
      return { success: false, error: data.message || response.statusText }
    }
  } catch (error) {
    log(colors.red, '✗', `${name}: Error - ${error.message}`)
    return { success: false, error: error.message }
  }
}

async function runTests() {
  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`)
  console.log(`${colors.cyan}  Backend Connection Test${colors.reset}`)
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`)
  
  log(colors.blue, '→', `Testing backend at: ${BACKEND_URL}`)
  console.log()

  const tests = [
    { name: 'Products List', url: `${BACKEND_URL}/api/v1/products?limit=5` },
    { name: 'Categories', url: `${BACKEND_URL}/api/v1/categories` },
    { name: 'Brands', url: `${BACKEND_URL}/api/v1/brands` },
    { name: 'Search', url: `${BACKEND_URL}/api/v1/search?q=microscope&limit=5` },
  ]

  const results = []
  
  for (const test of tests) {
    const result = await testEndpoint(test.name, test.url)
    results.push({ ...test, ...result })
  }

  console.log()
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`)
  
  const passed = results.filter(r => r.success).length
  const total = results.length
  
  if (passed === total) {
    log(colors.green, '✓', `All tests passed (${passed}/${total})`)
    console.log()
    log(colors.green, '→', 'Backend is connected and working!')
    
    // Show sample data
    const productsResult = results.find(r => r.name === 'Products List')
    if (productsResult && productsResult.data && productsResult.data.data) {
      const products = productsResult.data.data
      console.log()
      log(colors.cyan, '📦', `Sample products (${products.length} shown):`)
      products.slice(0, 3).forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.name} - KES ${p.price}`)
      })
    }
  } else {
    log(colors.red, '✗', `Some tests failed (${passed}/${total})`)
    console.log()
    log(colors.yellow, '⚠', 'Troubleshooting steps:')
    console.log('   1. Check if backend is running')
    console.log('   2. Verify CORS is configured for your origin')
    console.log('   3. Check backend logs for errors')
    console.log('   4. Ensure NEXT_PUBLIC_API_URL is correct in .env.local')
  }
  
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`)
}

runTests().catch(console.error)
