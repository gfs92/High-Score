const mongoose = require("mongoose");
const Score = require("./scoreModel");

const gameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: [true, "A name for your game is required"],
    unique: [true, "A game with this name already exists"],
  },
  scores: [Score.schema],
  scoreTypes: [
    {
      type: String,
      required: [true, "A score name to track is required"],
      unique: [true, "duplicate score name"],
    },
  ],
  imageUpload: {
    type: String,
    required: false,
    unique: [true, "This image is already being used for another game"],
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
