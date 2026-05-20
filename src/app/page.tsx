import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
      <Navbar />

      <section className="relative py-24 md:py-32">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

        <Container>
          <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-500">
                Modern Ecommerce Platform
              </p>

              <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                Premium Shopping Experience
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                Build scalable ecommerce experiences with modern UI,
                lightning-fast performance, and production-ready architecture.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button className="rounded-2xl bg-amber-500 px-8 py-4 font-medium text-black transition hover:scale-105">
                  Shop Now
                </button>

                <button className="rounded-2xl border border-zinc-700 px-8 py-4 font-medium text-white transition hover:bg-zinc-900">
                  Explore Collection
                </button>
              </div>
            </div>

            {/* Right Side Card */}
            <div className="relative">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900" />

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Premium Collection
                    </h3>

                    <p className="mt-2 text-zinc-400">
                      Minimal modern fashion
                    </p>
                  </div>

                  <div className="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-black">
                    New
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur md:block">
                <p className="text-sm text-zinc-400">Trusted by</p>
                <h4 className="mt-1 text-2xl font-bold">20K+ Users</h4>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}