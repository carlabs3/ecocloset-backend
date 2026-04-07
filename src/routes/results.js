const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createResult,
  calculateOnly,
  getResults,
  getResultById,
  deleteResult,
  getStats,
  updateResult,
} = require("../controllers/results.controller");

router.get("/stats", getStats);
router.post("/calculate", calculateOnly);
router.post("/", authMiddleware, createResult);
router.get("/", authMiddleware, getResults);
router.get("/:id", authMiddleware, getResultById);
router.put("/:id", authMiddleware, updateResult);
router.delete("/:id", authMiddleware, deleteResult);

module.exports = router;
