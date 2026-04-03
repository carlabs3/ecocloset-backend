const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: {
      type: Object,
      required: true,
    },
    carbonFootprint: {
      type: Number,
      required: true,
    },
    waterFootprint: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["bajo", "medio", "alto", "muy alto"],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Result", resultSchema);
