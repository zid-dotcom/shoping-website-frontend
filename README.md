# Raynott Decmart - Frontend Starter (MVP)

This is a lightweight React + Vite + Tailwind starter for the Raynott Decmart shopping app.
It contains a simple landing page, product listing, product detail, cart, and auth stubs.
The project uses a mock API so you can run it locally without a backend.

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173

## Notes
- The `src/utils/api.js` file is a mock. Replace its functions with real API calls to your backend.
- Cart is persisted in localStorage.
- Checkout is a stub (alert). Integrate with your backend `/checkout` endpoint and payment gateway.