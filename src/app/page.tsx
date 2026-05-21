import TopBar from "@/components/home/TopBar";
import MainNavbar from "@/components/home/MainNavbar";
import CategoryNav from "@/components/home/CategoryNav";
import HeroSection from "@/components/home/HeroSection";

import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";
import { getBanners } from "@/services/banner.service";
import { getCategories } from "@/services/category.service";
import { Category } from "@/services/category.service";
import { getFeaturedProducts } from "@/services/product.service";
export default async function Home() {
  const [banners, categories, products] = await Promise.all([
  getBanners(),
  getCategories(),
  getFeaturedProducts(),
]);
  return (
    <main className="min-h-screen bg-[#F8F8F8] text-zinc-900">
      <TopBar />
      <MainNavbar categories={categories} />
      <CategoryNav categories={categories} />
      <HeroSection banners={banners} />

     
 
     <FeaturedProducts products={products} />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </main>
  );
}