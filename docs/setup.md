# ShopNext Client Setup Guide

Modern scalable ecommerce frontend built using Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

---

# Frontend Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- Framer Motion
- GSAP
- Zustand
- TanStack Query
- Axios

---

# Project Goal

This frontend is designed to be:

- scalable
- SSR optimized
- production-ready
- reusable
- responsive
- premium UI focused

The frontend communicates with the ShopNext ASP.NET Core Web API backend.

---

# Project Structure

```txt
shopnext-client/
├── docs/
├── public/
├── src/
│
├── app/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── features/
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│
├── services/
├── store/
├── hooks/
├── providers/
├── lib/
├── types/
├── constants/
│
├── .env.local
├── package.json
└── README.md
```

---

# Current UI Setup

## Theme

Current UI theme uses:

```txt
Background → zinc-950
Cards → zinc-900
Border → zinc-800
Accent → amber
Text → zinc-100
```

---

# Installed Libraries

```bash
npm install axios zustand @tanstack/react-query framer-motion lucide-react next-themes gsap
```

---

# shadcn/ui Setup

Installed using:

```bash
npx shadcn@latest init
```

Selected:
- Radix UI
- Lyra preset

Installed components:

```bash
npx shadcn@latest add button card input dialog dropdown-menu sheet skeleton
```

---

# Current Frontend Components

## Layout

```txt
components/layout/
 ├── Navbar.tsx
 ├── Footer.tsx
 └── Container.tsx
```

---

# Navbar Features

- sticky blur navbar
- responsive navigation
- mobile sheet menu
- cart icon
- profile button
- modern dark UI

---

# Hero Section

Homepage currently includes:

- premium hero section
- responsive layout
- glassmorphism card
- gradient glow effect
- ecommerce CTA buttons

---

# Font System

Using:

```tsx
import { Inter } from "next/font/google";
```

Benefits:
- optimized loading
- no layout shift
- SSR optimized
- production ready

---

# Styling System

Using:
- Tailwind CSS
- utility-first styling
- reusable spacing system
- responsive design approach

---

# API Layer

All API requests use centralized Axios instance.

## File

```txt
src/services/api.ts
```

## Example

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

---

# Environment Variables

## .env.local

```env
NEXT_PUBLIC_API_URL=https://localhost:5001/api
```

---

# Development Commands

## Run Dev Server

```bash
npm run dev
```

---

# Current Development Progress

Completed:
- Next.js setup
- Tailwind setup
- shadcn/ui setup
- responsive navbar
- premium homepage hero
- dark UI foundation
- reusable container system
- centralized API layer

---

# Planned Features

- Product listing
- Product detail page
- SSR products
- Search system
- Cart functionality
- Authentication
- Checkout flow
- Payment integration
- Order history
- Wishlist
- Admin dashboard
- Responsive filters
- Framer Motion animations
- GSAP scroll effects

---

# SSR Strategy

Frontend uses Next.js App Router with Server Components where possible.

SSR will be used for:
- products
- categories
- SEO pages
- public storefront pages

Client Components will be used for:
- cart
- auth state
- interactive UI
- animations

---

# Scaling Plan

Future scaling includes:

- Redis caching
- image optimization
- lazy loading
- pagination
- query caching
- edge rendering
- CDN optimization

---

# Engineering Rules

- Avoid direct fetch calls inside UI components
- Use reusable components
- Keep API logic centralized
- Prefer feature-based architecture
- Avoid duplicate UI code
- Build mobile-first responsive layouts

---

# Backend API

Connected backend:

```txt
https://shopnext-bz8l.onrender.com
```

Swagger:

```txt
https://shopnext-bz8l.onrender.com/swagger
```

---

# Author

Shivendra Pratap Singh

GitHub:
https://github.com/imshivendra29