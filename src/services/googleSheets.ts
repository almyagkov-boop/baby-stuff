import Papa from "papaparse";
import { parseItems } from "./parser";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAdPyvK_mlSwACQAwuA7TBLss_VYZVIbRnLZUHg3kfWih_PMft62YeN1CZOv8TVoU9wWTS7d_Wr2LF/pub?output=csv";

export async function loadItems() {
  const response = await fetch(CSV_URL);

  if (!response.ok) {
    throw new Error("Не удалось загрузить Google Sheets");
  }

  const csv = await response.text();

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return parseItems(parsed.data as any[]);
}