const Result = require("../models/result");
const calculator = require("../utils/calculator");

// POST - Guardar nuevo resultado
const createResult = async (req, res) => {
  try {
    const { answers } = req.body;

    // Calcular huella con el algoritmo
    const { carbonTonnes, waterLitres, category } = calculator(answers);

    // Guardar en base de datos
    const result = await Result.create({
      userId: req.userId,
      answers,
      carbonFootprint: carbonTonnes,
      waterFootprint: waterLitres,
      category,
    });

    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al guardar resultado", error: error.message });
  }
};

// GET - Obtener historial del usuario
const getResults = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener resultados", error: error.message });
  }
};

// GET - Obtener un resultado por id
const getResultById = async (req, res) => {
  try {
    const result = await Result.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!result) {
      return res.status(404).json({ message: "Resultado no encontrado" });
    }

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener resultado", error: error.message });
  }
};

// DELETE - Borrar un resultado
const deleteResult = async (req, res) => {
  try {
    const result = await Result.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!result) {
      return res.status(404).json({ message: "Resultado no encontrado" });
    }

    res.status(200).json({ message: "Resultado eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar resultado", error: error.message });
  }
};

module.exports = { createResult, getResults, getResultById, deleteResult };
