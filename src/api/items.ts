const API_URL = "http://localhost:3001";

type UpdatePayload = {
  id: number;
  field: string;
  value: string | number;
};

export async function updateField(payload: UpdatePayload) {
  const response = await fetch(`${API_URL}/api/update-cell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Не удалось сохранить изменения");
  }

  return response.json();
}

export async function saveItem(original: any, draft: any) {
  const requests: Promise<any>[] = [];

  const fields: Record<string, string> = {
    name: "Вещь",
    category: "Категория",
    quantity: "Кол-во",
    priority: "Важность",
    description: "Описание, примеры моделей",
    link: "Ссылка",
    estimatedPrice: "Примерная стоимость",
    purchaseTime: "Срок покупки",
    finalChoice: "Итоговый выбор",
    finalPrice: "Итоговая стоимость",
    status: "Статус",
  };

  for (const key of Object.keys(fields)) {
    if (original[key] !== draft[key]) {
      requests.push(
        updateField({
          id: draft.id,
          field: fields[key],
          value: draft[key],
        })
      );
    }
  }

  if (
    JSON.stringify(original.links) !==
    JSON.stringify(draft.links)
  ) {
    requests.push(
      updateField({
        id: draft.id,
        field: "Другие ссылки",
        value: draft.links.join("\n"),
      })
    );
  }

  await Promise.all(requests);
}