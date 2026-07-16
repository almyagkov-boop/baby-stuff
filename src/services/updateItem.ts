const API_URL = "http://localhost:3001";

export async function updateCell(
  id: number,
  field: string,
  value: string | number
) {
  const response = await fetch(`${API_URL}/api/update-cell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      field,
      value,
    }),
  });

  if (!response.ok) {
    throw new Error("Не удалось сохранить изменения");
  }

  return response.json();
}