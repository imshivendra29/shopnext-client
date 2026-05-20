"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Category } from "@/services/category.service";

type FeaturedCategoriesProps = {
    categories: Category[];
};

export default function FeaturedCategories({
    categories,
}: FeaturedCategoriesProps) {
    const router = useRouter();

    if (!categories.length) return null;

    return (
        <section className="pb-14 sm:pb-16">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-5 flex items-end justify-between sm:mb-7">
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                            Shop by Category
                        </h2>

                        <p className="mt-1 max-w-xl text-sm text-zinc-500 sm:text-base">
                            Choose a category and explore related products.
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/products")}
                        className="hidden rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium transition hover:bg-zinc-100 sm:block"
                    >
                        View All
                    </button>
                </div>

                {/* Mobile: horizontal scroll, compact cards */}
                <div className="grid auto-cols-[22%] grid-flow-col gap-3 overflow-x-auto pb-3 scrollbar-hide sm:hidden">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => router.push(`/products?categoryId=${category.id}`)}
                            className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left"
                        >
                            <div className="relative aspect-square overflow-hidden bg-zinc-100">
                                {category.imageUrl ? (
                                    <Image
                                        src={category.imageUrl}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-110"
                                        sizes="25vw"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-zinc-200" />
                                )}
                            </div>

                            <div className="p-2">
                                <h3 className="line-clamp-1 text-[11px] font-semibold leading-4 text-zinc-900">
                                    {category.name}
                                </h3>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Desktop / Tablet: compact grid */}
                {/* Desktop / Tablet: horizontal slider */}
                <div className="hidden grid-flow-col auto-cols-[140px] gap-4 overflow-x-auto pb-3 scrollbar-hide sm:grid md:auto-cols-[150px] lg:auto-cols-[155px] xl:auto-cols-[160px]">
                    {categories.slice(0, 20).map((category) => (
                        <button
                            key={category.id}
                            onClick={() => router.push(`/products?categoryId=${category.id}`)}
                            className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="relative aspect-square overflow-hidden bg-zinc-100">
                                {category.imageUrl ? (
                                    <Image
                                        src={category.imageUrl}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-110"
                                        sizes="160px"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-zinc-200" />
                                )}
                            </div>

                            <div className="p-3">
                                <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900">
                                    {category.name}
                                </h3>

                                <p className="mt-1 line-clamp-1 text-xs text-zinc-500">
                                    Explore products
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
                {/* Mobile View More */}
                <div className="mt-5 flex justify-center sm:hidden">
                    <button
                        onClick={() => router.push("/products")}
                        className="rounded-xl bg-[#0B1220] px-5 py-2.5 text-sm font-medium text-white"
                    >
                        View More
                    </button>
                </div>
            </div>
        </section>
    );
}