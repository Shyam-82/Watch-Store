# ⌚ CHRONOS — Luxury Watch Store

A full-featured luxury e-commerce watch store built with React.js, Context API, and JSON Server.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start JSON Server (backend, port 5000)
```bash
npm run server
```

### 3. Start React App (port 3000) — in a new terminal
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Demo Accounts

| Role  | Email                  | Password   |
|-------|------------------------|------------|
| Admin | admin@watches.com      | admin123   |
| User  | john@example.com       | john123    |

> Or register a new user account from the Register page.

---

## 📁 Project Structure

```
watch-store/
├── db.json                          # JSON Server database (16 watches, users, orders)
├── public/
│   └── index.html
├── src/
│   ├── App.js                       # Routes + Provider tree
│   ├── index.js
│   ├── index.css                    # Global styles, CSS variables, animations
│   ├── context/
│   │   ├── AuthContext.js           # Auth (login/register/logout + localStorage)
│   │   ├── CartContext.js           # Cart state + billing calculation
│   │   ├── WishlistContext.js       # Wishlist state
│   │   └── WatchContext.js          # Watch CRUD via Axios
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.js            # Sticky navbar with cart badge, user menu
│   │   │   ├── Footer.js
│   │   │   ├── LoadingSpinner.js
│   │   │   └── StarRating.js
│   │   ├── watches/
│   │   │   ├── WatchCard.js         # Product card with hover effects
│   │   │   └── WatchGrid.js         # Search + filter + sort grid
│   │   ├── cart/
│   │   │   └── CartSidebar.js       # Slide-out cart drawer
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.js
│   │   │   └── AdminRoute.js
│   │   └── admin/
│   │       └── AdminWatchForm.js    # Add/Edit modal form
│   ├── pages/
│   │   ├── HomePage.js              # Hero + featured + new arrivals
│   │   ├── WatchesPage.js           # Full collection grid
│   │   ├── WatchDetailPage.js       # Single watch detail + related
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── WishlistPage.js
│   │   ├── CheckoutPage.js          # Full billing + order form
│   │   ├── AdminDashboard.js        # CRUD management table
│   │   └── NotFoundPage.js
│   └── utils/
│       └── helpers.js               # formatPrice, getStars, truncate, debounce
```

---

## ✨ Features

### Authentication
- Register / Login / Logout
- Persistent via localStorage
- Protected routes (user + admin)

### Shop
- 16 pre-loaded luxury watches across 5 categories
- Search by name, brand, or category
- Filter by category pills
- Sort by price (asc/desc), rating, name

### Cart
- Add / remove / increase / decrease qty
- Slide-out drawer with live totals
- Subtotal, 18% GST, conditional free delivery ($5000+)
- Persistent via localStorage

### Wishlist
- Save watches for later
- Move to cart in one click
- Persistent via localStorage

### Checkout
- Full shipping + payment form with validation
- Live billing breakdown
- Order success screen

### Admin (admin@watches.com)
- Dashboard with inventory stats
- Add / Edit / Delete watches
- Search/filter management table

---

## 🎨 Design

- **Palette**: Near-black (#0a0a0a) + champagne gold (#c9a84c) + deep white (#e8e8e8)
- **Typography**: Playfair Display (headings) + Inter (body)
- **Animations**: Page fade-in, card hover lift, image zoom, floating hero, shimmer skeleton
- **UI**: Glassmorphism cards, gold gradient text, dashed decorative rings
