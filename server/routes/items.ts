import { Router } from "express";

import { getRows } from "../services/googleSheets";
import { mapSheetRows } from "../../shared/sheetMapper";

const router = Router();

router.get("/", async (_, res) => {
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

export default router;