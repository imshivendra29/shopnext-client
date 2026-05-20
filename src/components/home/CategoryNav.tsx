"use client";

import { useRouter } from "next/navigation";
import type { Category } from "@/services/category.service";

type CategoryNavProps = {
  categories: Category[];
};

export default function CategoryNav({ categories }: CategoryNavProps) {
  const router = useRouter();

  return (
    <div className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 scrollbar-hide sm:gap-6 lg:gap-8">
        <button
          onClick={() => router.push("/")}
          className="shrink-0 rounded-full bg-[#0B1220] px-4 py-2 text-xs font-medium text-white sm:text-sm"
        >
          Home
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => router.push(`/products?categoryId=${category.id}`)}
            className="shrink-0 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 sm:text-sm"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}