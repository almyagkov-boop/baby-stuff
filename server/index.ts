import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {
  getRows,
  updateCell,
  updateTestCell,
  addItem,
  deleteRow,
} from "./services/googleSheets";

import { mapSheetRows } from "../shared/sheetMapper";

import type { UpdateCellRequest } from "./types/api";

import itemsRouter from "./routes/items";

import updateRouter from "./routes/update";

import addRouter from "./routes/add";
import deleteRouter from "./routes/delete";
import testRouter from "./routes/test";

dotenv.config();

const app = express();

console.log("SERVER VERSION 2");



app.use(cors());
app.use(express.json());

app.use("/api/items", itemsRouter);

app.use("/api/test", testRouter);

app.use("/api/update-cell", updateRouter);

app.use("/api/add-item", addRouter);

app.use("/api/item", deleteRouter);


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API started on http://localhost:${PORT}`);
});

