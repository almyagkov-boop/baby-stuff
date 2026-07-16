import { Router } from "express";

import { updateCell } from "../services/googleSheets";
import type { UpdateCellRequest } from "../types/api";

const router = Router();

router.post("/", async (req, res) => {
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

export default router;