export default function Newsletter() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-[32px] border border-zinc-200 bg-white px-8 py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-500">
              Newsletter
            </p>

            <h2 className="text-4xl font-bold text-zinc-900">
              Stay Updated
            </h2>

            <p className="mt-4 text-lg text-zinc-500">
              Subscribe to get updates on new arrivals, exclusive offers,
              and premium product launches.
            </p>

            {/* Form */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-14 flex-1 rounded-2xl border border-zinc-200 px-5 outline-none focus:border-black"
              />

              <button className="h-14 rounded-2xl bg-[#0B1220] px-8 font-medium text-white transition hover:bg-black">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}