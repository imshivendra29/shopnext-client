import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "../api/product.service";

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-zinc-500 sm:text-base">
              Latest products picked for you
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            className="rounded-2xl bg-[#0B1220] px-7 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            View More Products
          </Link>
        </div>
      </div>
    </section>
  );
}