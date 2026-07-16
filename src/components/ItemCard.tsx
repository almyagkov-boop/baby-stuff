import {
  Calendar,
  CircleAlert,
  CircleCheck,
  Wallet,
} from "lucide-react";

import Badge from "./Badge";
import type { PurchaseItem } from "../types/PurchaseItem";

import { getDisplayPrice, isEstimatedPrice } from "../lib/price";

type Props = {
  item: PurchaseItem;
  selected: boolean;
  onClick: () => void;
};

function priorityColor(priority: string) {
  if (priority.includes("Очень")) return "red";
  if (priority.includes("Важно")) return "orange";

  return "gray";
}

function statusColor(status: string) {
  if (status.toLowerCase().includes("куп")) return "green";

  if (status.toLowerCase().includes("скид")) return "orange";

  return "blue";
}

export default function ItemCard({
  item,
  selected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
     className={`
flex
flex-col
  
        rounded-3xl
  border
  bg-white
  p-5
  text-left
  shadow-sm
  transition-all
  duration-200
  hover:-translate-y-0.5
  hover:shadow-xl

  ${
  selected
  ? "border-sky-500 bg-sky-50 shadow-lg ring-2 ring-sky-300"
      : "border-slate-200 hover:border-sky-200"
  }
`}
    >

 
<div className="mb-2 flex items-center justify-between">
    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
  {item.category || "Без категории"}
</span>

<div
  className={`h-3 w-3 rounded-full ${
    item.status === "Куплено"
      ? "bg-emerald-500"
      : item.status === "Заказано"
      ? "bg-sky-500"
      : item.status === "Выбираем"
      ? "bg-amber-500"
      : "bg-slate-300"
  }`}
/>
      </div>

    <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-6 text-slate-800">
        {item.name}
      </h3>

  <div className="mb-3 flex flex-wrap gap-2">
        {item.priority && (
          <Badge color={priorityColor(item.priority) as any}>
            <CircleAlert size={14} className="mr-1" />

            {item.priority}
          </Badge>
        )}

        {item.status && (
          <Badge color={statusColor(item.status) as any}>
            <CircleCheck size={14} className="mr-1" />

            {item.status}
          </Badge>
        )}
      </div>
<div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
<div className="flex items-center gap-2 text-lg font-bold text-slate-900">
 <Wallet
    size={18}
    className="text-emerald-600"
/>

  <span>
    {isEstimatedPrice(
      item.estimatedPrice,
      item.finalPrice
    ) && "≈ "}

    {getDisplayPrice(
      item.estimatedPrice,
      item.finalPrice
    )}
  </span>
</div>

<div className="flex items-center gap-2 text-sm text-slate-500">
        <Calendar
    size={16}
    className="text-slate-400"
/>

          {item.purchaseTime || "Не указано"}
        </div>
      </div>
    </button>
  );
}