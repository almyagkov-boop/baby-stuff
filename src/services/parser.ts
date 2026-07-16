import type { PurchaseItem } from "../types/PurchaseItem";

export function parseItems(rows: any[]): PurchaseItem[] {
  return rows.map((row) => ({
    id: Number(row["ID"]),

    name: String(row["Вещь"] ?? "").trim(),

    category: String(row["Категория"] ?? "").trim(),

    quantity: Number(row["Кол-во"] || 1),

    priority: String(row["Важность"] ?? "").trim(),

    description: String(
      row["Описание, примеры моделей"] ?? ""
    ).trim(),

    link: String(row["Ссылка"] ?? "").trim(),

    links: String(row["Другие ссылки"] ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),

    estimatedPrice: Number(
      row["Примерная стоимость"] || 0
    ),

    finalPrice: Number(
      row["Итоговая стоимость"] || 0
    ),

    purchaseTime: String(
      row["Срок покупки"] ?? ""
    ).trim(),

    finalChoice: String(
      row["Итоговый выбор"] ?? ""
    ).trim(),

    status: String(row["Статус"] ?? "").trim(),
  }));
}