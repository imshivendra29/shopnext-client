"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";

import Container from "@/shared/layout/Container";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[9999] border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              ShopNext
            </h1>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm text-zinc-300 hover:text-white">
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm text-zinc-300 hover:text-white"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-sm text-zinc-300 hover:text-white"
            >
              Categories
            </Link>
            <Link href="/about" className="text-sm text-zinc-300 hover:text-white">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
              <Search size={18} />
            </button>

            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
              <ShoppingBag size={18} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-medium text-black">
                2
              </span>
            </button>

            <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 md:flex">
              <User size={18} />
            </button>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="fixed left-0 top-16 z-[9999] w-full border-t border-zinc-800 bg-zinc-950 px-6 py-6 text-white shadow-xl md:hidden">
          <nav className="flex flex-col gap-6">
            <Link href="/" onClick={() => setOpen(false)} className="text-lg">
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="text-lg"
            >
              Products
            </Link>
            <Link
              href="/categories"
              onClick={() => setOpen(false)}
              className="text-lg"
            >
              Categories
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="text-lg"
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}