const API_URL = "";

fetch(`${API_URL}/api/items`);

export async function addItem() {
  const values = [
    Date.now(),      // ID
    "",              // Вещь
    "",              // Категория
    1,               // Кол-во
    "",              // Важность
    "",              // Описание
    "",              // Ссылка
    "",              // Другие ссылки
    0,               // Примерная стоимость
    "",              // Срок покупки
    "",              // Итоговый выбор
    0,               // Итоговая стоимость
    "Не куплено",    // Статус
  ];

  const response = await fetch(`${API_URL}/api/add-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  });

  if (!response.ok) {
    throw new Error("Не удалось создать запись");
  }

  return response.json();
}