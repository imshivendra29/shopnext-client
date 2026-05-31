import { api } from "@/core/api/api";


export type Category = {
  id: number;
  name: string;
  imageUrl?: string;
  isActive?: boolean;
};

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/category");

  return response.data.filter((category) => category.isActive !== false);
}