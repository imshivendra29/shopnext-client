
import { getCategories } from "@/features/categories/api/category.service";
import CategoryNav from "@/features/categories/components/CategoryNav";
import { getFeaturedProducts } from "@/features/products/api/product.service";
import ProductCard from "@/features/products/components/ProductCard";
import Footer from "@/shared/layout/Footer";
import MainNavbar from "@/shared/layout/MainNavbar";
import TopBar from "@/shared/layout/TopBar";
import Link from "next/link";

type ProductsPageProps = {
  searchParams: Promise<{
    keyword?: string;
    categoryId?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const keyword = params.keyword?.toLowerCase() || "";
  const categoryId = params.categoryId || "";

  const [categories, products] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ]);

  const filteredProducts = products.filter((product) => {
    const matchesKeyword =
      !keyword ||
      product.name.toLowerCase().includes(keyword);

    const matchesCategory =
      !categoryId ||
      String(product.id) === String(categoryId);

    return matchesKeyword && matchesCategory;
  });

  const selectedCategory = categories.find(
    (category) => String(category.id) === categoryId
  );

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-zinc-900">
      <TopBar />

      <MainNavbar  />

      <CategoryNav categories={categories} />

      {/* Header */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-black"
            >
              Home
            </Link>

            <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
              {selectedCategory
                ? selectedCategory.name
                : keyword
                ? `Search: ${keyword}`
                : "All Products"}
            </h1>

            <p className="max-w-2xl text-zinc-500">
              Explore premium products with modern responsive
              ecommerce experience.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          {filteredProducts.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white text-center">
              <h2 className="text-2xl font-bold text-zinc-900">
                No Products Found
              </h2>

              <p className="mt-3 max-w-md text-zinc-500">
                Try another search keyword or browse different
                categories.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}