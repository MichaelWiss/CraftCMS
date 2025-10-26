# Requirements

- Node.js 18.17+ (local dev currently using v24.10.0) and npm for the Next.js frontend.
- PHP 8.0.2+, Composer, and Craft CMS/Commerce for the backend API module.
- Environment variables: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_GRAPHQL_URL` for the frontend; backend `.env` requires DB credentials, `FRONTEND_URL`, and Craft security keys.
- Backend REST routes now include `/api/products/slug/{slug}` for product detail fetches; ensure Craft products have slugs and optional `productImage`, `price`, `description` fields.
- Frontend depends on Zustand store for cart state and expects backend cart endpoints to accept JSON with credentials (cookies/sessions).
