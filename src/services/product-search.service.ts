export type SearchProduct = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  slug?: string;
  categoryId?: number;
  categoryName?: string;
  averageRating?: number;
  reviewCount?: number;
};

type ProductSearchResponse = {
  products: SearchProduct[];
  totalCount: number;
};

export async function searchProducts(
  keyword: string
): Promise<SearchProduct[]> {
  const query = keyword.trim();

  if (query.length < 2) return [];

  const url = `${process.env.NEXT_PUBLIC_API_URL}/product/search?keyword=${encodeURIComponent(
    query
  )}&page=1&pageSize=5`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Product search failed");
  }

  const data: ProductSearchResponse = await res.json();

  return data.products ?? [];
}