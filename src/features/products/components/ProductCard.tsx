import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { createProductSlug } from "@/lib/slug";
import { Product } from "../api/product.service";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:shadow-lg sm:rounded-3xl">
      <Link href={`/products/${createProductSlug(product.name, product.id)}`}>
        <div className="relative overflow-hidden bg-zinc-100">
          <div className="relative aspect-[4/4]">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="h-full w-full bg-zinc-100" />
            )}
          </div>

          <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm sm:right-4 sm:top-4 sm:h-10 sm:w-10">
            <Heart size={15} className="sm:size-[18px]" />
          </button>
        </div>
      </Link>

      <div className="p-3 sm:p-5">
        <p className="line-clamp-1 text-[11px] text-zinc-500 sm:text-sm">
          {product.categoryName ?? "Product"}
        </p>

       <Link href={`/products/${createProductSlug(product.name, product.id)}`}>
          <h3 className="mt-1 line-clamp-2 min-h-[38px] text-sm font-semibold leading-5 text-zinc-900 transition hover:text-amber-600 sm:mt-2 sm:min-h-[52px] sm:text-lg sm:leading-6">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1 sm:mt-3">
          <Star size={13} className="fill-amber-400 text-amber-400 sm:size-[15px]" />
          <span className="text-xs font-medium text-zinc-700 sm:text-sm">
            {product.averageRating ?? 0}
          </span>
          <span className="hidden text-xs text-zinc-400 sm:inline">
            ({product.reviewCount ?? 0})
          </span>
        </div>

        <div className="mt-2 sm:mt-4">
          <span className="text-lg font-bold text-zinc-900 sm:text-2xl">
            ₹{product.price}
          </span>
        </div>

        <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-[#0B1220] px-3 py-2 text-xs font-medium text-white transition hover:bg-black sm:mt-5 sm:gap-2 sm:rounded-2xl sm:py-3 sm:text-base">
          <ShoppingCart size={15} className="sm:size-[18px]" />
          Add
        </button>
      </div>
    </div>
  );
}