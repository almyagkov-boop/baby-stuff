import { Router } from "express";

import { deleteRow } from "../services/googleSheets";

const router = Router();

router.delete("/:id", async (req, res) => {
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

export default router;