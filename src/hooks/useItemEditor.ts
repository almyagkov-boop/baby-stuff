import { useEffect, useMemo, useState } from "react";
import type { PurchaseItem } from "../types/PurchaseItem";

export function useItemEditor(item: PurchaseItem | null) {
  const [draft, setDraft] = useState<PurchaseItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(item ? { ...item } : null);
  }, [item]);

  const hasChanges = useMemo(() => {
    if (!item || !draft) return false;

    return JSON.stringify(item) !== JSON.stringify(draft);
  }, [item, draft]);

  function setField<K extends keyof PurchaseItem>(
    field: K,
    value: PurchaseItem[K]
  ) {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : prev
    );
  }

  function startSaving() {
    setSaving(true);
    setSaved(false);
  }

  function finishSaving() {
    setSaving(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1500);
  }

  return {
    draft,
    saving,
    saved,
    hasChanges,
    setField,
    startSaving,
    finishSaving,
  };
}