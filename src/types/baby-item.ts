export interface BabyItem {
  id: number;

  name: string;

  quantity?: number;

  description?: string;

  links: string[];

  priority?: string;

  purchaseTime?: string;

  finalChoice?: boolean;

  price?: string;

  status?: string;

  image?: string;

  shop?: string;
}