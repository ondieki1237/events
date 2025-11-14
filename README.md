This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Connecting the frontend to an existing backend

This frontend calls a backend API under the path `/api/v1/...` via the helper functions in `lib/api.ts`.

**Backend URL**: `https://events.codewithseth.co.ke`

### Quick Setup

1. **Environment Configuration** - Already configured in `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://events.codewithseth.co.ke
```

2. **Install Dependencies**:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Run Development Server**:
```bash
npm run dev
```

4. **Open**: http://localhost:3000

### Full Integration Documentation

See [INTEGRATION.md](./INTEGRATION.md) for:
- Complete API endpoint mapping
- Product data structure
- CORS configuration
- Troubleshooting guide
- Performance recommendations
- Backend limitations and features

### API Endpoints

The frontend uses these backend endpoints:
- `GET /api/v1/products` - List all products (with filters, sort, pagination)
- `GET /api/v1/products/:id` - Single product details
- `GET /api/v1/categories` - List all categories
- `GET /api/v1/categories/:slug/products` - Products by category
- `GET /api/v1/search` - Search products
- `GET /api/v1/brands` - List all brands

### Image Configuration

Product images are served from `accordmedical.co.ke` and are configured in `next.config.ts` for Next.js Image optimization.

### Notes

- All pages were previously using relative fetches to `/api/v1/...`. Those have been unified to use the centralized helpers in `lib/api.ts`.
- Backend is hosted at `https://events.codewithseth.co.ke`
- If your backend requires CORS, ensure it allows requests from your frontend origin (for local dev: `http://localhost:3000`).
- The backend fetches products from an external SPDSK API - no persistent database caching currently implemented.
# black
