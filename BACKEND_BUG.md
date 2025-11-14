# Backend Bug Fix & Workaround

## Issue Found: Product Detail 404 Error

### The Problem
When clicking on a product to view its details, the frontend receives a **404 "Product not found"** error from the backend.

### Root Cause (Backend Bug)
In your backend file `server/src/routes/api-v1.ts`, the route handler for `/api/v1/products/:id` has a bug:

```javascript
router.get('/products/:id', async (req, res) => {
  const { id } = req.params  // This is a STRING from the URL
  const products = await fetchProductsFromAPI()
  const product = products.find(p => p.id === id)  // BUG: comparing number === string
  // ...
})
```

**The Bug**: 
- `id` from `req.params` is a **string** (e.g., `"135"`)
- `p.id` from the normalized products is a **number** (e.g., `135`)
- JavaScript's strict equality `===` returns `false` when comparing `135 === "135"`
- Result: product is never found, always returns 404

### Backend Fix (Recommended)

Update your backend `server/src/routes/api-v1.ts`:

```javascript
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const products = await fetchProductsFromAPI()
    
    // FIX: Convert string ID to number, or use loose equality
    const product = products.find(p => 
      String(p.id) === String(id) || p.id === parseInt(id)
    )
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      })
    }

    res.json({
      success: true,
      data: product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})
```

**Alternative Fix (Even Better)**:
```javascript
// At the top of the route handler
const productId = parseInt(id, 10)
if (isNaN(productId)) {
  return res.status(400).json({
    success: false,
    error: 'Invalid product ID'
  })
}
const product = products.find(p => p.id === productId)
```

### Frontend Workaround (Already Implemented)

Since we can't modify your backend immediately, I've implemented a **client-side workaround** in `lib/api.ts`:

```typescript
export async function fetchProduct(id: string) {
  // Workaround for backend bug:
  // Instead of calling /products/:id (which has the string vs number bug),
  // we fetch all products and find the right one client-side
  try {
    const data = await fetchProducts({ limit: 1000 })
    const product = data.data.find((p: any) => 
      String(p.id) === String(id) || p.slug === id
    )
    
    if (!product) {
      throw new Error('Product not found')
    }
    
    return { success: true, data: product }
  } catch (error) {
    throw error
  }
}
```

**How it works**:
1. Fetches all products (up to 1000) from `/api/v1/products?limit=1000`
2. Finds the product client-side by comparing IDs as strings
3. Also checks against product slug as a fallback
4. Returns the found product in the expected format

**Trade-offs**:
- ✅ Works immediately without backend changes
- ✅ Handles both numeric IDs and slugs
- ⚠️ Slightly slower (fetches more data than needed)
- ⚠️ Won't work if you have more than 1000 products

### Recommended Actions

1. **Immediate**: Frontend workaround is already in place - product details will now work!

2. **Short-term (Backend Fix)**: Update your backend route handler as shown above to convert the string ID to a number before comparison.

3. **Long-term (Better Solution)**: 
   - Use slugs for URLs instead of numeric IDs (SEO-friendly)
   - Example: `/products/digital-microscope-dm-500` instead of `/products/135`
   - Backend already provides slugs in the product data
   - Update frontend links to use `product.slug` instead of `product.id`

### Alternative: Use Slugs Instead of IDs

**Backend update needed** (in `api-v1.ts`):
```javascript
router.get('/products/:slugOrId', async (req, res) => {
  try {
    const { slugOrId } = req.params
    const products = await fetchProductsFromAPI()
    
    // Try to find by slug first, then by ID
    const product = products.find(p => 
      p.slug === slugOrId || 
      p.id === parseInt(slugOrId, 10)
    )
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      })
    }

    res.json({
      success: true,
      data: product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})
```

**Frontend update** (change product links):
```tsx
// Instead of:
<Link href={`/products/${product.id}`}>

// Use:
<Link href={`/products/${product.slug}`}>
```

Benefits of using slugs:
- SEO-friendly URLs
- More readable
- No type conversion issues
- Better for sharing

### Testing

To verify the fix works:

1. **Test the workaround** (already implemented):
   ```bash
   npm run dev
   ```
   Then click on any product - it should now load the detail page.

2. **After fixing backend**, test the direct endpoint:
   ```bash
   curl https://events.codewithseth.co.ke/api/v1/products/135
   # Should return the product, not 404
   ```

### Files Modified

- `lib/api.ts` - Added workaround in `fetchProduct()` function
- `app/products/[id]/page.tsx` - Added debug logging
- `BACKEND_BUG.md` - This documentation

---

## Summary

✅ **Frontend workaround implemented** - product details work now  
⚠️ **Backend fix needed** - convert string ID to number in route handler  
💡 **Future improvement** - use slugs instead of numeric IDs for better URLs

The frontend is working now with the workaround. Please update your backend when you have a chance to make the fix permanent!
