export default function PromoBanner() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0B1220] px-8 py-16 lg:px-20">
          {/* Glow */}
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            {/* Left */}
            <div className="max-w-2xl">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-400">
                Limited Offer
              </p>

              <h2 className="text-4xl font-bold leading-tight text-white lg:text-6xl">
                Upgrade Your Setup Today
              </h2>

              <p className="mt-6 text-lg leading-8 text-zinc-300">
                Premium electronics, accessories and lifestyle products
                curated for modern users.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4">
              <button className="rounded-2xl bg-amber-400 px-8 py-4 font-semibold text-black transition hover:scale-105">
                Shop Collection
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur">
                Explore Deals
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}