# Backend Integration Documentation

## Backend Connection Status

✅ **Backend URL**: `https://events.codewithseth.co.ke`  
✅ **API Version**: v1  
✅ **Protocol**: HTTPS

## Configuration Files Updated

### 1. `.env.local` (Created)
```env
NEXT_PUBLIC_API_URL=https://events.codewithseth.co.ke
```
This file is gitignored and contains your actual backend URL.

### 2. `.env.example` (Updated)
Example file showing developers how to configure their environment with your backend URL.

### 3. `next.config.ts` (Updated)
Added `remotePatterns` for Next.js Image optimization to allow images from:
- `accordmedical.co.ke/web/uploads/shop/**` (product images from your backend's image source)
- `events.codewithseth.co.ke/**` (your backend domain)

### 4. `lib/api.ts` (Enhanced)
- Added error handling for failed API responses
- Added `handleResponse()` helper that checks for backend's `{ success: false }` responses
- Added `fetchBrands()` helper (backend supports `/api/v1/brands`)
- All endpoints now properly handle errors and throw meaningful messages

## API Endpoints Mapping

| Frontend Function | Backend Route | Query Params | Response Format |
|------------------|---------------|--------------|-----------------|
| `fetchProducts(params)` | `GET /api/v1/products` | `limit`, `page`, `sort_by`, `sort_order`, `category`, `brand`, `featured`, `min_price`, `max_price`, `search` | `{ success: true, data: [...], pagination: {...} }` |
| `fetchProduct(id)` | `GET /api/v1/products/:id` | - | `{ success: true, data: {...} }` |
| `fetchCategories()` | `GET /api/v1/categories` | - | `{ success: true, data: [{name, count, slug}] }` |
| `fetchCategoryProducts(slug, params)` | `GET /api/v1/categories/:slug/products` | `limit`, `page`, `sort_by`, `sort_order` | `{ success: true, data: [...], pagination: {...} }` |
| `searchProducts(query, limit)` | `GET /api/v1/search` | `q`, `limit` | `{ success: true, data: [...] }` |
| `fetchBrands()` | `GET /api/v1/brands` | - | `{ success: true, data: [brands...] }` |

## Product Data Shape (from Backend)

```typescript
interface Product {
  id: string
  name: string
  slug: string
  description: string
  category: string
  brand: string
  price: string          // e.g., "45000.00"
  reduced_price: string | null
  currency: 'KES'
  images: Array<{
    url: string
    thumbnail: string
  }>
  featured: boolean
  in_stock: boolean      // Always true in backend currently
  created_at?: string
  updated_at?: string
}
```

## Backend Features Supported

### ✅ Working Features
- **Product listing** with pagination (default 50 per page)
- **Sorting** by name, price, category (ascending/descending)
- **Filtering** by:
  - Category (exact match)
  - Brand (substring match)
  - Featured status
  - Price range (min_price, max_price)
  - Search (name, description, category)
- **Single product fetch** by ID
- **Categories listing** with product counts
- **Category products** - products filtered by category slug
- **Brand listing** - all unique brands (excluding "Generic")
- **Search** - fuzzy search across products

### ⚠️ Backend Limitations to Note

1. **No Caching**: Backend calls external SPDSK API on every request
   - May be slow if external API is rate-limited
   - Recommendation: Backend should add caching (30s-60s TTL)

2. **Stock Status**: `in_stock` is always `true`
   - Backend doesn't check actual inventory
   - If inventory data becomes available, backend needs update

3. **Price Format**: Prices are strings (e.g., "45000.00")
   - Frontend should use `parseFloat()` for calculations
   - Already handled in components

4. **Image URLs**: Images come from `accordmedical.co.ke/web/uploads/shop/`
   - Already configured in `next.config.ts`
   - If images fail to load, check CORS on image server

5. **Category Slug Mapping**: Backend converts slugs by replacing `-` with space
   - Example: `laboratory-equipment` → `Laboratory Equipment`
   - Frontend should use kebab-case slugs consistently

## Frontend Pages Using Backend

| Page | API Calls | Purpose |
|------|-----------|---------|
| `/` (Home) | `fetchProducts({ limit: 6 })` | Top rated products section |
| `/products` | `fetchProducts({ limit: 100 })` | All products with filters |
| `/products/[id]` | `fetchProduct(id)` | Single product details |
| `/categories` | `fetchCategories()` | All categories listing |
| `/categories/[slug]` | `fetchCategoryProducts(slug)` | Category-specific products |
| `/offers` | `fetchProducts({ limit: 200 })` | Black November deals (filtered client-side for discounts) |

## Testing the Connection

### 1. Start the Development Server
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

### 2. Test Endpoints
Open your browser to:
- **Home**: http://localhost:3000 (should load top products)
- **All Products**: http://localhost:3000/products
- **Categories**: http://localhost:3000/categories
- **Offers**: http://localhost:3000/offers (Black November deals)

### 3. Check Browser Console
- Open DevTools (F12) → Console tab
- Look for any fetch errors or CORS issues
- Network tab should show requests to `https://events.codewithseth.co.ke/api/v1/*`

### 4. Verify Data Flow
- Products should display with images
- Prices should show correctly in KES
- Discounts should calculate properly
- Categories should be clickable and filter products

## CORS Configuration (Backend)

Your backend **must** allow requests from your frontend origin. Ensure your backend has:

```javascript
// In your backend index.ts or wherever CORS is configured
app.use(cors({
  origin: [
    'http://localhost:3000',        // Local development
    'https://your-frontend-domain.com', // Production
  ],
  credentials: true
}))
```

## Common Issues & Solutions

### Issue: "Failed to fetch" errors
**Solution**: Check if backend is running at `https://events.codewithseth.co.ke`
```bash
# Test backend directly
curl https://events.codewithseth.co.ke/api/v1/products?limit=5
```

### Issue: CORS errors in browser console
**Solution**: Backend needs to add your frontend domain to CORS whitelist

### Issue: Images not loading
**Solution**: 
1. Check `next.config.ts` has correct `remotePatterns`
2. Verify image URLs in backend response are complete
3. Check if image server allows hotlinking

### Issue: Products show "No products found"
**Solution**:
1. Check backend is returning `{ success: true, data: [...] }` format
2. Verify backend external API (SPDSK_ITEMS_API) is accessible
3. Check browser console for error messages

## Environment Variables Reference

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://events.codewithseth.co.ke
```

### Backend (your backend .env)
```env
SPDSK_ITEMS_API=https://accordmedical.co.ke/api/get_spdk_items.php
IMAGE_BASE_URL=https://accordmedical.co.ke/web/uploads/shop/
PORT=5500
```

## Performance Recommendations

### For Backend
1. **Add caching**: Cache `fetchProductsFromAPI()` results for 30-60 seconds
2. **Add Redis**: For distributed caching across backend instances
3. **Add CDN**: Serve product images through a CDN
4. **Add indexes**: If migrating to database, index by category, brand, featured

### For Frontend
1. **Add SWR/React Query**: Cache API responses client-side
2. **Implement infinite scroll**: Instead of loading all products at once
3. **Add image lazy loading**: Already using Next/Image which handles this
4. **Add service worker**: For offline product browsing

## Next Steps

1. ✅ Backend is linked and configured
2. ✅ API helpers are created with error handling
3. ✅ Image optimization is configured
4. 🔄 **Test the connection** by running `npm run dev`
5. 🔄 **Verify CORS** if you encounter errors
6. 🔄 **Check backend logs** if products don't load

## Additional Features You Can Add

### 1. Shopping Cart (Requires Backend Changes)
- Add cart endpoints to backend
- Implement cart state management in frontend (Context API or Zustand)

### 2. User Authentication (Partially Available)
- Backend has JWT_SECRET configured
- Add login/register pages
- Protected routes for user dashboard

### 3. Wishlist
- Add wishlist endpoints
- Local storage fallback for guests

### 4. Product Reviews
- Add reviews table/collection in backend
- Display reviews on product detail page

### 5. Order Management
- Add orders endpoints
- Order history page
- Order tracking

## Contact & Support

If you encounter issues:
1. Check backend logs at `https://events.codewithseth.co.ke`
2. Verify backend is running and accessible
3. Check browser console for detailed error messages
4. Ensure CORS is properly configured

---

**Status**: ✅ Frontend is fully configured and ready to connect to backend at `https://events.codewithseth.co.ke`
