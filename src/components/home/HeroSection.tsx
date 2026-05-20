"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/services/banner.service";

type HeroSectionProps = {
  banners: Banner[];
};

export default function HeroSection({ banners }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeBanners = banners.filter((banner) => banner.isActive);

  useEffect(() => {
    if (activeBanners.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeBanners.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [activeBanners.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? activeBanners.length - 1 : prev - 1
    );
  };

  if (!activeBanners.length) return null;

  return (
    <section className="py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative min-h-[380px] overflow-hidden rounded-[28px] bg-[#0B1220] shadow-xl sm:min-h-[300px] lg:min-h-[390px] lg:rounded-[36px]">
          {activeBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={banner.imageUrl}
                alt="ShopNext banner"
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          ))}

          <div className="relative z-10 flex min-h-[380px] items-center px-6 py-10 sm:min-h-[300px] sm:px-10 lg:min-h-[390px] lg:px-20">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 sm:mb-4 sm:text-sm">
                New Collection
              </p>

              <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-8xl">
                Upgrade Your Shopping Experience
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-zinc-200 sm:mt-6 sm:text-lg">
                Discover premium products, exclusive offers, and a smooth
                modern ecommerce experience built for every device.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row">
                <button className="rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-black shadow-xl transition hover:scale-105 sm:px-9 sm:py-4 sm:text-base">
                  Shop Now
                </button>

                <button className="rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-medium text-white shadow-xl backdrop-blur transition hover:bg-white/20 sm:px-9 sm:py-4 sm:text-base">
                  Explore Deals
                </button>
              </div>

              <div className="mt-10 hidden max-w-md items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur lg:flex">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full border-2 border-white bg-zinc-300" />
                  <div className="h-10 w-10 rounded-full border-2 border-white bg-zinc-400" />
                  <div className="h-10 w-10 rounded-full border-2 border-white bg-zinc-500" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Trusted by 20K+ customers
                  </p>

                  <p className="text-xs text-zinc-300">
                    Premium products with fast delivery
                  </p>
                </div>
              </div>
            </div>
          </div>

          {activeBanners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur transition hover:bg-black/50 sm:flex"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur transition hover:bg-black/50 sm:flex"
              >
                <ChevronRight size={22} />
              </button>

              <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {activeBanners.map((banner, index) => (
                  <button
                    key={banner.id}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}