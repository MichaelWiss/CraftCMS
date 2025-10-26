# My Store - Frontend (Next.js)

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create your `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Configure your environment variables in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/api
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Architecture

### State Management
- **Zustand** for cart state management
- **React Query** (optional) for server state caching

### Data Fetching
- **GraphQL** (Apollo Client) for reading product data
- **REST API** (axios) for cart and checkout operations

### Routing
- Next.js App Router with file-based routing
- Dynamic routes for product detail pages

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   ├── products/
│   │   ├── page.tsx        # Products listing
│   │   └── [slug]/
│   │       └── page.tsx    # Product detail page
│   ├── cart/
│   │   └── page.tsx        # Shopping cart
│   └── checkout/
│       └── page.tsx        # Checkout form
├── components/
│   └── ui/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── ProductCard.tsx
│       └── Button.tsx
├── lib/
│   ├── graphql.ts          # Apollo Client setup
│   └── commerceClient.ts   # Axios client for Commerce API
├── state/
│   └── cart.ts             # Zustand cart store
└── package.json
```

## API Integration

### GraphQL Queries (Read Operations)
The frontend uses GraphQL to fetch product data from Craft CMS. Example queries are in `/lib/queries/`.

### REST API (Write Operations)
Cart and checkout operations use the custom REST API endpoints:
- `GET /api/cart` - Get current cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart item
- `POST /api/cart/remove` - Remove from cart
- `POST /api/checkout` - Complete checkout

## Features

- ✅ Product listing and detail pages
- ✅ Shopping cart with add/update/remove
- ✅ Checkout flow
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ State management with Zustand

## Next Steps

1. Customize the UI components in `/components/ui/`
2. Add GraphQL queries for product data
3. Implement proper image handling
4. Add payment gateway integration
5. Implement user authentication
6. Add order confirmation page
7. Implement search and filtering
