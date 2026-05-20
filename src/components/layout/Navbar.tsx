"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, User } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Container from "./Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              ShopNext
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              Products
            </Link>

            <Link
              href="/categories"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              Categories
            </Link>

            <Link
              href="/about"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              About
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 transition hover:bg-zinc-800">
              <Search size={18} />
            </button>

            {/* Cart */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 transition hover:bg-zinc-800">
              <ShoppingBag size={18} />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-medium text-black">
                2
              </span>
            </button>

            {/* Profile */}
            <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 transition hover:bg-zinc-800 md:flex">
              <User size={18} />
            </button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 transition hover:bg-zinc-800 md:hidden">
                  <Menu size={18} />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="border-zinc-800 bg-zinc-950 text-white"
              >
                <div className="mt-10 flex flex-col gap-6">
                  <Link href="/" className="text-lg">
                    Home
                  </Link>

                  <Link href="/products" className="text-lg">
                    Products
                  </Link>

                  <Link href="/categories" className="text-lg">
                    Categories
                  </Link>

                  <Link href="/about" className="text-lg">
                    About
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}