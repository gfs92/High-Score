const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A username is required"],
  },
  score: {
    type: Number,
    required: [true, "A score is required"],
  },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
