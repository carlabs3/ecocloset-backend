const Result = require("../models/result");
const calculator = require("../utils/calculator");

// Solo calcular (para usuarios no registrados / preview)
const calculateOnly = async (req, res) => {
  try {
    const { answers } = req.body;
    const result = calculator(answers);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al calcular", error: error.message });
  }
};

const createResult = async (req, res) => {
  try {
    const { answers } = req.body;
    const { carbonTonnes, waterLitres, category } = calculator(answers);

    const result = await Result.create({
      userId: req.userId,
      answers,
      carbonFootprint: carbonTonnes,
      waterFootprint: waterLitres,
      category,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar", error: error.message });
  }
};

const getResults = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getResultById = async (req, res) => {
  try {
    const result = await Result.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!result) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const deleteResult = async (req, res) => {
  try {
    const result = await Result.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!result) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json({ message: "Eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const results = await Result.find();

    // Si no hay resultados, devolvemos valores base para no romper el front
    if (results.length === 0) {
      return res.status(200).json({
        totalTests: 0,
        avgCarbon: 0.5,
        avgWater: 400000,
      });
    }

    const totalTests = results.length;
    const avgCarbon = parseFloat(
      (
        results.reduce((sum, r) => sum + r.carbonFootprint, 0) / totalTests
      ).toFixed(3),
    );
    const avgWater = Math.round(
      results.reduce((sum, r) => sum + r.waterFootprint, 0) / totalTests,
    );

    res.status(200).json({ totalTests, avgCarbon, avgWater });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = {
  createResult,
  calculateOnly,
  getResults,
  getResultById,
  deleteResult,
  getStats,
};
