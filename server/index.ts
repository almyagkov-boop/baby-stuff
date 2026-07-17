import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import path from "node:path";
import { fileURLToPath } from "node:url";



import {
  getRows,
  updateCell,
  updateTestCell,
  addItem,
  deleteRow,
} from "./googleSheets";

import { mapSheetRows } from "../shared/sheetMapper";



dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, "../dist");



const app = express();

console.log("SERVER VERSION 2");


type UpdateCellRequest = {
  id: number;
  field: string;
  value: string | number;
};

app.use(cors());
app.use(express.json());


app.get("/api/items", async (_, res) => {
  try {
    const rows = await getRows();

    res.json(mapSheetRows(rows));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Не удалось получить данные",
    });
  }
});

app.post("/api/test", async (_, res) => {
  try {
    await updateTestCell();

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});


app.post("/api/update-cell", async (req, res) => {
  try {
    const { id, field, value } =
      req.body as UpdateCellRequest;

    if (!id || !field) {
      return res.status(400).json({
        success: false,
        error: "Не указан id или field",
      });
    }

    await updateCell(id, field, value);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Неизвестная ошибка",
    });
  }
});

app.post("/api/add-item", async (req, res) => {
  try {
    const { values } = req.body;

    await addItem(values);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});

app.delete("/api/item/:id", async (req, res) => {
  try {
    await deleteRow(Number(req.params.id));

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});

app.use(express.static(distPath));

app.get(/^\/(?!api).*/, (_, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API started on http://localhost:${PORT}`);
});