import { getBanners } from "@/features/banners/api/banner.service";
import { getCategories } from "@/features/categories/api/category.service";
import { getFeaturedProducts } from "@/features/products/api/product.service";
import CategoryNav from "@/features/categories/components/CategoryNav";
import FeaturedProducts from "@/features/products/components/FeaturedProducts";
import TopBar from "@/shared/layout/TopBar";
import MainNavbar from "@/shared/layout/MainNavbar";
import HeroSection from "@/features/banners/components/HeroSection";
import PromoBanner from "@/features/banners/components/PromoBanner";
import Newsletter from "@/shared/components/Newsletter";
import Footer from "@/shared/layout/Footer";
export default async function Home() {
  const [banners, categories, products] = await Promise.all([
  getBanners(),
  getCategories(),
  getFeaturedProducts(),
]);
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-zinc-900">
   

      <CategoryNav categories={categories} />
      <HeroSection banners={banners} />

     
 
     <FeaturedProducts products={products} />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </main>
  );
}