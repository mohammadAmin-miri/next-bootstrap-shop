🌐 **Languages:** **English (Current)** | [🇮🇷 نسخه فارسی (Persian RTL Branch)](https://github.com/mohammadAmin-miri/next-bootstrap-shop/tree/fa)
# 🛒 DigiStore | Developer Gear E-Commerce Storefront

> A modern, high-performance e-commerce portfolio project built with **Next.js (App Router)**, **TypeScript**, and **Bootstrap 5**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3-purple?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)
[![JSON Server](https://img.shields.io/badge/Mock_API-JSON_Server-orange?style=flat-square)](https://github.com/typicode/json-server)

## ✨ Key Features

* **Modern Next.js Architecture:** Leverages **Server Components** for initial data fetching and SEO metadata, combined with interactive **Client Components** for catalog filtering and cart state.
* **URL-Synced Catalog & Filtering:**
  * **Debounced Search:** 500ms input delay prevents unnecessary re-renders while typing.
  * **Dynamic Category Filtering & Sorting:** Filter by hardware categories and sort by price or user rating.
  * **URL Search Params Integration:** Search queries, active categories, sort order, and page numbers are synchronized with the URL (`?category=...&sort=...&page=...`) for shareable links and browser history support.
* **Persistent Shopping Cart (`CartContext`):**
  * Automatically syncs cart items with `localStorage`.
  * Real-time stock validation preventing users from exceeding available inventory.
  * Instant order summary calculation and simulated checkout flow.
* **Responsive UI & UX:**
  * Built with **Bootstrap 5** and **Bootstrap Icons**.
  * Streaming with React `<Suspense>` and custom shimmer **Skeleton Loaders**.
  * Custom 404 Not Found states and out-of-stock visual badges.

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router, Turbopack)
* **Language:** TypeScript
* **Styling:** Bootstrap 5, Bootstrap Icons, Custom CSS
* **State Management:** React Context API + LocalStorage
* **Mock Backend:** JSON Server (`db.json` with 18 curated developer products)

## 🚀 Getting Started

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohammadAmin-miri/next-bootstrap-shop.git
   cd next-bootstrap-shop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server and Mock API concurrently:**
   ```bash
   npm run dev:all
   ```
   * **Frontend Storefront:** `http://localhost:3000`
   * **JSON Server API:** `http://localhost:3001/products`

## 📂 Project Structure

```text
src/
├── app/                  # App Router pages & layouts
│   ├── cart/             # Shopping cart page & checkout simulation
│   ├── products/[id]/    # Dynamic product detail page & custom 404
│   ├── layout.tsx        # Root layout with CartProvider & Navbar
│   └── page.tsx          # Home page with Suspense streaming
├── components/           # Modular UI & feature components
│   ├── cart/             # CartItemRow and CartSummary
│   ├── product/          # ProductCard, ProductCatalog, Skeletons
│   └── ui/               # Navbar and Bootstrap JS client loader
├── context/              # Global CartContext with localStorage sync
├── services/             # API data fetching layer (productService)
└── types/                # TypeScript interfaces (Product, CartItem)
```

## 👤 Author

**Mohammad Amin Miri**
* GitHub: [@mohammadAmin-miri](https://github.com/mohammadAmin-miri)
