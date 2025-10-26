# My Store

A full-stack e-commerce application built with **Craft CMS + Commerce** backend and **Next.js** frontend.

## Project Structure

```
my-store/
│
├─ backend/  (Craft CMS + Craft Commerce)
│   ├─ GraphQL API for reading product data
│   ├─ Commerce actions for cart and checkout
│   ├─ Custom API module for JSON endpoints
│   └─ Project configuration
│
└─ frontend/ (Next.js React App)
    ├─ App Router with pages
    ├─ GraphQL client for data fetching
    ├─ Commerce client for cart operations
    ├─ Zustand for state management
    └─ Tailwind CSS for styling
```

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install PHP dependencies:
```bash
composer install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Configure your database in `.env`

5. Generate security key:
```bash
php craft setup/security-key
```

6. Install Craft:
```bash
php craft install
```

7. Install Commerce:
```bash
composer require craftcms/commerce
php craft plugin/install commerce
```

8. Run the server:
```bash
php -S localhost:8000 -t web
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Features

### Backend (Craft CMS + Commerce)
- ✅ Flexible content management
- ✅ Full e-commerce functionality
- ✅ GraphQL API for product queries
- ✅ Custom REST API endpoints
- ✅ Shopping cart management
- ✅ Payment gateway integration
- ✅ Order management
- ✅ Multi-currency support

### Frontend (Next.js)
- ✅ Modern React with App Router
- ✅ TypeScript for type safety
- ✅ Server-side rendering (SSR)
- ✅ Client-side state management
- ✅ Responsive design
- ✅ GraphQL data fetching
- ✅ Shopping cart functionality
- ✅ Checkout flow

## Technology Stack

**Backend:**
- PHP 8.0+
- Craft CMS 4.x
- Craft Commerce 4.x
- MySQL/PostgreSQL
- GraphQL

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Apollo Client (GraphQL)
- Zustand (State Management)
- Axios (HTTP Client)

## API Endpoints

### GraphQL (Read)
- `POST /api` - GraphQL endpoint for queries

### REST API (Write)
- `GET /api/products` - List products
- `GET /api/products/<id>` - Get product
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/update` - Update cart item
- `POST /api/cart/remove` - Remove from cart
- `POST /api/checkout` - Complete checkout

### Commerce Actions
- `POST /actions/commerce/cart/update-cart`
- `POST /actions/commerce/payments/pay`
- And more...

## Configuration

### Craft CMS Configuration
Configure your stores, currencies, payment gateways, and shipping methods in the Craft CMS control panel at `http://localhost:8000/admin`

### GraphQL Schema
Set up your GraphQL schema in Craft CMS:
1. Go to GraphQL > Schemas
2. Create a public schema
3. Enable product entries and commerce data

## Development

### Adding New Features
1. **Backend**: Add controllers to `backend/modules/api/controllers/`
2. **Frontend**: Create pages in `frontend/app/` and components in `frontend/components/`

### Customization
- Modify UI components in `frontend/components/ui/`
- Update GraphQL queries in `frontend/lib/queries/`
- Customize Craft templates if needed

## Production Deployment

### Backend
1. Set `ENVIRONMENT=production` in `.env`
2. Configure your web server (Apache/Nginx)
3. Run `composer install --no-dev --optimize-autoloader`
4. Set up SSL certificate

### Frontend
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Or deploy to Vercel/Netlify

## License

MIT

## Support

For issues and questions, please refer to:
- [Craft CMS Documentation](https://craftcms.com/docs)
- [Craft Commerce Documentation](https://craftcms.com/docs/commerce)
- [Next.js Documentation](https://nextjs.org/docs)
