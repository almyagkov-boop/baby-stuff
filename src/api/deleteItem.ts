const API_URL = "http://localhost:3001";

export async function deleteItem(id: number) {
  const response = await fetch(
    `${API_URL}/api/item/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка удаления");
  }

  return response.json();
}