# My Store - Backend (Craft CMS + Commerce)

## Setup Instructions

### Prerequisites
- PHP 8.0.2 or higher
- MySQL 5.7.8+ or PostgreSQL 9.5+
- Composer

### Installation

1. Install dependencies:
```bash
composer install
```

2. Create your `.env` file:
```bash
cp .env.example .env
```

3. Configure your `.env` file with database credentials and other settings

4. Generate a security key:
```bash
php craft setup/security-key
```

5. Install Craft CMS:
```bash
php craft install
```

6. Install Craft Commerce:
```bash
composer require craftcms/commerce
php craft plugin/install commerce
```

### Configuration

The backend provides:
- **GraphQL API** at `/api` for read operations
- **Commerce Actions** at `/actions/commerce/*` for cart/checkout operations
- **Custom JSON API** at `/api/*` endpoints

### API Endpoints

#### Custom REST API (modules/api/)
- `GET /api/products` - List all products
- `GET /api/products/<id>` - Get single product
- `GET /api/cart` - Get current cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart item
- `POST /api/cart/remove` - Remove cart item
- `POST /api/checkout` - Complete checkout

#### Craft Commerce Actions
- `POST /actions/commerce/cart/update-cart` - Update cart
- `POST /actions/commerce/payments/pay` - Process payment
- And more... (see Craft Commerce docs)

### Running the Development Server

```bash
php -S localhost:8000 -t web
```

Or use your preferred web server (Apache, Nginx, etc.)

## Project Structure

```
backend/
├── config/           # Craft configuration files
├── modules/
│   └── api/         # Custom API module
│       ├── Module.php
│       └── controllers/
│           ├── ProductsController.php
│           ├── CartController.php
│           └── CheckoutController.php
├── storage/         # Runtime files, logs, backups
├── templates/       # Twig templates (if needed)
├── web/            # Public web root
│   └── index.php
├── composer.json
└── .env
```

## Next Steps

1. Configure Craft Commerce stores, currencies, and payment gateways
2. Create product entries and variants
3. Set up shipping methods and tax rules
4. Configure GraphQL schema for frontend queries
