# TODOs

1. Product & Data
   1.1 Implement Apollo/React Query providers and hooks for product lists and detail pages.
   1.2 Populate Craft CMS product schema with price, description, gallery fields used by the API.
   1.3 Enable caching/ISR for landing and product pages once CMS data is live.
   1.4 Replace landing page icons with licensed seafood illustrations from flaticon.com and document attribution/optimization process.
   1.5 Document product API contract in `/docs/product-api.md`.

2. Checkout & Payments
   2.1 Replace checkout alert placeholders with success/error UI and confirmation routing.
   2.2 Configure Craft Commerce payment gateways (e.g., Stripe) and update checkout payloads to send real payment data.
   2.3 Add address validation and country/state selectors tied to Craft settings.
   2.4 Persist order confirmation details (email, number) and create confirmation page.

3. Cart & State
   3.1 Add toast/notification system for optimistic cart changes and error handling.
   3.2 Persist cart between sessions (localStorage token or server cookie hydration).
   3.3 Write unit tests for derived selectors and optimistic updates in `state/cart.ts`.
   3.4 Create Playwright/Cypress flow covering add/update/remove cart interactions.

4. Deployment Prep
   4.1 Set up CI pipeline (GitHub Actions) running lint, unit tests, and integration tests on push.
   4.2 Define staging/production environment variables for frontend (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_GRAPHQL_URL`) and backend (`FRONTEND_URL`, DB credentials, Craft keys).
   4.3 Containerize or script deployments (Vercel for Next.js, managed PHP host for Craft) including build/install steps.
   4.4 Configure CDN/image hosting for Craft assets consumed via `next/image`.
   4.5 Draft `/docs/deployment.md` with step-by-step rollout checklist (migrations, cache warmup, env secrets).

5. Post-Launch Monitoring
   5.1 Integrate analytics (GA4) and error tracking (Sentry) for both apps.
   5.2 Create webhook or scheduled job to trigger frontend rebuilds when Craft entries change.
   5.3 Track Lighthouse metrics (LCP, CLS) and fine-tune hero/product imagery sizing.
   5.4 Schedule quarterly review of Craft Commerce settings (gateways, shipping, tax) and update docs accordingly.
