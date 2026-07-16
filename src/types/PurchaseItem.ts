export interface PurchaseItem {
  id: number;

  name: string;

  category: string;

  quantity: number;

  priority: string;

  description: string;

  link: string;

  links: string[];

  estimatedPrice: number;

  finalPrice: number;

  purchaseTime: string;

  finalChoice: string;

  status: string;
}