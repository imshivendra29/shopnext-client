import { api } from "./api";

export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryName?: string;
  averageRating?: number;
  reviewCount?: number;
  isActive?: boolean;
};

type ProductSearchResponse = {
  items?: Product[];
  data?: Product[];
  products?: Product[];
};

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api.get<Product[] | ProductSearchResponse>(
    "/product/search?page=1&pageSize=8&sortBy=newest"
  );

  if (Array.isArray(response.data)) return response.data;

  return response.data.items ?? response.data.data ?? response.data.products ?? [];
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await api.get<Product>(`/product/${id}`);
    return response.data;
  } catch {
    return null;
  }
}