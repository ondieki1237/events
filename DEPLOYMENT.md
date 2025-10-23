# Deployment Configuration

## Backend API
- **Production URL**: https://events.codewithseth.co.ke
- **Port**: 5500
- **CORS**: Enabled for all origins (`*`)

## Environment Variables

### Backend (.env)
```
PORT=5500
MONGODB_URI=mongodb+srv://...
SPDSK_ITEMS_API=https://accordmedical.co.ke/api/get_spdk_items.php
IMAGE_BASE_URL=https://accordmedical.co.ke/web/uploads/shop/
```

### Frontend (.env.local or .env.production)
```
NEXT_PUBLIC_PRODUCTS_API=https://events.codewithseth.co.ke/api/products
```

## CORS Configuration
The backend is configured to accept requests from any origin with the following settings:
- **Origin**: `*` (all origins allowed)
- **Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS
- **Headers**: Content-Type, Authorization
- **Credentials**: false

## API Endpoints
- `GET /api/products` - Fetches all products grouped by category
- `GET /api/interests` - Manage product interests
- `POST /api/feedbacks` - Submit feedback
- `GET /api/stats` - Get statistics

## Running Locally
```bash
# Backend (runs on port 5500)
cd server
npm run dev

# Frontend (runs on port 3000)
npm run dev
```

## Production Build
```bash
# Backend
cd server
npm run build
npm start

# Frontend
npm run build
npm start
```
