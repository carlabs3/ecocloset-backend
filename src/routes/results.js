const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createResult,
  getResults,
  getResultById,
  deleteResult,
} = require("../controllers/results.controller");

router.post("/", authMiddleware, createResult);
router.get("/", authMiddleware, getResults);
router.get("/:id", authMiddleware, getResultById);
router.delete("/:id", authMiddleware, deleteResult);

module.exports = router;
