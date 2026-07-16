import { useEffect, useState } from "react";

import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import StatsBar from "./components/StatsBar";
import ItemGrid from "./components/ItemGrid";
import ItemDetails from "./components/ItemDetails";

import { loadItems } from "./services/api";
import type { PurchaseItem } from "./types/PurchaseItem";

import { addItem } from "./api/addItem";

import { Plus } from "lucide-react";

export default function App() {
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");
const [selectedPriority, setSelectedPriority] = useState("");

const [sortBy, setSortBy] = useState("priority");

  const [selectedItem, setSelectedItem] = useState<PurchaseItem | null>(null);



  useEffect(() => {
    async function load() {
      try {
        const data = await loadItems();
        setItems(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Загружаем список...
      </div>
    );
  }

async function handleAddItem() {
  try {
    await addItem();

    const data = await loadItems();

    setItems(data);

    setSelectedItem(data[data.length - 1]);
  } catch (error) {
    console.error(error);
  }
}

async function reloadItems() {
  const data = await loadItems();

  setItems(data);

  if (selectedItem) {
    const updated = data.find(
      (i) => i.id === selectedItem.id
    );

    if (updated) {
      setSelectedItem(updated);
    }
  }
}

function resetFilters() {
  setSearch("");
  setSelectedCategory("");
  setSelectedStatus("");
  setSelectedPriority("");
  setSortBy("priority");
}

  const categories = [
    ...new Set(
      items
        .map((item) => item.category.trim())
        .filter(Boolean)
    ),
  ].sort();

const statuses = [
  ...new Set(items.map((i) => i.status)),
].sort();

const priorities = [
  ...new Set(items.map((i) => i.priority)),
];

const filteredItems = items
  .filter((item) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.finalChoice.toLowerCase().includes(query);

    const matchesCategory =
      !selectedCategory ||
      item.category === selectedCategory;

    const matchesStatus =
      !selectedStatus ||
      item.status === selectedStatus;

    const matchesPriority =
      !selectedPriority ||
      item.priority === selectedPriority;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesPriority
    );
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);

      case "price":
        return (
          (a.finalPrice || a.estimatedPrice) -
          (b.finalPrice || b.estimatedPrice)
        );

      case "status":
        return a.status.localeCompare(b.status);

      case "month":
        return a.purchaseTime.localeCompare(
          b.purchaseTime
        );

      case "priority":
      default: {
        const order = [
          "Очень важно",
          "Важно",
          "Желательно",
          "Не обязательно",
        ];

        return (
          order.indexOf(a.priority) -
          order.indexOf(b.priority)
        );
      }
    }
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />

<main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8 lg:p-6">
<div className="space-y-4 lg:space-y-6">

  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
         <div className="mb-6 flex items-center justify-between">

        <div>
     <h2 className="text-xl font-bold lg:text-2xl">
            Список покупок
          </h2>

   <p className="text-sm text-slate-500">
            {filteredItems.length} из {items.length} вещей
          </p>
        </div>

        <button
          onClick={handleAddItem}
         className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow transition hover:bg-emerald-700 lg:h-12 lg:w-12 lg:rounded-2xl"
        >
          <Plus size={22}/>
        </button>

      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

   <div className="mt-3 lg:mt-4">
        <FilterBar
          categories={categories}
          statuses={statuses}
          priorities={priorities}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          selectedPriority={selectedPriority}
          sortBy={sortBy}
          onCategoryChange={setSelectedCategory}
          onStatusChange={setSelectedStatus}
          onPriorityChange={setSelectedPriority}
          onSortChange={setSortBy}
          onReset={resetFilters}
        />
      </div>

    </div>

    <StatsBar
      items={filteredItems}
      totalItems={items.length}
    />

  <ItemGrid
  items={filteredItems}
  selectedItem={selectedItem}
  onSelect={setSelectedItem}
/>

</div>

<div className="hidden lg:block">

  {selectedItem && (
    <ItemDetails
      item={selectedItem}
      onClose={() => setSelectedItem(null)}
      onSaved={reloadItems}
    />
  )}

</div>

</main>
    </div>
  );
}