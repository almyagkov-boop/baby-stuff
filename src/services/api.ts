import type { PurchaseItem } from "../types/PurchaseItem";

const API_URL = "";

fetch(`${API_URL}/api/items`);

export async function loadItems(): Promise<PurchaseItem[]> {
  const response = await fetch(`${API_URL}/api/items`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить данные");
  }

  return response.json();
}