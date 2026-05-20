"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import type { Category } from "@/services/category.service";

type MainNavbarProps = {
  categories: Category[];
};

export default function MainNavbar({ categories }: MainNavbarProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);

  const user = null;

  const handleSearch = () => {
    const query = keyword.trim();
    if (!query) return;

    router.push(`/products?keyword=${encodeURIComponent(query)}`);
  };

  const goToCategory = (categoryId: number) => {
    setOpen(false);
    router.push(`/products?categoryId=${categoryId}`);
  };

  return (
    <div className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:py-5">
        <div className="flex w-full items-center justify-between lg:w-auto">
          <div
            onClick={() => router.push("/")}
            className="flex cursor-pointer items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1220] text-white">
              <ShoppingCart size={20} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Shop<span className="text-amber-500">Next</span>
            </h1>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 lg:hidden">
            <Menu size={22} />
          </button>
        </div>

        <div className="flex w-full items-center gap-2 lg:max-w-2xl">
          <div className="relative hidden lg:block">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl bg-[#0B1220] px-5 py-3 text-sm font-medium text-white"
            >
              <Menu size={16} />
              All Categories
            </button>

            {open && (
              <div className="absolute left-0 top-14 z-50 w-[320px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
                <div className="max-h-[420px] overflow-y-auto p-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => goToCategory(category.id)}
                      className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-zinc-100"
                    >
                      <div className="h-12 w-12 overflow-hidden rounded-xl bg-zinc-100">
                        {category.imageUrl ? (
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-zinc-200" />
                        )}
                      </div>

                      <span className="font-medium text-zinc-800">
                        {category.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-zinc-200 bg-white">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-3 text-sm outline-none sm:text-base"
            />

            <button
              onClick={handleSearch}
              className="bg-[#0B1220] px-4 py-3 text-white transition hover:bg-black sm:px-5"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Heart size={22} className="text-zinc-700" />

          <button className="relative text-zinc-700">
            <ShoppingCart size={24} />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-medium text-black">
              0
            </span>
          </button>

          {user ? (
            <button className="flex items-center gap-2">
              <User size={22} />
              <div className="text-left">
                <p className="text-xs text-zinc-500">Hi, User</p>
                <p className="text-sm font-semibold text-zinc-900">
                  My Account
                </p>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/login")}
                className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/register")}
                className="rounded-xl bg-[#0B1220] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}