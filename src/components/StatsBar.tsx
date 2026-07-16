import type { PurchaseItem } from "../types/PurchaseItem";
import { calculateStats } from "../services/stats";

import {
    Package,
    Wallet,
    ChartNoAxesColumn,
    ShoppingCart,
} from "lucide-react";

type Props = {
  items: PurchaseItem[];
  totalItems: number;
};

export default function StatsBar({
  items,
  totalItems,
}: Props) {
  const stats = calculateStats(items);

  const progress =
    stats.totalItems === 0
      ? 0
      : Math.round(
          (stats.purchased /
            stats.totalItems) *
            100
        );

  const totalBudget =
    stats.estimatedBudget +
    stats.finalBudget;

  return (
   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

<Card
    icon={<Package size={20} />}
    title="Вещи"
>
        <Row
          label="Показано"
          value={`${stats.totalItems} из ${totalItems}`}
        />

        <Row
          label="Куплено"
          value={stats.purchased}
        />

        <Row
          label="Осталось"
          value={
            stats.totalItems -
            stats.purchased
          }
        />
      </Card>

<Card
    icon={<Wallet size={20} />}
    title="Бюджет"
>
        <Row
          label="По фильтру"
          value={
            totalBudget.toLocaleString("ru-RU") +
            " ₽"
          }
        />

        <Row
          label="Потрачено"
          value={
            stats.finalBudget.toLocaleString("ru-RU") +
            " ₽"
          }
        />
      </Card>

<Card
    icon={<ChartNoAxesColumn size={20} />}
    title="Прогресс"
>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

<div className="mt-3 flex items-center justify-between text-sm">

  <span className="text-slate-500">
    Выполнено
  </span>

  <span className="font-semibold">
    {progress}%
  </span>

</div>

      </Card>

  <Card
    icon={<ShoppingCart size={20} />}
    title="Покупки"
>

 <Row
  label="Выбираем"
  value={stats.choosing}
/>

<Row
  label="Заказано"
  value={stats.ordered}
/>

<Row
  label="Куплено"
  value={stats.purchased}
/>

   <Row
  label="Не куплено"
  value={stats.notPurchased}
/>

      </Card>

    </div>
  );
}

type CardProps = {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
};

function Card({
     icon,
  title,
  children,
}: CardProps) {
  return (
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:p-5">
<div className="mb-3 flex items-center gap-2 text-slate-600">

    {icon}

   <h3 className="text-lg font-semibold">
        {title}
    </h3>

</div>

     <div className="mt-3 space-y-2">
        {children}
      </div>
    </div>
  );
}

type RowProps = {
  label: string;
  value: React.ReactNode;
};

function Row({
  label,
  value,
}: RowProps) {
  return (
<div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">
        {label}
      </span>

<span className="text-right font-semibold">
        {value}
      </span>
    </div>
  );
}