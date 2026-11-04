import { Product } from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch the product list from the server");
  }

  return res.json();
}

export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }

  return res.json();
}