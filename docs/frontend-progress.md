# ShopNext Client Frontend Progress

This document tracks the frontend work completed so far and the next planned steps.

---

# Project Context

ShopNext Client is the Next.js frontend for the ShopNext ecommerce backend.

Backend API:

```txt
https://shopnext-bz8l.onrender.com/api
```

Swagger:

```txt
https://shopnext-bz8l.onrender.com/swagger
```

---

# Completed Frontend Work

## 1. Home Page Layout

Home page structure completed with:

- TopBar
- MainNavbar
- CategoryNav
- Hero Banner
- Feature Strip
- Featured Categories
- Featured Products
- Promo Banner
- Newsletter
- Footer

---

## 2. Header / Navbar

Implemented:

- Logo
- Search bar
- Category dropdown
- Cart icon
- Wishlist icon
- Login/Register buttons
- Conditional user section planned

Search behavior:

```txt
/products?keyword=searchText
```

Category click behavior:

```txt
/products?categoryId=categoryId
```

---

## 3. Banner / Hero Section

Implemented real banner API integration.

API:

```txt
GET /api/banner
```

Features:

- Banner image fetched from backend
- Cloudinary image support
- Banner shown as background image
- Auto slide
- Manual arrows
- Responsive text and buttons
- Mobile-friendly height and typography

---

## 4. Category Integration

Implemented real category API.

API:

```txt
GET /api/category
```

Used in:

- Header category dropdown
- Category navigation
- Featured categories section

Features:

- Category images displayed
- Mobile horizontal scroll
- Desktop horizontal scroll
- Compact category cards
- Long text handled using line clamp
- Category click redirects to filtered product page

---

## 5. Featured Products

Implemented real product API integration.

API:

```txt
GET /api/product/search?page=1&pageSize=8&sortBy=newest
```

Features:

- Product cards
- Product image
- Product name
- Category name
- Price
- Rating
- Review count
- Add button
- Responsive grid
- Compact mobile cards
- View More button linking to `/products`

---

## 6. Slug System

Created slug helper.

File:

```txt
src/lib/slug.ts
```

Slug format:

```txt
/products/product-name-id
```

Example:

```txt
/products/premium-headphones-4
```

Reason:

- Shareable product URLs
- SEO-friendly structure
- Backend can still fetch using ID
- No backend slug endpoint required yet

---

## 7. Product Listing Page

Created route:

```txt
src/app/products/page.tsx
```

Features:

- Reads query params
- Supports keyword search
- Supports categoryId filter
- Shows products in responsive grid
- Empty state for no products
- Header, nav, footer included

Current query patterns:

```txt
/products
/products?keyword=phone
/products?categoryId=2
```

---

## 8. Product Detail Page

Created route:

```txt
src/app/products/[slug]/page.tsx
```

Features:

- SSR product detail page
- Extracts product ID from slug
- Fetches product from backend
- Header and category nav included
- Product image section
- Product info section
- Price
- Rating
- Review count
- Offers placeholder
- Add to Cart button
- Buy Now button
- Wishlist button
- Compare button placeholder
- Share product placeholder
- Trust cards
- Product information section
- Customer review placeholder
- Trending products section using latest products API
- Newsletter and footer

API used:

```txt
GET /api/product/{id}
GET /api/product/search?page=1&pageSize=8&sortBy=newest
```

---

# Current Services

## API Client

```txt
src/services/api.ts
```

Central Axios instance:

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

---

## Banner Service

```txt
src/services/banner.service.ts
```

Handles:

```txt
GET /api/banner
```

---

## Category Service

```txt
src/services/category.service.ts
```

Handles:

```txt
GET /api/category
```

---

## Product Service

```txt
src/services/product.service.ts
```

Handles:

```txt
GET /api/product/search
GET /api/product/{id}
```

---

# Current Important Files

```txt
src/app/page.tsx
src/app/products/page.tsx
src/app/products/[slug]/page.tsx

src/components/home/TopBar.tsx
src/components/home/MainNavbar.tsx
src/components/home/CategoryNav.tsx
src/components/home/HeroSection.tsx
src/components/home/FeatureStrip.tsx
src/components/home/FeaturedCategories.tsx
src/components/home/PromoBanner.tsx
src/components/home/Newsletter.tsx

src/components/layout/Footer.tsx
src/components/products/ProductCard.tsx
src/components/products/FeaturedProducts.tsx

src/services/api.ts
src/services/banner.service.ts
src/services/category.service.ts
src/services/product.service.ts

src/lib/slug.ts
```

---

# Current Rendering Strategy

The current pages are mostly SSR-friendly.

SSR pages:

```txt
/
 /products
 /products/[slug]
```

Client components are used only where interaction is needed:

- navbar search
- category dropdown
- banner slider
- category click actions

---

# Current Pending Improvements

## Auth

Not implemented yet.

Planned:

- login page
- register page
- JWT storage
- auth store
- protected routes
- user profile
- conditional navbar user section

---

## Cart

Not implemented yet.

Planned:

- Zustand cart store
- Add to Cart functionality
- Cart page
- Cart API integration
- Quantity update
- Remove item
- Clear cart

Backend APIs already exist:

```txt
GET /api/cart
POST /api/cart/add
PUT /api/cart/update
DELETE /api/cart/remove/{productId}
DELETE /api/cart/clear
```

---

## Buy Now

Currently:

```txt
/login?redirect=/checkout
```

Planned behavior:

```txt
If user logged in:
  redirect to checkout/address page

If user not logged in:
  redirect to login with return URL
```

Future URL:

```txt
/login?redirect=/checkout?productId=ID
```

---

## Reviews

Currently placeholder only.

Backend already has review APIs:

```txt
GET /api/review/{productId}
POST /api/review
PUT /api/review/{id}
DELETE /api/review/{id}
```

Planned:

- show real reviews
- rating summary
- write review form
- update/delete own review
- review loading state

---

## Product Images

Currently one product image is reused.

Planned:

- backend support for multiple product images
- image gallery
- thumbnail selection
- mobile swipe
- desktop preview
- zoom modal

---

## Offers

Currently static placeholder.

Planned:

- offer/coupon API
- product-specific offers
- bank offers
- discount calculation

---

## Trending Products

Currently latest products are reused.

Planned:

```txt
GET /api/product/trending
```

or

```txt
GET /api/product/search?sortBy=reviews
```

---

# Next Planned Work

## 1. Product Listing Improvements

Build enterprise-level product listing page:

- filter sidebar
- category filter
- price range filter
- sort dropdown
- pagination
- mobile filter drawer
- URL-based filters
- responsive layout

Backend API already supports:

```txt
GET /api/product/search
```

Query params:

```txt
keyword
categoryId
minPrice
maxPrice
sortBy
page
pageSize
```

---

## 2. Cart System

Build:

- cart store
- add to cart button
- cart page
- cart count in navbar
- API integration
- auth check

---

## 3. Auth Flow

Build:

- login page
- register page
- JWT handling
- current user state
- protected route handling
- logout
- navbar conditional user display

---

## 4. Checkout Flow

Build:

- address selection
- default address
- payment method
- order summary
- Razorpay integration later

Backend APIs available:

```txt
/api/address
/api/order/checkout
/api/payment/initiate/{orderId}
/api/payment/verify
```

---

## 5. UI Polish

Add:

- skeleton loading
- GSAP/Framer Motion animations
- product hover improvements
- mobile menu
- search suggestions
- better empty states
- toast notifications

---

# Notes For Future Continuation

When continuing this project, start from:

```txt
Product listing filter page
```

Recommended next implementation order:

```txt
1. Build product search/filter service
2. Update /products page with real API filters
3. Add mobile filter drawer
4. Add pagination
5. Add cart store
6. Add auth flow
7. Add checkout/address flow
```

---

# Current Development Rule

Avoid direct API calls inside components.

Use this flow:

```txt
Page / Feature
   ↓
Service Layer
   ↓
Central API Client
   ↓
Backend API
```

---

# Author

Shivendra Pratap Singh

GitHub:

```txt
https://github.com/imshivendra29
```