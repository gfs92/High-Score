const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  scores: [
    {
      username: {
        type: String,
        required: [true, "A username is required"],
      },
      scoreType: {
        type: String,
        required: [true, "A score name is required"],
      },
      score: {
        type: Number,
        required: [true, "A score is required"],
      },
    },
  ],
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
