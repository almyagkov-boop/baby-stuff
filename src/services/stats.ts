import type { PurchaseItem } from "../types/PurchaseItem";

export function calculateStats(items: PurchaseItem[]) {
  const totalItems = items.length;

  const purchased = items.filter(
    (item) => item.status === "Куплено"
  ).length;

  const finalChoice = items.filter(
    (item) => item.finalChoice.trim() !== ""
  ).length;

  const notPurchased = items.filter(
    (item) => item.status === "Не куплено"
  ).length;

  const choosing = items.filter(
    (item) => item.status === "Выбираем"
  ).length;

  const ordered = items.filter(
    (item) => item.status === "Заказано"
  ).length;

  const estimatedBudget = items.reduce(
    (sum, item) => sum + (item.estimatedPrice || 0),
    0
  );

  const finalBudget = items.reduce(
    (sum, item) => sum + (item.finalPrice || 0),
    0
  );

  const totalBudget = estimatedBudget + finalBudget;

  return {
    totalItems,

    purchased,
    finalChoice,

    notPurchased,
    choosing,
    ordered,

    estimatedBudget,
    finalBudget,
    totalBudget,
  };
}