import { api } from "@/core/api/api";
export type Banner = {
  id: number;
  imageUrl: string;
  isActive: boolean;
};

export async function getBanners(): Promise<Banner[]> {
  const response = await api.get<Banner[]>("/banner");
  return response.data;
}