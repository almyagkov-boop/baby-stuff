import { useState } from "react";
import { Filter, RotateCcw } from "lucide-react";

type Props = {
  categories: string[];
  statuses: string[];
  priorities: string[];

  selectedCategory: string;
  selectedStatus: string;
  selectedPriority: string;
  sortBy: string;

  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
};

export default function FilterBar({
  categories,
  statuses,
  priorities,

  selectedCategory,
  selectedStatus,
  selectedPriority,
  sortBy,

  onCategoryChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onReset,
}: Props) {

    const [mobileOpen, setMobileOpen] = useState(false);

const activeFilters =
  Number(Boolean(selectedCategory)) +
  Number(Boolean(selectedStatus)) +
  Number(Boolean(selectedPriority));
  
return (
    <>
<div
  className={`
    mt-3
    grid
    gap-3

    ${
      mobileOpen
        ? "grid-cols-1"
        : "hidden"
    }

    lg:mt-0
    lg:grid
    lg:grid-cols-5
  `}
>

<div className="lg:hidden">

  <button
    onClick={() => setMobileOpen(!mobileOpen)}
    className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-3"
  >
    <div className="flex items-center gap-2">

      <Filter size={18} />

      <span>

        Фильтры

        {activeFilters > 0 && ` (${activeFilters})`}

      </span>

    </div>

    <span>{mobileOpen ? "▲" : "▼"}</span>

  </button>

</div>

      <select
        value={selectedCategory}
        onChange={(e) =>
          onCategoryChange(e.target.value)
        }
        className="rounded-xl border border-slate-300 bg-white px-4 py-3"
      >
        <option value="">
          Все категории
        </option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={(e) =>
          onStatusChange(e.target.value)
        }
        className="rounded-xl border border-slate-300 bg-white px-4 py-3"
      >
        <option value="">
          Все статусы
        </option>

        {statuses.map((status) => (
          <option
            key={status}
            value={status}
          >
            {status}
          </option>
        ))}
      </select>

      <select
        value={selectedPriority}
        onChange={(e) =>
          onPriorityChange(e.target.value)
        }
        className="rounded-xl border border-slate-300 bg-white px-4 py-3"
      >
        <option value="">
          Любая важность
        </option>

        {priorities.map((priority) => (
          <option
            key={priority}
            value={priority}
          >
            {priority}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) =>
          onSortChange(e.target.value)
        }
        className="rounded-xl border border-slate-300 bg-white px-4 py-3"
      >
        <option value="priority">
          По важности
        </option>

        <option value="name">
          По названию
        </option>

        <option value="price">
          По стоимости
        </option>

        <option value="month">
          По сроку покупки
        </option>

        <option value="status">
          По статусу
        </option>
      </select>

      <button
  onClick={onReset}
className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 hover:bg-slate-100"
>
<>
  <RotateCcw size={16} />
  Сбросить
</>
</button>

</div>

</>
);
}