🛒 DigiStore | Developer Gear E-Commerce Storefront

A modern, responsive e-commerce web application built with Next.js (App Router), TypeScript, and Bootstrap 5.

🌟 Key Features

Modern Next.js Architecture (App Router): Leverages React Server Components (RSC) for fast initial data fetching and Client Components for rich, interactive UI sections.

URL-Driven Catalog & Filtering:

Debounced Live Search: Prevents unnecessary re-renders by waiting until the user finishes typing before updating the query.

Dynamic Category Filtering & Sorting: Filter products by category and sort by price (low-to-high, high-to-low) or user rating.

URL Search Params Synchronization: Search queries, active filters, sort order, and pagination states are synced directly with the URL (?category=...&sort=...&page=...), enabling shareable links and preserving state on page refresh or browser back/forward navigation.

Persistent Shopping Cart (CartContext):

Global state management built with React Context API and persisted in localStorage (hydration-safe).

Real-Time Stock Validation: Automatically prevents users from adding more items than available in inventory (product.stock) and displays out-of-stock / low-stock badges.

Instant order summary calculation و interactive checkout simulation flow.

Streaming & UX Polish:

Smooth page transitions with a global route loading spinner (loading.tsx).

Streaming SSR using React <Suspense> paired with custom Bootstrap 5 glow skeleton loaders (ProductGridSkeleton).

Dynamic SEO metadata (generateMetadata) and custom 404 Not Found handling for product detail routes.

🛠️ Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

Styling & UI: Bootstrap 5, Bootstrap Icons, Custom CSS

State Management: React Context API + localStorage

Mock Backend / REST API: JSON Server

📂 Project Structure

├── db/
│   └── db.json                        # Mock database with 18 developer gear products
├── public/
│   └── images/                        # Local optimized WebP product images
└── src/
    ├── app/                           # Next.js App Router pages & layouts
    │   ├── cart/
    │   │   └── page.tsx               # Shopping cart & checkout flow
    │   ├── products/[id]/
    │   │   ├── loading.tsx            # Skeleton loader for product details
    │   │   ├── not-found.tsx          # Custom 404 page for invalid product IDs
    │   │   └── page.tsx               # Dynamic product detail page + SEO metadata
    │   ├── globals.css                # Custom styles & card hover animations
    │   ├── layout.tsx                 # Root layout & CartProvider wrapper
    │   ├── loading.tsx                # Global route transition spinner
    │   └── page.tsx                   # Home page with Suspense streaming
    ├── components/
    │   ├── cart/
    │   │   ├── CartItemRow.tsx        # Individual cart row with quantity controls
    │   │   └── CartSummary.tsx        # Sticky order summary & checkout trigger
    │   ├── product/
    │   │   ├── AddToCartButton.tsx    # Interactive add/quantity controller with stock guard
    │   │   ├── ProductCard.tsx        # Product card with stock status badges
    │   │   ├── ProductCatalog.tsx     # URL-synced search, filter, sort & pagination
    │   │   └── ProductGridSkeleton.tsx# 6-card glow skeleton grid
    │   └── ui/
    │       ├── BootstrapClient.tsx    # Client-side Bootstrap JS bundle loader
    │       └── Navbar.tsx             # Sticky responsive navbar with live cart badge
    ├── context/
    │   └── CartContext.tsx            # Global cart state & localStorage persistence
    ├── services/
    │   └── productService.ts          # API data fetching layer (no-store cache)
    └── types/
        └── index.ts                   # TypeScript interfaces (Product, CartItem)


🚀 Getting Started

Follow these steps to run the project locally on your machine:

1. Clone the repository

git clone https://github.com/mohammadAmin-miri/next-bootstrap-shop.git
cd next-bootstrap-shop


2. Install dependencies

npm install


3. Run the development servers (Next.js + JSON Server)

This project uses concurrently to launch both the Next.js frontend (http://localhost:3000) and the mock JSON Server API (http://localhost:3001) in a single terminal command:

npm run dev:all


Alternatively, you can run them in separate terminals:

Frontend: npm run dev

Mock API Server: npm run server

4. Open in browser

Navigate to http://localhost:3000 to explore the store.

📜 Available Scripts

Command

Description

npm run dev

Starts the Next.js development server on port 3000

npm run server

Starts the JSON Server mock API on port 3001 watching db/db.json

npm run dev:all

Runs both dev and server concurrently

npm run build

Creates an optimized production build

npm run start

Starts the Next.js production server

npm run lint

Runs ESLint to check for code quality issues

👤 Author

Mohammad Amin Miri

GitHub: @mohammadAmin-miri