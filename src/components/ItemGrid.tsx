import type { PurchaseItem } from "../types/PurchaseItem";
import ItemCard from "./ItemCard";

type Props = {
  items: PurchaseItem[];
  selectedItem: PurchaseItem | null;
  onSelect: (item: PurchaseItem) => void;
};

export default function ItemGrid({
  items,
  selectedItem,
  onSelect,
}: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <div className="text-5xl">🔍</div>

        <h2 className="mt-4 text-2xl font-semibold">
          Ничего не найдено
        </h2>

        <p className="mt-2 text-slate-500">
          Попробуйте изменить поиск или фильтры.
        </p>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          selected={selectedItem?.id === item.id}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  );
}