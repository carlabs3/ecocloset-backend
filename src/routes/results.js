const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createResult,
  calculateOnly, // Importar
  getResults,
  getResultById,
  deleteResult,
  getStats,
} = require("../controllers/results.controller");

router.get("/stats", getStats);
router.post("/calculate", calculateOnly);
router.post("/", authMiddleware, createResult);
router.get("/", authMiddleware, getResults);
router.get("/:id", authMiddleware, getResultById);
router.delete("/:id", authMiddleware, deleteResult);

module.exports = router;
