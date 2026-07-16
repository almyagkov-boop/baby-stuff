import { Router } from "express";

import { addItem } from "../services/googleSheets";

const router = Router();

router.post("/", async (req, res) => {
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

export default router;