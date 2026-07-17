import {
  CircleAlert,
  ExternalLink,
  Save,
  Trash2,
  X,
  Loader2,
  Package,
} from "lucide-react";

import Badge from "./Badge";
import EditableField from "./EditableField";

import type { PurchaseItem } from "../types/PurchaseItem";

import {
  getDisplayPrice,
  isEstimatedPrice,
} from "../lib/price";

import { useItemEditor } from "../hooks/useItemEditor";
import { saveItem } from "../api/items";
import { deleteItem } from "../api/deleteItem";

import { CATEGORIES } from "../constants/categories";
import { PRIORITIES } from "../constants/priorities";
import { PURCHASE_MONTHS } from "../constants/purchaseMonths";
import { STATUSES } from "../constants/statuses";

type Props = {
  item: PurchaseItem | null;
  onClose: () => void;
  onSaved: () => Promise<void>;
};

function priorityColor(priority: string) {
  if (priority.includes("Очень")) return "red";
  if (priority.includes("Важно")) return "orange";
  return "gray";
}

function getStoreName(url: string) {
  try {
    const host = new URL(url).hostname;

    if (host.includes("ozon")) return "Ozon";
    if (host.includes("wildberries")) return "Wildberries";
    if (host.includes("detmir")) return "Детский мир";
    if (host.includes("market.yandex")) return "Яндекс Маркет";
    if (host.includes("amazon")) return "Amazon";
    if (host.includes("avito")) return "Avito";

    return host.replace("www.", "");
  } catch {
    return "Ссылка";
  }
}

export default function ItemDetails({
  item,
  onClose,
  onSaved,
}: Props) {
  const {
    draft,
    setField,
    saving,
    hasChanges,
    startSaving,
    finishSaving,
  } = useItemEditor(item);

  if (!item || !draft) {
  return null;
}
  
return (
<aside
  className="
    fixed inset-0 z-50
    overflow-y-auto
    bg-white

    lg:sticky
    lg:top-6
    lg:h-fit
    lg:overflow-hidden
    lg:rounded-3xl
    lg:border
    lg:border-slate-200
    lg:shadow-lg
  "
>

<div className="sticky top-0 z-10 border-b border-slate-100 bg-white p-4">



<div className="mb-3">

  <div className="mb-2 flex items-center justify-between">

   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100">
    <Package
        size={22}
        className="text-sky-700"
    />
</div>

    <button
      onClick={onClose}
      className="rounded-lg p-2 transition hover:bg-slate-100"
    >
      <X size={18} />
    </button>

  </div>

  <EditableField
    label=""
    value={draft.name}
    onChange={(value) => setField("name", value)}
  />

</div>

<div className="mt-3 w-56">

  <EditableField
    label="Категория"
    type="select"
    value={draft.category}
    options={CATEGORIES}
    onChange={(value) =>
      setField("category", value)
    }
  />

</div>

  <div className="mt-4 text-3xl font-bold tracking-tight">

    {isEstimatedPrice(
      draft.estimatedPrice,
      draft.finalPrice
    ) && "≈ "}

    {getDisplayPrice(
      draft.estimatedPrice,
      draft.finalPrice
    )}

  </div>

<div className="mt-1 text-xs text-slate-500">

    {draft.finalPrice > 0
      ? "Фактическая стоимость"
      : "Ориентировочная стоимость"}

  </div>

</div>

<div className="space-y-4 p-4 pb-24 lg:pb-4">


        <div className="flex">

          <Badge
            color={
              priorityColor(
                draft.priority
              ) as any
            }
          >
            <CircleAlert
              size={14}
              className="mr-1"
            />
            {draft.priority}
          </Badge>

        </div>

        <div className="grid grid-cols-2 gap-3">

  <EditableField
    label="Статус"
    type="select"
    value={draft.status}
    options={STATUSES}
    onChange={(value) =>
      setField("status", value)
    }
  />

  <EditableField
    label="Важность"
    type="select"
    value={draft.priority}
    options={PRIORITIES}
    onChange={(value) =>
      setField("priority", value)
    }
  />

</div>

  <div className="grid grid-cols-2 gap-3">

  <EditableField
    label="Количество"
    type="number"
    value={draft.quantity}
    onChange={(value) =>
      setField("quantity", value)
    }
  />

  <EditableField
    label="Срок покупки"
    type="select"
    value={draft.purchaseTime}
    options={PURCHASE_MONTHS}
    onChange={(value) =>
      setField("purchaseTime", value)
    }
  />

</div>

        <div className="grid grid-cols-2 gap-3">

  <EditableField
    label="Цена"
    type="number"
    value={draft.estimatedPrice}
    onChange={(value) =>
      setField("estimatedPrice", value)
    }
  />

  <EditableField
    label="Итог"
    type="number"
    value={draft.finalPrice}
    onChange={(value) =>
      setField("finalPrice", value)
    }
  />

</div>

   

        <EditableField
          label="Описание"
          type="textarea"
          value={draft.description}
          onChange={(value) =>
            setField(
              "description",
              value
            )
          }
        />

                <EditableField
          label="Ссылка"
          value={draft.link}
          onChange={(value) =>
            setField("link", value)
          }
        />

        <EditableField
          label="Другие ссылки"
          type="textarea"
          value={draft.links.join("\n")}
          onChange={(value) =>
            setField(
              "links",
              String(value)
                .split("\n")
                .map((v) => v.trim())
                .filter(Boolean)
            )
          }
        />

        <EditableField
          label="Итоговый выбор"
          value={draft.finalChoice}
          onChange={(value) =>
            setField(
              "finalChoice",
              value
            )
          }
        />

        {(draft.finalChoice || draft.link) && (
          <a
            href={draft.finalChoice || draft.link}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-sky-600 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            <ExternalLink size={18} />
            Открыть товар
          </a>
        )}

        {draft.links.length > 0 && (
          <section>
  <h3 className="mb-2 text-sm font-semibold text-slate-600">
              Другие варианты
            </h3>

            <div className="space-y-2">
              {draft.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-50"
                >
                  <span>{getStoreName(link)}</span>

                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
          </section>
        )}

<div
  className="
    sticky bottom-0
    mt-4
    grid grid-cols-2 gap-2
    border-t border-slate-200
    bg-white
    py-4
  "
>

  <button
  onClick={async () => {
    if (!hasChanges || saving) return;

    startSaving();

    try {
      await saveItem(item, draft);
      await onSaved();
      finishSaving();
    } catch (e) {
      console.error(e);
    }
  }}
  className="flex h-12 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700"
>
  {saving ? (
    <Loader2 size={20} className="animate-spin" />
  ) : (
    <Save size={20} />
  )}
</button>

  <button
    onClick={async () => {
      if (!confirm("Удалить вещь?")) return;

      try {
        await deleteItem(item.id);

        await onSaved();

        onClose();
      } catch (e) {
        console.error(e);
      }
    }}
    className="flex h-12 items-center justify-center rounded-2xl bg-red-600 text-white transition hover:bg-red-700"
  >
    <Trash2 size={20} />
  </button>

</div>

      </div>

    </aside>
  );
}