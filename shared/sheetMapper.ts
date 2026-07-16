import type { PurchaseItem } from "../src/types/PurchaseItem";

export function mapSheetRows(rows: string[][]): PurchaseItem[] {
  if (rows.length < 2) return [];

  const headers = rows[0];

  return rows.slice(1).map((row) => {
    const get = (name: string) =>
      row[headers.indexOf(name)] ?? "";

    return {
      id: Number(get("ID")),

      name: get("Вещь"),

      category: get("Категория"),

      quantity: Number(get("Кол-во") || 1),

      priority: get("Важность"),

      description: get("Описание, примеры моделей"),

      link: get("Ссылка"),

      links: get("Другие ссылки")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),

      estimatedPrice: Number(
        get("Примерная стоимость") || 0
      ),

      finalPrice: Number(
        get("Итоговая стоимость") || 0
      ),

      purchaseTime: get("Срок покупки"),

      finalChoice: get("Итоговый выбор"),

      status: get("Статус"),
    };
  });
}