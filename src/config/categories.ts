import {
  Bath,
  Bed,
  Blocks,
  CarFront,
  Milk,
  Package,
  Shirt,
  type LucideIcon,
} from "lucide-react";

export type CategoryConfig = {
  icon: LucideIcon;
  iconClass: string;
  backgroundClass: string;
};

export const categoryConfig: Record<string, CategoryConfig> = {
  "Сон": {
    icon: Bed,
    iconClass: "text-indigo-500",
    backgroundClass: "bg-indigo-50",
  },

  "Прогулки": {
    icon: CarFront,
    iconClass: "text-emerald-500",
    backgroundClass: "bg-emerald-50",
  },

  "Кормление": {
    icon: Milk,
    iconClass: "text-sky-500",
    backgroundClass: "bg-sky-50",
  },

  "Гигиена": {
    icon: Bath,
    iconClass: "text-cyan-500",
    backgroundClass: "bg-cyan-50",
  },

  "Одежда": {
    icon: Shirt,
    iconClass: "text-orange-500",
    backgroundClass: "bg-orange-50",
  },

  "Игрушки": {
    icon: Blocks,
    iconClass: "text-pink-500",
    backgroundClass: "bg-pink-50",
  },
};

export const defaultCategory: CategoryConfig = {
  icon: Package,
  iconClass: "text-slate-400",
  backgroundClass: "bg-slate-100",
};