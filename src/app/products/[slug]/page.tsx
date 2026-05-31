import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Zap,
  Tag,
} from "lucide-react";
import { getIdFromSlug } from "@/lib/slug";
import { getCategories } from "@/features/categories/api/category.service";
import { getFeaturedProducts, getProductById } from "@/features/products/api/product.service";
import TopBar from "@/shared/layout/TopBar";
import MainNavbar from "@/shared/layout/MainNavbar";
import CategoryNav from "@/features/categories/components/CategoryNav";
import Newsletter from "@/shared/components/Newsletter";
import Footer from "@/shared/layout/Footer";
import ProductCard from "@/features/products/components/ProductCard";


type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const productId = getIdFromSlug(slug);

  if (!productId) notFound();

  const [categories, product, latestProducts] = await Promise.all([
    getCategories(),
    getProductById(productId),
    getFeaturedProducts(),
  ]);

  if (!product) notFound();

  const productImages = [
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
  ].filter(Boolean) as string[];

  const relatedProducts = latestProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-zinc-900">
      <TopBar />
      <MainNavbar />
      <CategoryNav categories={categories} />

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-black">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">{product.name}</span>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="h-full w-full bg-zinc-100" />
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 transition hover:border-black"
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5 sm:p-8">
            <p className="text-sm font-medium text-amber-600">
              {product.categoryName ?? "Product"}
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-zinc-900 sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="fill-amber-400 text-amber-400" size={18} />
                <span className="font-semibold">
                  {product.averageRating ?? 0}
                </span>
                <span className="text-sm text-zinc-500">
                  ({product.reviewCount ?? 0} reviews)
                </span>
              </div>

              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span className="text-sm text-green-600">In Stock</span>
            </div>

            <p className="mt-6 text-4xl font-bold text-zinc-900">
              ₹{product.price}
            </p>

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 font-semibold text-zinc-900">
                <Tag size={18} className="text-amber-600" />
                Available Offers
              </div>

              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>• 10% instant discount on selected bank cards</li>
                <li>• Free delivery on eligible orders</li>
                <li>• No-cost EMI options coming soon</li>
              </ul>
            </div>

            <p className="mt-5 leading-8 text-zinc-600">
              {product.description ??
                "Premium quality product designed for modern users with a smooth shopping experience."}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#0B1220] px-6 py-4 font-semibold text-white transition hover:bg-black">
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <Link
                href="/login?redirect=/checkout"
                className="flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 font-semibold text-black transition hover:bg-amber-500"
              >
                <Zap size={20} />
                Buy Now
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-medium transition hover:bg-zinc-100">
                Compare
              </button>

              <button className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-medium transition hover:bg-zinc-100">
                Share Product
              </button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-zinc-50 p-4">
                <Truck size={22} />
                <p className="mt-2 text-sm font-semibold">Fast Delivery</p>
              </div>

              <div className="rounded-2xl bg-zinc-50 p-4">
                <ShieldCheck size={22} />
                <p className="mt-2 text-sm font-semibold">Secure Payment</p>
              </div>

              <div className="rounded-2xl bg-zinc-50 p-4">
                <RotateCcw size={22} />
                <p className="mt-2 text-sm font-semibold">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[1fr_380px]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Product Information</h2>

            <p className="mt-4 leading-8 text-zinc-600">
              This section is ready for specifications, warranty details,
              seller information, product comparison data, and advanced product
              attributes.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>

            <div className="mt-5 flex items-center gap-3">
              <Star className="fill-amber-400 text-amber-400" />
              <p className="text-lg font-semibold">
                {product.averageRating ?? 0} out of 5
              </p>
            </div>

            <p className="mt-3 text-sm text-zinc-500">
              Review API is already planned. Later this section will show real
              reviews, rating filters, and add-review form.
            </p>

            <button className="mt-6 rounded-2xl border border-zinc-200 px-5 py-3 text-sm font-medium transition hover:bg-zinc-100">
              Write a Review
            </button>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                Trending Products
              </h2>

              <p className="mt-1 text-sm text-zinc-500 sm:text-base">
                Currently showing latest products. Later this section can use a
                dedicated trending API.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
      <Footer />
    </main>
  );
}