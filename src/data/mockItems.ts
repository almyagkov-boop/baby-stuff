import type { BabyItem } from "../types/baby-item";

export const mockItems: BabyItem[] = [
  {
    id: 1,
    name: "BabyBjörn Bouncer",
    priority: "Очень важно",
    status: "Жду скидку",
    purchaseTime: "До рождения",
    price: "189 €",
    finalChoice: true,
    links: ["https://amazon.de"],
  },
  {
    id: 2,
    name: "Philips Avent Bottle Warmer",
    priority: "Важно",
    status: "Планирую",
    purchaseTime: "После рождения",
    price: "49 €",
    finalChoice: false,
    links: ["https://amazon.de"],
  },
];