import { Router } from "express";

import { updateTestCell } from "../services/googleSheets";

const router = Router();

router.post("/", async (_, res) => {
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

export default router;